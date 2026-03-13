<script lang="ts" setup>
import { useData } from '@/composables/data';
import { IconMoonStars, IconSun } from '@tabler/icons-vue';
import { inject } from 'vue';
import { useI18n } from '@/composables/i18n';
import { toggleAppearanceKey } from '@/shared';

const { site, isDark, theme } = useData();
const i18n = useI18n();

const toggleAppearance = inject(toggleAppearanceKey, async () => {
	isDark.value = !isDark.value;
});
</script>

<template>
	<div
		:title="
			isDark
				? (theme.i18n?.switchLight ?? i18n.switchLight)
				: (theme.i18n?.switchDark ?? i18n.switchDark)
		"
		class="nav-btn VPNavBarAppearance"
		@click="toggleAppearance"
		v-if="
			site.appearance && site.appearance !== 'force-dark' && site.appearance !== 'force-auto'
		"
	>
		<IconMoonStars class="moon icon" />
		<IconSun class="sun icon" />
	</div>
</template>

<style lang="scss" scoped>
.VPNavBarAppearance {
	width: 36px;
	height: 36px;
	display: none;
	@media (min-width: 768px) {
		display: flex;
	}
}

.moon,
.sun {
	position: absolute;
}
.sun {
	opacity: 1;
	.dark & {
		opacity: 0;
	}
}

.moon {
	opacity: 0;
	.dark & {
		opacity: 1;
	}
}
</style>
