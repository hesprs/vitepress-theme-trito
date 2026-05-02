// oxlint-disable import/no-nodejs-modules
import { readFile, writeFile } from 'node:fs/promises';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	clean: true,
	declaration: true,
	entries: [
		{
			builder: 'mkdist',
			ext: 'js',
			input: 'src/',
			outDir: 'dist',
		},
	],
	hooks: {
		'build:done': replace,
	},
	parallel: true,
	sourcemap: true,
});

async function replace() {
	async function replaceScss(path: string) {
		const content = await readFile(path, 'utf8');
		const updated = content.replace(/\.scss/g, '.css');
		await writeFile(path, updated, 'utf8');
	}

	await replaceScss('./dist/index.js');
	await replaceScss('./dist/index.d.ts');
	console.log('Replaced .scss → .css in dist files');
}
