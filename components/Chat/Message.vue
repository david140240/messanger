<script setup lang="ts">
    const props = defineProps({
        text: String,
    });
</script>

<template>
    <div class="c-message">
        <span class="content">
            <span>{{ props.text }}</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .c-message {
        display: flex;
        justify-content: end;

        &.me {
            justify-content: end;
        }

        &.other {
            justify-content: start;
        }

        .content {
            width: auto;
            padding: 10px;
            background-color: white;
            border-radius: 10px;
        }
    }
</style>
