<script lang="ts" setup>
import { computed } from 'vue';
import { EXTERNAL_URL_RE } from '@/shared';
import { normalizeLink } from '@/support/utils';

const {
	tag: _tag,
	href,
	noIcon,
	target,
	rel,
} = defineProps<{
	tag?: string;
	href?: string;
	noIcon?: boolean;
	target?: string;
	rel?: string;
}>();

const tag = computed(() => _tag ?? (href ? 'a' : 'span'));
const isExternal = computed(() => (href && EXTERNAL_URL_RE.test(href)) || target === '_blank');
</script>

<template>
	<component
		:is="tag"
		:class="{
			link: href,
			'vp-external-link-icon': isExternal,
			'no-icon': noIcon,
		}"
		:href="href ? normalizeLink(href) : undefined"
		:target="target ?? (isExternal ? '_blank' : undefined)"
		:rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
	>
		<slot />
	</component>
</template>
