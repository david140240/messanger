<template>
    <div class="c-chat-field">
        <div class="content">
            <div class="messages-block">
                <ChatMessage />
            </div>
            <div class="input-block">
                <input class="chat-input" placeholder="Введите сообщение..." />
                <div class="send-btn">
                    <img />
                </div>
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
            display: grid;
            padding: 20px;
            width: 100%;
            height: 100%;
            background-color: rgb(146, 115, 255);
            box-sizing: border-box;

            .messages-block {
                height: 100%;
                background-color: rgb(144, 173, 255);
            }

            .input-block {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                align-self: flex-end;
                bottom: 5px;
                width: 100%;

                .chat-input {
                    width: 100%;
                    height: 30px;
                    border-radius: 15px;
                    border: 1px gray solid;
                    padding: 5px;
                }

                .send-btn {
                    width: 50px;
                    height: 50px;
                    background-color: rgb(70, 164, 252);
                    border-radius: 15px;
                    transition: 0.2s;

                    &:hover {
                        background-color: rgb(23, 86, 146);
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
