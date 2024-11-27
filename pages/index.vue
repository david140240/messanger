<script lang="ts" setup>
const data = reactive({
		darkMode: false,
	}),
	calculated = {
		isDarkMoode: computed(() => data.darkMode),
	};
</script>

<template>
	<input type="checkbox" v-model="data.darkMode" />
	<div :class="['app', { '--dark': calculated.isDarkMoode.value }]">
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
