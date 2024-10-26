<script setup lang="ts">
const props = defineProps<{
		text: string;
		id: number;
		idTooltip: number | null;
		sendTime: string | null;
		editFlag: boolean;
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
			tooltipStore.data.isTooltipVisible = false;
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
			<div class="info">
				<span class="edit-flag" v-if="editFlag">изменнено</span>
				<span class="time">{{ sendTime }}</span>
			</div>
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
		display: flex;
		flex-direction: row;
		align-items: end;
		gap: 8px;
		width: fit-content;
		padding: 10px;
		background-color: white;
		border-radius: 10px;
		border: 0.5px gray solid;
		transition: 0.2s;
		margin-right: 20px;

		&:hover {
			background-color: rgb(242, 242, 242);
			cursor: default;
		}

		.text {
			font-size: 16px;
			font-family: 'Courier New', Courier, monospace;
		}

		.info {
			display: flex;
			gap: 7px;
			width: min-content;

			.edit-flag {
				font-size: 13px;
			}

			.time {
				width: min-content;
				color: rgb(165, 165, 165);
				font-size: 12px;
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
					sans-serif;
			}
		}
	}
}

.tooltip {
	position: absolute;
	min-width: max-content;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	width: fit-content;
	font-family: 'Courier New', Courier, monospace;
	font-weight: 800;
	font-size: 15px;
	background-color: white;
	padding: 10px 5px;
	border-radius: 10px;
	z-index: 2;
	bottom: 50px;
	-webkit-box-shadow: 1px 9px 48px -19px rgba(34, 60, 80, 0.48);
	-moz-box-shadow: 1px 9px 48px -19px rgba(34, 60, 80, 0.48);
	box-shadow: 1px 9px 48px -19px rgba(34, 60, 80, 0.48);

	.option {
		transition: 0.2s ease-in-out;
		padding: 5px;
		border-radius: 5px;
		box-sizing: border-box;
		min-width: 100%;
		width: 100%;

		&:hover {
			background-color: rgb(230, 230, 230);
			cursor: default;
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
