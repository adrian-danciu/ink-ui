import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const packages = ['tokens', 'react', 'react-native'];

for (const directory of packages) {
  const packageDirectory = resolve('packages', directory);
  const manifest = JSON.parse(readFileSync(resolve(packageDirectory, 'package.json'), 'utf8'));
  const versionUrl = `https://registry.npmjs.org/${encodeURIComponent(manifest.name)}/${encodeURIComponent(manifest.version)}`;
  const response = await fetch(versionUrl);

  if (response.ok) {
    console.log(`${manifest.name}@${manifest.version} is already published.`);
    continue;
  }
  if (response.status !== 404) {
    throw new Error(`Could not check ${manifest.name}@${manifest.version}: npm returned ${response.status}.`);
  }

  console.log(`Publishing ${manifest.name}@${manifest.version}...`);
  const result = spawnSync('npm', ['publish', '--access', 'public', '--provenance'], {
    cwd: packageDirectory,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
