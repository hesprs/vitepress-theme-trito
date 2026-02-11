import type { TritoTheme } from '@';
import { useData as useData$ } from 'vitepress';

export const useData: typeof useData$<TritoTheme.Config> = useData$;
