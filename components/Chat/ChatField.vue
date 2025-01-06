<script setup lang="ts">
import { ref } from 'vue';

const chatStore = useChatStore(),
	tooltipStore = useTooltipStore(),
	messagesBlock = useTemplateRef('messages-block'),
	refBottom = ref(null),
	data = reactive({
		inputField: '',
		editingMessage: '',
		idMessage: NaN as number,
		idTooltip: NaN as number,
		messageText: '',
		sendTimeMessage: null as string | null,
		dynamicHeight: NaN as number,
		heightContainer: NaN as number,
	}),
	calculated = {
		messages: computed(() => chatStore.data.messages),
		isEditMode: computed((): boolean => chatStore.data.isEditMode),
		btnIcons: computed((): string => {
			return chatStore.data.isEditMode ? 'check' : 'paper-plane';
		}),
	},
	methods = {
		context: (text, id) => {
			data.messageText = text;
			data.idTooltip = id;
		},
		sendMessage: async () => {
			if (data.inputField.length) {
				data.sendTimeMessage = methods.formatingTime(new Date());
				await chatStore.methods.addMessage(data.inputField);
				data.inputField = '';
				methods.scrollToLastMessage();
			}
		},
		apply: (id?: number) => {
			chatStore.data.isEditMode
				? methods.saveChanges(id as number)
				: methods.sendMessage();
		},
		scrollToLastMessage: () => {
			const height = messagesBlock.value?.scrollHeight;
			messagesBlock.value?.scrollTo(0, height);
		},
		formatingTime: (time: Date) => {
			return time.toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
			});
		},
		editMode: () => {
			chatStore.data.isEditMode = true;
			tooltipStore.data.isTooltipVisible = false;
			data.inputField = data.messageText;
			data.idMessage = data.idTooltip;
			data.editingMessage = data.messageText;
			methods.scrollToLastMessage();
		},
		saveChanges: (id: number) => {
			if (data.inputField.length) {
				chatStore.data.messages[id].text = data.inputField;
				chatStore.data.messages[id].isEdited = true;
				data.inputField = '';
				data.editingMessage = '';
				chatStore.data.isEditMode = false;
				tooltipStore.data.isTooltipVisible = false;
				data.idMessage = id;
			}
		},
		cancelEditMode: () => {
			data.inputField = '';
			data.editingMessage = '';
			chatStore.data.isEditMode = false;
		},
		calculateHeight: () => {
			if (refBottom.value) {
				if (chatStore.data.isEditMode) {
					data.dynamicHeight = 800 - 145;
					data.heightContainer = 84;
				} else {
					data.dynamicHeight = 705;
					data.heightContainer = 90;
				}
			} else {
				data.heightContainer = 90;
				data.dynamicHeight = 705;
			}
			methods.scrollToLastMessage();
		},
		deleteMessage: (id: number) => {
			chatStore.data.messages.forEach((item: string, i: number) => {
				i === id ? chatStore.data.messages.splice(i, 1) : false;
			});
			tooltipStore.data.isTooltipVisible = false;
		},
		copyText: () => {
			navigator.clipboard.writeText(data.messageText);
			tooltipStore.data.isTooltipVisible = false;
		},
	};

watch(
	() => chatStore.data.isEditMode,
	() => {
		methods.calculateHeight();
	}
);

onMounted(() => {
	methods.calculateHeight();
});
</script>

<template>
	<div class="c-chat-field">
		<div class="content">
			<div
				class="empty"
				v-if="chatStore.data.messages?.length === 0 || !chatStore.data.messages"
			>
				<span>
					{{
						!chatStore.data.messages
							? 'Выберите, с кем хотели бы пообщаться'
							: 'Начните общение!'
					}}
				</span>
			</div>
			<div
				class="container"
				:style="{ height: `${data.heightContainer}%` }"
				v-else
			>
				<DropList
					v-if="tooltipStore.data.isTooltipVisible"
					ref="tooltipRef"
					v-click-outside="() => (tooltipStore.data.isTooltipVisible = false)"
					:right="100"
					:bottomn="50"
				>
					<template #content>
						<span class="option" @click="methods.editMode">Редактировать</span>
						<span class="option" @click="methods.copyText"
							>Копировать текст</span
						>
						<span
							class="option --delete"
							@click="methods.deleteMessage(data.idTooltip)"
							>Удалить</span
						>
					</template>
				</DropList>
				<div
					class="messages-block"
					ref="messages-block"
					:style="{ 'max-height': `${data.dynamicHeight}px` }"
				>
					<ChatMessage
						v-for="(item, index) in chatStore.data.messages"
						@contextmenu="methods.context(item.text, index, event)"
						:key="index"
						:text="item.text"
						:edit-flag="item.isEdited"
						:id="index"
						:id-tooltip="data.idTooltip"
						:send-time="data.sendTimeMessage"
					/>
				</div>
			</div>
			<div class="input-block" ref="refBottom" v-if="chatStore.data.messages">
				<div>
					<div v-if="chatStore.data.isEditMode" class="editing-message-preview">
						<span class="title"> Редактирование </span>
						<span class="editing-message">
							{{ data.editingMessage }}
						</span>
					</div>
					<input
						class="chat-input"
						placeholder="Введите сообщение..."
						v-model="data.inputField"
						@keyup.enter="methods.apply(data.idMessage)"
					/>
				</div>
				<div
					:class="['send-btn', { '--disabled': !data.inputField.length }]"
					@click="methods.apply(data.idMessage)"
				>
					<img :src="`${calculated.btnIcons.value}.svg`" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.c-chat-field {
	height: 100%;
	background-color: rgb(239, 239, 239);

	.content {
		width: 100%;
		height: 100%;
		position: relative;

		.empty {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;

			& > span {
				background-color: gray;
				padding: 5px 10px;
				border-radius: 10px;
				color: white;
			}
		}

		.container {
			display: flex;
			align-items: end;
			padding: 10px;
			box-sizing: border-box;
			overflow: hidden;

			.messages-block {
				display: flex;
				flex-direction: column;
				scrollbar-width: thin;
				scrollbar-gutter: stable;
				overflow-y: auto;
				gap: 10px;
				width: 100%;
			}

			.droplist {
				.option {
					transition: 0.2s ease-in-out;
					padding: 5px;
					border-radius: 5px;
					box-sizing: border-box;
					min-width: 100%;
					width: 100%;

					&:hover {
						background-color: rgb(230, 230, 230);
						cursor: default;
					}

					&.--delete {
						color: red;

						&:hover {
							background-color: rgb(255, 210, 210);
						}
					}
				}
			}
		}

		.input-block {
			display: flex;
			align-items: end;
			gap: 10px;
			align-self: flex-end;
			position: absolute;
			width: 100%;
			bottom: 15px;
			padding: 10px;
			box-sizing: border-box;
			background-color: #e7e7e7;

			& > div {
				width: 100%;

				.editing-message-preview {
					color: #6c6c6c;
					padding: 5px;
					font-family: 'Courier New', Courier, monospace;
					border-left: 3px rgb(56, 176, 255) solid;

					.editing-message {
						-webkit-line-clamp: 1;
						line-clamp: 1;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}

					& > span {
						display: block;
					}

					.title {
						color: rgb(56, 176, 255);
						font-weight: 700;
					}
				}

				.chat-input {
					font-size: 16px;
					font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
						'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
					width: 100%;
					min-height: 50px;
					border-radius: 10px;
					box-sizing: border-box;
					border: 1px rgb(229, 229, 229) solid;
					padding: 5px 15px;
					outline: none;
					outline-offset: 0;
				}
			}
			.edit-accept-btn {
				width: 50px;
			}

			.send-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 70px;
				height: 50px;
				background-color: rgb(191, 224, 255);
				border-radius: 15px;
				transition: 0.2s;

				&.--disabled {
					background-color: rgb(187, 187, 187);

					&:hover {
						background-color: rgb(187, 187, 187);
						cursor: default;
					}
				}

				&:hover {
					background-color: rgb(174, 216, 255);
					cursor: default;
				}

				&:active {
					background-color: rgb(144, 201, 255);
				}
			}
		}
	}
}
</style>
