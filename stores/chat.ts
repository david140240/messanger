export const useChatStore = defineStore('chat', () => {
	const data = reactive({
		messages: [] as any,
		isEditMode: false,
	});

	const methods = {
		addMessage: (n: string) => {
			data.messages.push(n);
		},
	};

	return { data, methods };
});
