import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			builder: 'mkdist',
			input: 'src/',
			outDir: 'dist',
			ext: 'js',
		},
	],
	replace: {
		'.scss': '.css',
	},
	clean: true,
	sourcemap: true,
	declaration: true,
	parallel: true,
});
