export const useChatStore = defineStore('chat', () => {
	const data = reactive({
		messages: [
			'Привет!',
			'Как дела?!',
			'Тестовое сообщение очень длинное ваще сильно сильно',
		] as any,
		isEditMode: false,
	});

	const methods = {
		addMessage: (n: string) => {
			data.messages.push(n);
		},
	};

	return { data, methods };
});
