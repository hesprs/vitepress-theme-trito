import { computed } from 'vue';

import { useData } from './data';

export function useI18n() {
	const { localeIndex } = useData();
	return computed(
		() =>
			i18nTranslations[localeIndex.value as keyof typeof i18nTranslations] ||
			i18nTranslations.en,
	);
}

const i18nTranslations = {
	en: {
		prev: 'Previous Page',
		next: 'Next Page',
		dark: 'Dark',
		light: 'Light',
		onThisPage: 'On This Page',
		appearance: 'Appearance',
		switchLight: 'Switch to Light Theme',
		switchDark: 'Switch to Dark Theme',
		returnToTop: 'Return to Top',
		changeLang: 'Change Language',
		edit: 'Edit This Page',
		lastUpdate: 'Last Updated',
		loadingTip: 'Endless loading? Click anywhere to hide.',
		copyCurrentURL: 'Copy Current URL',
		copySelection: 'Copy Selection',
		search: 'Search',
		downloadImage: 'Download Image',
		copyImage: 'Copy Image',
		copyLink: 'Copy Link',
		newTab: 'Open in New Tab',
		menu: 'Menu',
		notFound: {
			title: 'PAGE NOT FOUND',
			quote: "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
			linkText: 'Return Home',
		},
	},
	'zh-Hans': {
		prev: '上一页',
		next: '下一页',
		dark: '深色',
		light: '浅色',
		onThisPage: '本页内容',
		appearance: '外观',
		switchLight: '切换到浅色主题',
		switchDark: '切换到深色主题',
		returnToTop: '返回顶部',
		changeLang: '切换语言',
		edit: '编辑此页面',
		lastUpdate: '最后更新',
		loadingTip: '加载很久？点击任意位置可隐藏。',
		copyCurrentURL: '复制当前网址',
		copySelection: '复制选中内容',
		copyImage: '复制图片',
		downloadImage: '下载图片',
		search: '搜索',
		copyLink: '复制链接',
		newTab: '在新标签页中打开',
		menu: '菜单',
		notFound: {
			title: '页面未找到',
			quote: '但如果你不改变方向，如果你继续寻找，你可能会到达你要去的地方。',
			linkText: '返回首页',
		},
	},
};
