export const useChatStore = defineStore("chat", () => {
    const data = reactive({
        messages: [] as string[],
    });

    const methods = {
        addMessage: (n: string) => {
            data.messages.push(n);
        },
    };

    return { data, methods };
});
