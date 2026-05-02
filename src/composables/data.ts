import type { TritoTheme } from '@';
import { useData as _useData } from 'vitepress';

const useData: typeof _useData<TritoTheme.Config> = _useData;
export default useData;
