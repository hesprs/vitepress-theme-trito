import type { Ref } from 'vue';
import { getScrollOffset } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';
import type { TritoTheme } from '@/shared';
import { throttleAndDebounce } from '@/support/utils';
import useAside from './aside';

const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;

// Cached list of anchor elements from resolveHeaders
const resolvedHeaders: Array<{ element: HTMLHeadElement; link: string }> = [];

export function getHeaders(range: TritoTheme.Config['outline']): Array<TritoTheme.OutlineItem> {
	const headers = [
		...document.querySelectorAll(`
.VPDoc :not(.canvas-viewer) > h1,
.VPDoc :not(.canvas-viewer) > h2,
.VPDoc :not(.canvas-viewer) > h3,
.VPDoc :not(.canvas-viewer) > h4,
.VPDoc :not(.canvas-viewer) > h5,
.VPDoc :not(.canvas-viewer) > h6`),
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

	onMounted(() => {
		requestAnimationFrame(setActiveLink);
		window.addEventListener('scroll', onScroll);
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', onScroll);
	});

	function setActiveLink() {
		if (!isAsideEnabled.value) return;

		const scrollY = window.scrollY;
		const innerHeight = window.innerHeight;
		const offsetHeight = document.body.offsetHeight;
		const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;

		// ResolvedHeaders may be repositioned, hidden or fix positioned
		const headers = resolvedHeaders
			.map(({ element, link }) => ({
				link,
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
		for (const { link, top } of headers) {
			if (top > scrollY + getScrollOffset() + 4) break;

			activeLink = link;
		}
		activateLink(activeLink);
	}

	function activateLink(hash?: string) {
		if (!container.value || !marker.value) return;
		if (prevActiveLink) prevActiveLink.classList.remove('active');

		prevActiveLink = !hash
			? undefined
			: (container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`) ?? undefined);

		const activeLink = prevActiveLink;

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
