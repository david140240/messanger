<template>
    <div class="c-message">
        <span class="content">
            <span>сообщение</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .c-message {
        display: flex;

        &.me {
            justify-content: end;
        }

        &.other {
            justify-content: start;
        }

        .content {
            width: min-content;
            padding: 10px;
            background-color: white;
            border-radius: 10px;
        }
    }
</style>
