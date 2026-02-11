import { readFile, writeFile } from 'fs/promises';

const replaceScss = async (filePath: string) => {
	const content = await readFile(filePath, 'utf8');
	const updated = content.replace(/\.scss/g, '.css');
	await writeFile(filePath, updated, 'utf8');
};

await replaceScss('./dist/index.mjs');
await replaceScss('./dist/index.d.ts');
console.log('Replaced .scss → .css in dist files');
