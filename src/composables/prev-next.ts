import { computed } from 'vue';
import { isActive } from '@/shared';
import { getFlatSideBarLinks, getSidebar } from '@/support/sidebar';
import useData from './data';

export default function usePrevNext() {
	const { page, theme, frontmatter } = useData();

	return computed(() => {
		const sidebar = getSidebar(theme.value.sidebar, page.value.relativePath);
		const links = getFlatSideBarLinks(sidebar).filter(
			(link, index, all) =>
				index ===
				all.findIndex(
					(item) => item.link.replace(/[?#].*$/, '') === link.link.replace(/[?#].*$/, ''),
				),
		);
		const index = links.findIndex((link) => isActive(page.value.relativePath, link.link));
		const prev = links[index - 1];
		const next = links[index + 1];

		const hidePrev =
			(theme.value.docFooter?.prev === false && !frontmatter.value.prev) ||
			frontmatter.value.prev === false;

		const hideNext =
			(theme.value.docFooter?.next === false && !frontmatter.value.next) ||
			frontmatter.value.next === false;

		return {
			next: hideNext
				? undefined
				: {
						link:
							typeof frontmatter.value.next === 'object'
								? (frontmatter.value.next.link ?? next?.link)
								: next?.link,
						text:
							typeof frontmatter.value.next === 'string'
								? frontmatter.value.next
								: typeof frontmatter.value.next === 'object'
									? (frontmatter.value.next.text ??
										next?.docFooterText ??
										next?.text)
									: (next?.docFooterText ?? next?.text),
					},
			prev: hidePrev
				? undefined
				: {
						link:
							typeof frontmatter.value.prev === 'object'
								? (frontmatter.value.prev.link ?? prev?.link)
								: prev?.link,
						text:
							typeof frontmatter.value.prev === 'string'
								? frontmatter.value.prev
								: typeof frontmatter.value.prev === 'object'
									? (frontmatter.value.prev.text ??
										prev?.docFooterText ??
										prev?.text)
									: (prev?.docFooterText ?? prev?.text),
					},
		};
	});
}
