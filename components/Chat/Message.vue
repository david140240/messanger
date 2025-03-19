<script setup lang="ts">
const props = defineProps<{
		text: string;
		id: number;
		idTooltip: number | null;
		sendTime: string | null;
		editFlag: boolean;
	}>(),
	emits = defineEmits<{
		(e: 'edit', text: string, id: number): void;
		(e: 'emit-node', node: HTMLElement): void;
	}>(),
	messageRef = ref(),
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
	};

watch(
	() => messageRef.value,
	n => {
		emits('emit-node', n);
	}
);

onMounted(() => {
	methods.listener();
});
</script>

<template>
	<div
		class="c-message"
		@my-tooltip="(index: number) => (data.myTooltip = index)"
	>
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
	padding: 0;

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
		background-color: rgb(56, 176, 255);
		color: white;
		border-radius: 10px 10px 0 10px;
		transition: 0.2s;

		&:hover {
			cursor: default;
		}

		.text {
			font-size: 16px;
			color: white;
			font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
				'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
		}

		.info {
			display: flex;
			gap: 7px;
			width: min-content;
			color: rgb(227, 227, 227);

			.edit-flag {
				font-size: 13px;
			}

			.time {
				width: min-content;
				font-size: 12px;
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
					sans-serif;
			}
		}
	}
}
</style>
