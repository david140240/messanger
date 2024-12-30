<template>
	<div class="c-chat">
		<header>qst messanger</header>
		<div class="chat-content">
			<ChatPanel />
			<ChatField />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.c-chat {
	margin: auto;
	height: 800px;
	width: 930px;
	border-radius: 20px;
	overflow: hidden;
	-webkit-box-shadow: 1px 3px 38px -10px rgba(34, 60, 80, 0.2);
	-moz-box-shadow: 1px 3px 38px -10px rgba(34, 60, 80, 0.2);
	box-shadow: 1px 3px 38px -10px rgba(34, 60, 80, 0.2);

	& > header {
		display: flex;
		justify-content: center;
		background-color: gray;
		color: white;
	}

	.chat-content {
		display: grid;
		grid-template-columns: 1fr 2fr;
		width: 100%;
		height: 100%;
	}
}
</style>
