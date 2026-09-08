import type { Ref } from 'vue';
import { onMounted, onUnmounted, onUpdated } from 'vue';
import type { TritoTheme } from '@/shared';
import { throttleAndDebounce } from '@/support/utils';
import useAside from './aside';

const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;
// Cached list of anchor elements from resolveHeaders
const resolvedHeaders: Array<{ element: HTMLHeadElement; link: string }> = [];

export function getHeaders(range: TritoTheme.Config['outline']): Array<TritoTheme.OutlineItem> {
	const headers = [
		...document.querySelectorAll(`
.vp-doc > div > h1,
.vp-doc > div > h2,
.vp-doc > div > h3,
.vp-doc > div > h4,
.vp-doc > div > h5,
.vp-doc > div > h6`),
	]
		.filter((el) => el.id && el.hasChildNodes())
		.map((el) => {
			const level = Number(el.tagName[1]);
			return {
				element: el as HTMLHeadElement,
				level,
				link: `#${el.id}`,
				title: serializeHeader(el),
			};
		});

	return resolveHeaders(headers, range);
}

function serializeHeader(h: Element): string {
	let ret = '';
	for (const node of h.childNodes)
		if (node.nodeType === 1) {
			if (ignoreRE.test((node as Element).className)) continue;
			ret += node.textContent;
		} else if (node.nodeType === 3) ret += node.textContent;

	return ret.trim();
}

export function resolveHeaders(
	headers: Array<TritoTheme.OutlineItem>,
	range?: TritoTheme.Config['outline'],
): Array<TritoTheme.OutlineItem> {
	if (range === false) return [];

	const levelsRange = range || 2;
	const [high, low]: [number, number] =
		typeof levelsRange === 'number'
			? [levelsRange, levelsRange]
			: levelsRange === 'deep'
				? [2, 6]
				: levelsRange;

	return buildTree(headers, high, low);
}

export function useActiveAnchor(
	container: Ref<HTMLElement | null>,
	marker: Ref<HTMLElement | null>,
) {
	const { isAsideEnabled } = useAside();
	const onScroll = throttleAndDebounce(setActiveLink, 100);

	let prevActiveLink: HTMLAnchorElement | undefined;
	let ignoreScrollOnce = false;

	onMounted(() => {
		requestAnimationFrame(setActiveLink);
		window.addEventListener('scroll', onScroll);
		container.value?.addEventListener('click', onClick);
	});

	onUpdated(() => {
		activateLink(location.hash);
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', onScroll);
		container.value?.removeEventListener('click', onClick);
	});

	function onClick(e: MouseEvent) {
		if (!isAsideEnabled.value) return;

		const hash = e.target instanceof Element ? e.target.closest('a')?.hash : undefined;
		if (hash) {
			ignoreScrollOnce = true;
			activateLink(hash);
		}
	}

	function setActiveLink() {
		if (!isAsideEnabled.value) return;
		if (ignoreScrollOnce) {
			ignoreScrollOnce = false;
			return;
		}

		const scrollY = window.scrollY;
		const innerHeight = window.innerHeight;
		const offsetHeight = document.body.offsetHeight;
		const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
		// ResolvedHeaders may be repositioned, hidden or fix positioned
		const headers = resolvedHeaders
			.map(({ element, link }) => ({
				link,
				scrollMarginTop: Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0,
				top: getAbsoluteTop(element),
			}))
			.filter(({ top }) => !Number.isNaN(top))
			.sort((a, b) => a.top - b.top);

		// No headers available for active link
		if (!headers.length) {
			activateLink();
			return;
		}

		// Page top
		if (scrollY < 1) {
			activateLink();
			return;
		}

		// Page bottom - highlight last link
		if (isBottom) {
			activateLink(headers[headers.length - 1].link);
			return;
		}

		// Find the last header above the top of viewport
		let activeLink: string | undefined;
		for (const { link, top, scrollMarginTop } of headers) {
			if (top > scrollY + scrollMarginTop + 4) break;
			activeLink = link;
		}
		activateLink(activeLink);
	}

	function activateLink(hash?: string) {
		if (!container.value || !marker.value) return;

		const activeLink = !hash
			? undefined
			: (container.value.querySelector<HTMLAnchorElement>(
					`a[href$="${decodeURIComponent(hash)}"]`,
				) ?? undefined);
		if (activeLink === prevActiveLink) return;

		prevActiveLink?.classList.remove('active');
		prevActiveLink = activeLink;

		if (activeLink) {
			activeLink.classList.add('active');
			marker.value.style.top = `${activeLink.offsetTop + 7}px`;
			marker.value.style.opacity = '1';
		} else {
			marker.value.style.top = '7px';
			marker.value.style.opacity = '0';
		}
	}
}

function getAbsoluteTop(element: HTMLElement): number {
	let offsetTop = 0;
	while (element !== document.body) {
		if (!element)
			// Child element is:
			// - not attached to the DOM (display: none)
			// - set to fixed position (not scrollable)
			// - body or html element (null offsetParent)
			return NaN;

		offsetTop += element.offsetTop;
		element = element.offsetParent as HTMLElement;
	}
	return offsetTop;
}

function buildTree(
	data: Array<TritoTheme.OutlineItem>,
	min: number,
	max: number,
): Array<TritoTheme.OutlineItem> {
	resolvedHeaders.length = 0;

	const result: Array<TritoTheme.OutlineItem> = [];
	const stack: Array<TritoTheme.OutlineItem | { level: number; shouldIgnore: true }> = [];

	data.forEach((item) => {
		const node = { ...item, children: [] };
		let parent = stack[stack.length - 1];

		while (parent && parent.level >= node.level) {
			stack.pop();
			parent = stack[stack.length - 1];
		}

		if (
			node.element.classList.contains('ignore-header') ||
			(parent && 'shouldIgnore' in parent)
		) {
			stack.push({ level: node.level, shouldIgnore: true });
			return;
		}

		if (node.level > max || node.level < min) return;
		resolvedHeaders.push({ element: node.element, link: node.link });

		if (parent) parent.children?.push(node);
		else result.push(node);

		stack.push(node);
	});

	return result;
}
