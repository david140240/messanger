<script lang="ts" setup>
    const props = defineProps<{
            avatar: string;
            username: string;
            lastMessage: string;
            isActive: boolean;
            activeIndex: number;
            index: number;
        }>(),
        calculated = {
            actveTab: computed(() => {
                return props.isActive && props.activeIndex === props.index;
            }),
        };
</script>

<template>
    <div :class="['c-tab', { active: calculated.actveTab.value }]">
        <div class="content">
            <div class="info">
                <div class="username">{{ username }}</div>
                <div class="last-message">{{ lastMessage }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .c-tab {
        padding: 20px;
        background-color: #d1d1d1;
        border-radius: 7px;
        transition: 0.2s ease-out;

        &:hover {
            background-color: #c5c5c5;
        }

        &.active {
            background-color: #a3a3a3;

            .content {
                .info {
                    .last-message {
                        color: rgb(253, 253, 253);
                    }
                }
            }
        }

        .content {
            display: flex;
            flex-direction: column;
            height: 100%;

            .info {
                .last-message {
                    -webkit-line-clamp: 1;
                    line-clamp: 1;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: rgb(129, 129, 129);
                }
            }
        }
    }
</style>
