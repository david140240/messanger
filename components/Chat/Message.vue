<script setup lang="ts">
const props = defineProps<{
		text: string;
		id: number;
	}>(),
	emit = defineEmits<{
		(e: 'edit', text: string, id: number): void;
	}>(),
	chatStore = useChatStore(),
	data = reactive({
		isTooltipVisible: false,
	}),
	calculated = {
		isEditMode: computed(() => chatStore.data.isEditMode),
	},
	methods = {
		listener: () => {
			const block = document.getElementById('msgContent') as HTMLElement;
			block.addEventListener('contextmenu', () => {
				data.isTooltipVisible = true;
			});
		},
		deleteMessage: (id: number) => {
			chatStore.data.messages.forEach((item: string, i: number) => {
				console.log(i, id);
				i === id ? chatStore.data.messages.splice(i, 1) : false;
			});
		},
	};
onMounted(() => {
	methods.listener();
});
</script>

<template>
	<div class="c-message">
		<div class="tooltip" v-if="data.isTooltipVisible">
			<span class="option" @click="emit('edit', text, id)">Редактировать</span>
			<span class="option --delete" @click="methods.deleteMessage(id)"
				>Удалить</span
			>
		</div>
		<span oncontextmenu="return false" class="content" id="msgContent">
			<span class="text">{{ text }}</span>
		</span>
	</div>
</template>

<style lang="scss" scoped>
.c-message {
	display: flex;
	flex-direction: column;
	align-items: end;
	gap: 5px;

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

		.text {
			font-size: 20px;
			font-family: 'Courier New', Courier, monospace;
		}
	}
}

.tooltip {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: min-content;
	font-family: 'Courier New', Courier, monospace;
	font-weight: 800;
	font-size: 15px;
	background-color: white;
	padding: 10px 5px;
	border-radius: 10px;
	z-index: 2;

	.option {
		transition: 0.2s ease-in-out;
		padding: 5px;
		border-radius: 5px;
		box-sizing: border-box;

		&:hover {
			background-color: rgb(230, 230, 230);
			cursor: pointer;
		}

		&.--delete {
			color: red;

			&:hover {
				background-color: rgb(255, 210, 210);
			}
		}
	}
}
</style>
