import { computed } from 'vue';
import { useData } from './data';

export function usePrevNext() {
	const { theme, frontmatter } = useData();

	return computed(() => {
		const hidePrev =
			(theme.value.docFooter?.prev === false && !frontmatter.value.prev) ||
			frontmatter.value.prev === false;

		const hideNext =
			(theme.value.docFooter?.next === false && !frontmatter.value.next) ||
			frontmatter.value.next === false;

		return {
			prev: hidePrev
				? undefined
				: {
						text:
							typeof frontmatter.value.prev === 'string'
								? frontmatter.value.prev
								: typeof frontmatter.value.prev === 'object'
									? frontmatter.value.prev.text
									: undefined,
						link:
							typeof frontmatter.value.prev === 'object'
								? frontmatter.value.prev.link
								: undefined,
					},
			next: hideNext
				? undefined
				: {
						text:
							typeof frontmatter.value.next === 'string'
								? frontmatter.value.next
								: typeof frontmatter.value.next === 'object'
									? frontmatter.value.next.text
									: undefined,
						link:
							typeof frontmatter.value.next === 'object'
								? frontmatter.value.next.link
								: undefined,
					},
		} as {
			prev?: { text?: string; link?: string };
			next?: { text?: string; link?: string };
		};
	});
}
