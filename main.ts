import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { REPLY } from './line.ts';

// Write exactly one support reply to /output/entry.txt. The gate accepts UTF-8
// text of 1 to 199 characters that is not only whitespace, so check those
// constraints before anything reaches the judge. The reply must stay on one
// line: the judge compares single-line replies two at a time.
const text = REPLY;
const size = [...text].length;
if (size < 1 || size > 199) {
  throw new Error(`a support reply must be 1-199 characters, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the support reply must not be only whitespace');
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('a support reply must be one line with no control characters');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character, single-line support reply to ${target}`);
