<template>
	<Transition name="fade" mode="out-in">
		<div
			v-if="rightMenuShow"
			class="right-menu"
			@click="rightMenuShow = false"
			@contextmenu.stop="closeRightMenu"
		>
			<div
				:style="{
					left: rightMenuX + 'px',
					top: rightMenuY + 'px',
				}"
				ref="rightMenuRef"
				class="menu-content s-card hover card-enhance"
				@contextmenu.stop="closeRightMenu"
			>
				<div class="tools">
					<div class="btn" title="Back" @click="back">
						<IconArrowLeft />
					</div>
					<div class="btn" title="Forward" @click="forward">
						<IconArrowRight />
					</div>
					<div class="btn" title="Refresh" @click="refresh">
						<IconRefresh />
					</div>
					<div class="btn" title="Scroll to Top" @click="scrollToTop">
						<IconArrowBarToUp />
					</div>
				</div>
				<div class="all-menu general" v-if="selection.type !== 'normal'">
					<!-- link selection -->
					<div
						v-if="selection.type === 'link'"
						class="btn"
						@click="openInNewTab(selection.data.href)"
					>
						<IconAppWindow />
						<span class="name">{{ i18n.newTab }}</span>
					</div>
					<div
						v-if="selection.type === 'link'"
						class="btn"
						@click="copyText(selection.data.href)"
					>
						<IconCopy />
						<span class="name">{{ i18n.copyLink }}</span>
					</div>
					<!-- image selection -->
					<div
						v-if="selection.type === 'image'"
						class="btn"
						@click="copyImage(selection.data.src)"
					>
						<IconClipboardCopy />
						<span class="name">{{ i18n.copyImage }}</span>
					</div>
					<div
						v-if="selection.type === 'image'"
						class="btn"
						@click="downloadImage(selection.data.src)"
					>
						<IconDownload />
						<span class="name">{{ i18n.downloadImage }}</span>
					</div>
					<!-- text selection -->
					<a
						v-if="selection.type === 'text'"
						:href="`https://google.com/search?q=${encodeURIComponent(selection.data)}`"
						class="btn right-menu-link"
						target="_blank"
					>
						<IconBrandGoogle />
						<span class="name">{{ i18n.search }}</span>
					</a>
					<div
						v-if="selection.type === 'text'"
						class="btn"
						@click="copyText(selection.data)"
					>
						<IconCopy />
						<span class="name">{{ i18n.copySelection }}</span>
					</div>
				</div>
				<div class="all-menu general">
					<div class="btn" @click="copyText(router.route.path)">
						<!-- TODO: Refine URL -->
						<IconLink />
						<span class="name">{{ i18n.copyCurrentURL }}</span>
					</div>
					<div class="btn" @click.stop="toggleAppearance">
						<IconSun v-if="isDark" />
						<IconMoonStars v-if="!isDark" />
						<span class="name"> {{ isDark ? i18n.light : i18n.dark }}</span>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script lang="ts" setup>
import {
	IconAppWindow,
	IconArrowBarToUp,
	IconArrowLeft,
	IconArrowRight,
	IconBrandGoogle,
	IconClipboardCopy,
	IconCopy,
	IconDownload,
	IconLink,
	IconMoonStars,
	IconRefresh,
	IconSun,
} from '@tabler/icons-vue';
import { useRouter } from 'vitepress';
import {
	inject,
	nextTick,
	onBeforeUnmount,
	onMounted,
	type Reactive,
	reactive,
	ref,
	useTemplateRef,
} from 'vue';
import {
	back,
	copyImage,
	copyText,
	downloadImage,
	forward,
	openInNewTab,
	refresh,
	scrollToTop,
} from '@/composables/contextMenuActions';
import { useData } from '@/composables/data';
import { useI18n } from '@/composables/i18n';
import { toggleAppearanceKey } from '@/shared';

interface LinkSelection {
	type: 'link';
	data: HTMLLinkElement;
}
interface ImageSelection {
	type: 'image';
	data: HTMLImageElement;
}
interface TextSelection {
	type: 'text';
	data: string;
}
interface NormalSelection {
	type: 'normal';
	data: null;
}
type selection = LinkSelection | ImageSelection | TextSelection | NormalSelection;

const { isDark } = useData();
const i18n = useI18n();
const router = useRouter();
const rightMenuX = ref(0);
const rightMenuY = ref(0);
const rightMenuRef = useTemplateRef('rightMenuRef');
const rightMenuShow = ref(false);
const toggleAppearance = inject(toggleAppearanceKey);

const selection = reactive({
	type: 'normal',
	data: null,
}) as Reactive<selection>;

const openRightMenu = (e: PointerEvent) => {
	if (e.ctrlKey || window.innerWidth < 768) return true;
	e.preventDefault();
	rightMenuShow.value = false;
	checkClickType(e.target as HTMLElement);
	nextTick().then(() => {
		const calculateMenuPosition = () => {
			if (!rightMenuRef.value) return;
			const menuWidth = rightMenuRef.value.offsetWidth;
			const menuHeight = rightMenuRef.value.offsetHeight;
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;
			let correctX = e.clientX;
			let correctY = e.clientY;
			const marginWidth = 20;
			if (correctX + menuWidth > screenWidth - marginWidth) {
				correctX = screenWidth - menuWidth - marginWidth;
			}
			if (correctY + menuHeight > screenHeight - marginWidth) {
				correctY = screenHeight - menuHeight - marginWidth;
			}
			if (correctX < marginWidth) {
				correctX = marginWidth;
			}
			if (correctY < marginWidth) {
				correctY = marginWidth;
			}
			rightMenuX.value = correctX;
			rightMenuY.value = correctY;
		};
		rightMenuShow.value = true;
		nextTick().then(calculateMenuPosition);
	});
};

const closeRightMenu = (e: Event) => {
	e?.preventDefault();
	rightMenuShow.value = false;
	rightMenuX.value = 0;
	rightMenuY.value = 0;
	selection.type = 'normal';
	selection.data = null;
};

const checkClickType = (target: HTMLElement) => {
	if (!target?.tagName) return false;
	const select = window.getSelection()?.toString() || '';
	selection.data = (select.length > 0 ? select : target) as
		| string
		| HTMLImageElement
		| HTMLLinkElement
		| null;
	switch (target.tagName) {
		case 'A':
			selection.type = 'link';
			break;
		case 'IMG':
			selection.type = 'image';
			break;
		default:
			if (select.length > 0) selection.type = 'text';
			else selection.type = 'normal';
			break;
	}
};

onMounted(() => {
	window.addEventListener('contextmenu', openRightMenu);
});

onBeforeUnmount(() => {
	window.removeEventListener('contextmenu', openRightMenu);
});
</script>

<style lang="scss" scoped>
.right-menu {
	position: fixed;
	user-select: none;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 9999;
	transition: opacity 0.2s;
	.menu-content {
		position: absolute;
		background-color: var(--main-card-background);
		animation: fade-up 0.2s forwards;
		.tools {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			justify-content: space-between;
			.btn {
				width: 34px;
				height: 34px;
				min-width: 34px;
				padding: 0;
			}
		}
		.all-menu {
			margin-top: 12px;
			.btn {
				justify-content: flex-start;
				margin-bottom: 6px;
				&:last-child {
					margin-bottom: 0;
				}
			}
			&.general {
				padding-top: 12px;
				border-top: 1px solid var(--vp-c-border);
			}
		}
		.btn {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			padding: 8px;
			transition:
				color 0.3s,
				background-color 0.3s;
			.icon {
				transition: color 0.3s;
			}
			.name {
				margin-left: 12px;
			}
			&:hover {
				color: var(--main-card-background);
				background-color: var(--vp-c-brand-1);
			}
		}
	}
}
.modal-tip {
	font-size: 15px;
	margin-top: -4px;
	margin-bottom: 1rem;
	display: block;
	color: var(--vp-c-text-2);
	border-left: 4px solid var(--vp-c-border);
	border-radius: 4px;
	padding: 8px 0 8px 12px;
	background-color: var(--main-card-second-background);
}
</style>
