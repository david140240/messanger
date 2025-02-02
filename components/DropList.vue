<script lang="ts" setup>
const props = defineProps<{
	right?: number;
	bottomn?: number;
	top?: number;
	left?: number;
}>();
</script>

<template>
	<div
		class="droplist"
		:style="{
			top: `${top ? top : null}px`,
			bottom: `${bottomn ? bottomn : null}px`,
			left: `${left ? left : null}px`,
			right: `${right ? right : null}px`,
		}"
	>
		<slot name="content" />
	</div>
</template>

<style lang="scss" scoped>
@keyframes show {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
.droplist {
	animation: 0.3s show ease;
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
	-webkit-box-shadow: 1px 9px 48px -19px rgba(34, 60, 80, 0.48);
	-moz-box-shadow: 1px 9px 48px -19px rgba(34, 60, 80, 0.48);
	box-shadow: 1px 9px 48px -19px rgba(34, 60, 80, 0.48);
}
</style>
