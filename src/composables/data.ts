import { useData as _useData } from 'vitepress';
import type { TritoTheme } from '@';

const useData: typeof _useData<TritoTheme.Config> = _useData;
export default useData;
