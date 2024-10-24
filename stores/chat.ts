export const useChatStore = defineStore('chat', () => {
	const data = reactive({
		messages: [
			{ text: 'Привет!', isEdited: false },
			{ text: 'Как дела?!', isEdited: false },
			{
				text: 'Тестовое сообщение очень длинное ваще сильно сильно',
				isEdited: false,
			},
		] as any,
		isEditMode: false,
	});

	const methods = {
		addMessage: (n: string) => {
			data.messages.push({ text: n, isEdited: false });
		},
	};

	return { data, methods };
});
