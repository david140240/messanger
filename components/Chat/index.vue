<template>
    <div class="c-chat">
        <div class="chat-content">
            <ChatPanel />
            <ChatField />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .c-chat {
        display: flex;
        margin: 0 auto;
        height: 800px;
        width: auto;
        background-color: rgb(78, 199, 255);
        border-radius: 20px;
        overflow: hidden;

        .chat-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
        }
    }
</style>
