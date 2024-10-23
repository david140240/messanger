<script setup lang="ts">
const chatStore = useChatStore(),
	tooltipStore = useTooltipStore(),
	refContent = useTemplateRef('content-ref'),
	data = reactive({
		inputField: '',
		idMessage: null as number | null,
		idTooltip: null as number | null,
	}),
	calculated = {
		messages: computed(() => chatStore.data.messages),
		isEditMode: computed(() => chatStore.data.isEditMode),
	},
	methods = {
		sendMessage: () => {
			if (data.inputField.length) {
				chatStore.methods.addMessage(data.inputField);
				const height = refContent.value?.scrollHeight;
				refContent.value?.scrollTo(0, height as number);
				data.inputField = '';
			}
		},
		editMode: (text: string, id: number) => {
			chatStore.data.isEditMode = true;
			tooltipStore.data.isTooltipVisible = false;
			data.inputField = text;
			data.idMessage = id;
		},
		saveChanges: (id: number | null) => {
			if (data.inputField.length) {
				chatStore.data.messages.forEach((item: string, index: number) => {
					if (id === index) {
						chatStore.data.messages.splice(index, 1, data.inputField);
					}
				});
				data.inputField = '';
				chatStore.data.isEditMode = false;
				tooltipStore.data.isTooltipVisible = false;
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
					v-for="(item, index) in calculated.messages.value"
					@edit="methods.editMode"
					@contextmenu="data.idTooltip = index"
					:key="index"
					:text="item"
					:id="index"
					:id-tooltip="data.idTooltip"
				/>
			</div>
			<div class="input-block">
				<input
					class="chat-input"
					placeholder="Введите сообщение..."
					v-model="data.inputField"
					@keyup.enter="methods.sendMessage"
				/>
				<div
					:class="['send-btn', { '--disabled': !data.inputField.length }]"
					@click="methods.sendMessage"
				>
					<img />
				</div>
				<button
					v-if="calculated.isEditMode.value"
					class="edit-accept-btn"
					@click="methods.saveChanges(data.idMessage)"
				>
					save
				</button>
				<button
					v-if="calculated.isEditMode.value"
					class="edit-accept-btn"
					@click="methods.cancelEditMode"
				>
					отмена
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.c-chat-field {
	width: 100%;
	height: 100%;
	width: 600px;

	.content {
		display: flex;
		flex-direction: column;
		padding: 20px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.messages-block {
			display: flex;
			flex-direction: column;
			justify-content: end;
			gap: 20px;
			padding: 20px 0;
			height: 670px;
			overflow: auto;
			scrollbar-width: none;
		}

		.input-block {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 10px;
			align-self: flex-end;
			bottom: 5px;
			width: 100%;

			.edit-accept-btn {
				width: 50px;
			}

			.chat-input {
				font-size: 16px;
				font-family: 'Courier New', Courier, monospace;
				width: 100%;
				height: 30px;
				border-radius: 15px;
				border: 1px gray solid;
				padding: 5px;
				outline: none;
				outline-offset: 0;
			}

			.send-btn {
				width: 50px;
				height: 50px;
				background-color: rgb(114, 187, 255);
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
					background-color: rgb(58, 160, 255);
					cursor: pointer;
				}
			}
		}
	}
}
</style>
