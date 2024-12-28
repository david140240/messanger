export const useChatStore = defineStore('chat', () => {
	const data = reactive({
		messages: [],
		isEditMode: false,
	});

	const methods = {
		addMessage: (n: string) => {
			data.messages.push({ text: n, isEdited: false });
		},
	};

	return { data, methods };
});
