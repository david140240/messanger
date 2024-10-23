<script setup lang="ts">
import clickOutside from '~/plugins/click-outside.client';

const props = defineProps<{
		text: string;
		id: number;
		idTooltip: number | null;
	}>(),
	emit = defineEmits<{
		(e: 'edit', text: string, id: number): void;
	}>(),
	messageRef = ref(),
	tooltipRef = ref(),
	chatStore = useChatStore(),
	tooltipStore = useTooltipStore(),
	data = reactive({
		myTooltip: null as null | number,
	}),
	calculated = {
		isEditMode: computed(() => chatStore.data.isEditMode),
		isTooltipVisible: computed(
			() => tooltipStore.data.isTooltipVisible && props.idTooltip === props.id
		),
	},
	methods = {
		listener: () => {
			const block = document.getElementById(props.id) as HTMLElement;
			block.addEventListener('contextmenu', () => {
				tooltipStore.data.isTooltipVisible = true;
			});
		},
		deleteMessage: (id: number) => {
			chatStore.data.messages.forEach((item: string, i: number) => {
				i === id ? chatStore.data.messages.splice(i, 1) : false;
			});
		},
		copyText: () => {
			navigator.clipboard.writeText(props.text);
			tooltipStore.data.isTooltipVisible = false;
		},
	};
onMounted(() => {
	methods.listener();
});
</script>

<template>
	<div
		class="c-message"
		@my-tooltip="(index: number) => (data.myTooltip = index)"
	>
		<div
			class="tooltip"
			v-if="calculated.isTooltipVisible.value"
			ref="tooltipRef"
			v-click-outside="() => (tooltipStore.data.isTooltipVisible = false)"
		>
			<span class="option" @click="emit('edit', text, id)">Редактировать</span>
			<span class="option" @click="methods.copyText">Копировать текст</span>
			<span class="option --delete" @click="methods.deleteMessage(id)"
				>Удалить</span
			>
		</div>
		<span
			oncontextmenu="return false"
			class="content"
			:id="id"
			ref="messageRef"
		>
			<span class="text">{{ text }}</span>
		</span>
	</div>
</template>

<style lang="scss" scoped>
.c-message {
	position: relative;
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
		width: fit-content;
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
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: fit-content;
	font-family: 'Courier New', Courier, monospace;
	font-weight: 800;
	font-size: 15px;
	background-color: white;
	padding: 10px 5px;
	border-radius: 10px;
	z-index: 2;
	bottom: 50px;

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
