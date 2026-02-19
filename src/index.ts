import '@/styles/icons.css';
import '@/styles/main.scss';
import '@/styles/components/custom-block.css';
import '@/styles/components/vp-code.css';
import '@/styles/components/vp-code-group.css';
import '@/styles/components/vp-doc.scss';
import '@/styles/fonts.css';
import type { Theme } from 'vitepress';
import type { TritoTheme } from '@/theme-config';
import VPBadge from '@/components/VPBadge.vue';
import Layout from '@/Layout.vue';

export { default as VPBadge } from '@/components/VPBadge.vue';
export { default as VPButton } from '@/components/VPButton.vue';
export { default as VPFeatures } from '@/components/VPFeatures.vue';
export { default as VPHomeContent } from '@/components/VPHomeContent.vue';
export { default as VPHomeFeatures } from '@/components/VPHomeFeatures.vue';
export { default as VPHomeHero } from '@/components/VPHomeHero.vue';
export { default as VPImage } from '@/components/VPImage.vue';
export { default as VPLink } from '@/components/VPLink.vue';
export { default as VPNavBarSearch } from '@/components/VPNavBarSearch.vue';
export { default as VPSocialLink } from '@/components/VPSocialLink.vue';
export { default as VPSocialLinks } from '@/components/VPSocialLinks.vue';
export { default as VPTeamMembers } from '@/components/VPTeamMembers.vue';
export { default as VPTeamPage } from '@/components/VPTeamPage.vue';
export { default as VPTeamPageSection } from '@/components/VPTeamPageSection.vue';
export { default as VPTeamPageTitle } from '@/components/VPTeamPageTitle.vue';

export { useLayout } from '@/composables/layout';
export type { TritoTheme } from '@/theme-config';
export type ThemeConfig = TritoTheme.Config;

const theme: Theme = {
	Layout,
	enhanceApp: ({ app }) => {
		app.component('Badge', VPBadge);
	},
};

export default theme;
