<script setup lang="ts">
import type { TritoTheme } from '@/shared';

defineProps<{
	headers: TritoTheme.OutlineItem[];
	root?: boolean;
}>();
</script>

<template>
	<ul class="VPDocOutlineItem" :class="root ? 'root' : 'nested'">
		<li v-for="{ children, link, title } in headers">
			<a class="outline-link" :href="link" :title> {{ title }}</a>
			<template v-if="children?.length">
				<VPDocOutlineItem :headers="children" />
			</template>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
.root {
	position: relative;
	z-index: 1;
}

.nested {
	padding-right: 16px;
	padding-left: 16px;
}

.outline-link {
	display: block;
	line-height: 32px;
	font-size: 15px;
	font-weight: 500;
	color: var(--vp-c-text-2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin: 4px 0;
	padding: 0px 12px;
	border-radius: 8px;
	opacity: 0.6;
	transition:
		color 0.3s,
		opacity 0.3s,
		font-size 0.3s,
		background-color 0.3s;
}

.outline-link:hover,
.outline-link.active {
	font-weight: bold;
	opacity: 1;
	color: var(--vp-c-brand-1);
	background-color: var(--vp-c-brand-soft);
	font-size: 16px;
	.collapse & {
		background-color: transparent;
	}
}

.outline-link.nested {
	padding-left: 13px;
}
</style>
