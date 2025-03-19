import { ref } from 'vue';

export class ChatField {
	public chatStore = useChatStore();
	public tooltipStore = useTooltipStore();
	public messagesBlock = useTemplateRef('messages-block');
	public refBottom = ref(null);

	public data = reactive({
		inputField: '',
		editingMessage: '',
		idMessage: NaN as number,
		idTooltip: NaN as number,

		messageText: '',
		sendTimeMessage: null as string | null,
		dynamicHeight: NaN as number,
		heightContainer: NaN as number,
		cursorX: NaN,
		cursorY: NaN,
	});

	public calculated = {
		messages: computed(() => this.chatStore.data.messages),
		isEditMode: computed((): boolean => this.chatStore.data.isEditMode),
		btnIcons: computed((): string => {
			return this.chatStore.data.isEditMode ? 'check' : 'paper-plane';
		}),
	};

	public methods = {
		context: (text: string, id: number, event: MouseEvent) => {
			this.tooltipStore.data.isTooltipVisible = false;
			this.tooltipStore.data.isTooltipVisible = true;
			this.data.messageText = text;
			this.data.idTooltip = id;
			this.data.cursorX = event.layerX > 430 ? 430 : event.layerX;
			this.data.cursorY = event.y > 608 ? 608 : event.y;
		},

		sendMessage: () => {
			if (this.data.inputField.length) {
				this.data.sendTimeMessage = this.methods.formatingTime(new Date());
				this.chatStore.methods.addMessage(this.data.inputField);
				this.data.inputField = '';
				this.methods.scrollToLastMessage();
			}
		},

		apply: (id?: number) => {
			this.chatStore.data.isEditMode
				? this.methods.saveChanges(id as number)
				: this.methods.sendMessage();
		},

		scrollToLastMessage: () => {
			const height = this.messagesBlock.value?.scrollHeight;
			this.messagesBlock.value?.scrollTo(0, height ?? 0);
		},

		formatingTime: (time: Date) => {
			return time.toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
			});
		},

		editMode: () => {
			this.chatStore.data.isEditMode = true;
			this.tooltipStore.data.isTooltipVisible = false;
			this.data.inputField = this.data.messageText;
			this.data.idMessage = this.data.idTooltip;
			this.data.editingMessage = this.data.messageText;
			this.methods.scrollToLastMessage();
		},

		saveChanges: (id: number) => {
			const chatStore = this.chatStore.data;
			if (!this.data.inputField.length || !chatStore.messages) {
				return;
			}
			chatStore.messages[id].text = this.data.inputField;
			chatStore.messages[id].isEdited = true;
			this.data.inputField = '';
			this.data.editingMessage = '';
			this.chatStore.data.isEditMode = false;
			this.tooltipStore.data.isTooltipVisible = false;
			this.data.idMessage = id;
		},

		cancelEditMode: () => {
			this.data.inputField = '';
			this.data.editingMessage = '';
			this.chatStore.data.isEditMode = false;
		},

		calculateHeight: () => {
			if (this.refBottom.value) {
				if (this.chatStore.data.isEditMode) {
					this.data.dynamicHeight = 800 - 145;
					this.data.heightContainer = 84;
				} else {
					this.data.dynamicHeight = 705;
					this.data.heightContainer = 90;
				}
			} else {
				this.data.heightContainer = 90;
				this.data.dynamicHeight = 705;
			}
			this.methods.scrollToLastMessage();
		},

		deleteMessage: (id: number) => {
			const messages = this.chatStore.data.messages ?? [];
			const index = messages.findIndex((el, key) => key === id);
			messages?.splice(index, 1);
			this.tooltipStore.data.isTooltipVisible = false;
		},

		copyText: () => {
			navigator.clipboard.writeText(this.data.messageText);
			this.tooltipStore.data.isTooltipVisible = false;
		},
	};
}
