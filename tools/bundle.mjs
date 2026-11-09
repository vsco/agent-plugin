#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { zipSync } from 'fflate';

const [pluginArg, outArg] = process.argv.slice(2);
if (!pluginArg) {
    console.error('Usage: node tools/bundle.mjs <plugin-path> [output-dir]');
    process.exit(1);
}

const source = resolve(pluginArg);
const outDir = resolve(outArg ?? 'dist');
const readManifest = (path) => JSON.parse(readFileSync(join(source, path), 'utf8'));
const { name, version } = readManifest('plugin.json');
const claudeVersion = readManifest('.claude-plugin/plugin.json').version;

if (claudeVersion !== version) {
    throw new Error(`.claude-plugin/plugin.json version ${claudeVersion} must match plugin.json version ${version}`);
}

const include = ['.claude-plugin', '.mcp.json', 'plugin.json', 'mcp.json', 'icon.png', 'skills', 'LICENSE', 'README.md'];

const walk = (path) =>
    statSync(path).isDirectory()
        ? readdirSync(path).flatMap((entry) => walk(join(path, entry)))
        : [path];

const files = Object.fromEntries(
    include
        .map((entry) => join(source, entry))
        .filter(existsSync)
        .flatMap(walk)
        .filter((path) => !path.endsWith(`${sep}.DS_Store`))
        .sort()
        .map((path) => [relative(source, path).split(sep).join('/'), readFileSync(path)]),
);

mkdirSync(join(outDir, version), { recursive: true });
const zipPath = join(outDir, version, `${name}.zip`);
writeFileSync(zipPath, zipSync(files, { level: 9, mtime: new Date(2026, 0, 1) }));
console.log(`Wrote ${zipPath} (${Object.keys(files).join(', ')})`);
