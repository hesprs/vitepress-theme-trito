<template>
	<div class="background" />
</template>

<style lang="scss" scoped>
.background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: -2;
	background-image: var(--vp-bg-image);
}
</style>
