<script setup lang="ts">
const chatStore = useChatStore(),
	tooltipStore = useTooltipStore(),
	refContent = useTemplateRef('content-ref'),
	data = reactive({
		inputField: '',
		idMessage: null as number | null,
		idTooltip: null as number | null,
		sendTimeMessage: null as string | null,
	}),
	calculated = {
		messages: computed(() => chatStore.data.messages),
		isEditMode: computed((): boolean => chatStore.data.isEditMode),
		btnIcons: computed((): string => {
			return chatStore.data.isEditMode ? 'check' : 'paper-plane';
		}),
	},
	methods = {
		sendMessage: () => {
			if (data.inputField.length) {
				data.sendTimeMessage = methods.formatingTime(new Date());
				chatStore.methods.addMessage(data.inputField);
				const height = refContent.value?.scrollHeight;
				refContent.value?.scrollTo(0, height as number);
				data.inputField = '';
			}
		},
		apply: (id?: number) => {
			chatStore.data.isEditMode
				? methods.saveChanges(id as number)
				: methods.sendMessage();
		},
		formatingTime: (time: Date) => {
			return time.toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
			});
		},
		editMode: (text: string, id: number) => {
			chatStore.data.isEditMode = true;
			tooltipStore.data.isTooltipVisible = false;
			data.inputField = text;
			data.idMessage = id;
		},
		saveChanges: (id: number) => {
			if (data.inputField.length) {
				chatStore.data.messages[id].text = data.inputField;
				chatStore.data.messages[id].isEdited = true;
				data.inputField = '';
				chatStore.data.isEditMode = false;
				tooltipStore.data.isTooltipVisible = false;
				data.idMessage = id;
			}
		},
		cancelEditMode: () => {
			data.inputField = '';
			chatStore.data.isEditMode = false;
		},
	};
</script>

<template>
	<div class="c-chat-field">
		<div class="content">
			<div class="messages-block" ref="content-ref">
				<ChatMessage
					v-for="(item, index) in chatStore.data.messages"
					@edit="methods.editMode"
					@contextmenu="data.idTooltip = index"
					:key="index"
					:text="item.text"
					:edit-flag="item.isEdited"
					:id="index"
					:id-tooltip="data.idTooltip"
					:send-time="data.sendTimeMessage"
				/>
			</div>
			<div class="input-block">
				<input
					class="chat-input"
					placeholder="Введите сообщение..."
					v-model="data.inputField"
					@keyup.enter="methods.apply(data.idMessage)"
				/>
				<div
					:class="['send-btn', { '--disabled': !data.inputField.length }]"
					@click="methods.apply(data.idMessage)"
				>
					<img
						:src="`${$config.public.baseURL}/_nuxt/images/${calculated.btnIcons.value}.svg`"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.c-chat-field {
	height: 100%;
	padding: 20px 0;
	background-color: rgb(239, 239, 239);

	.content {
		width: 100%;
		height: 100%;
		overflow-y: auto;

		.messages-block {
			display: flex;
			flex-direction: column;
			gap: 20px;
			padding: 20px 0;
			height: 670px;
			overflow: auto;
			scrollbar-width: thin;
			scrollbar-gutter: stable;
			overflow-y: scroll;
		}

		.input-block {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 10px;
			align-self: flex-end;
			bottom: 5px;
			padding: 0 20px;

			.edit-accept-btn {
				width: 50px;
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
