<script lang="ts" setup>
import { IconLanguageHiragana } from '@tabler/icons-vue';
import { useI18n } from '@/composables/i18n';
import { useLangs } from '@/composables/langs';
import VPFlyout from './VPFlyout.vue';
import VPMenuLink from './VPMenuLink.vue';

const i18n = useI18n();
const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
</script>

<template>
	<VPFlyout
		v-if="localeLinks.length && currentLang.label"
		class="VPNavBarTranslations nav-btn"
		style="padding: 6px"
		:no-chevron="true"
		:label="i18n.changeLang"
	>
		<template #icon>
			<IconLanguageHiragana class="icon" />
		</template>
		<div class="items">
			<p class="title">{{ currentLang.label }}</p>

			<template v-for="locale in localeLinks" :key="locale.link">
				<VPMenuLink :item="locale" :lang="locale.lang" :dir="locale.dir" />
			</template>
		</div>
	</VPFlyout>
</template>

<style lang="scss" scoped>
.VPNavBarTranslations {
	display: none;
	@media (min-width: 768px) {
		display: flex;
	}
}

.title {
	padding: 0 24px 0 12px;
	line-height: 32px;
	font-size: 14px;
	font-weight: 700;
	color: var(--vp-c-text-1);
}
</style>
