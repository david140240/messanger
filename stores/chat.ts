export const useChatStore = defineStore('chat', () => {
	const data = reactive({
		messages: ['a', 'b', '123'] as any,
		isEditMode: false,
	});

	const methods = {
		addMessage: (n: string) => {
			data.messages.push(n);
		},
	};

	return { data, methods };
});
