import { MESSAGES } from '@/constants/MessagesPreset';

export const useChatStore = defineStore('chat', () => {
	const data = reactive({
		messages: null as null | Array<object>,
		isEditMode: false,
	});

	const methods = {
		addMessage: (n: string) => {
			data.messages?.push({ text: n, isEdited: false });
		},
		setMessages: (id: number) => {
			MESSAGES.forEach(ms => {
				if (id === ms.id) {
					data.messages = ms.messages;
				}
			});
		},
	};

	return { data, methods };
});
