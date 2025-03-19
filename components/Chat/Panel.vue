<script lang="ts" setup>
import { MESSAGES } from '~/constants/MessagesPreset';

const chatStore = useChatStore(),
	data = reactive({
		isActive: false,
		activeIndex: null as null | number,
	}),
	methods = {
		toogleActive: (index: number) => {
			data.isActive = true;
			data.activeIndex = index;
			chatStore.methods.setMessages(index);
		},
	};
</script>

<template>
	<div class="c-panel">
		<div class="content">
			<span class="title"> Диалоги</span>
			<div class="tab-list">
				<Tab
					@click="methods.toogleActive(index)"
					v-for="(item, index) in MESSAGES"
					:index="index"
					:isActive="data.isActive"
					:activeIndex="data.activeIndex"
					:username="item.username"
					:lastMessage="item.messages[item.messages.length - 1]?.text"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.c-panel {
	width: 100%;
	height: 100%;
	background-color: rgb(229, 229, 229);

	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
		padding: 15px;

		.title {
			font-size: 20px;
			font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
				'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
			width: 100%;
		}

		.tab-list {
			display: flex;
			flex-direction: column;
			gap: 10px;
			width: 100%;
		}
	}
}
</style>
