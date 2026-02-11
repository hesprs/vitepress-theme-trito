import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			builder: 'mkdist',
            input: 'src/',
            outDir: 'dist',
            addRelativeDeclarationExtensions: true
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
