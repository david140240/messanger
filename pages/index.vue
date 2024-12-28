<script lang="ts" setup></script>

<template>
	<div class="app">
		<Chat />
	</div>
</template>

<style lang="scss" scoped>
.app {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;

	&.--light {
		background-color: #fff8e7;
	}

	&.--dark {
		background-color: rgb(57, 57, 57);
	}
}
</style>
