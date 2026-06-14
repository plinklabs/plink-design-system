#!/usr/bin/env node
/**
 * Token-parity check for the vanilla CSS binding.
 *
 * `dist/plink.css` is a hand-copied mirror of the `tokens/*.css` sources (see
 * dist/README.md § "Keeping in sync"). Nothing but eyeballing kept the two in
 * step, so a token added/renamed/retuned in `tokens/` could silently drift from
 * the shipped stylesheet. This asserts the `:root` custom properties match,
 * three ways:
 *
 *   A. every token declared in tokens/ exists in dist/plink.css :root  (mirror fell behind)
 *   B. every token in dist/plink.css :root exists in tokens/           (stray / renamed token)
 *   C. tokens present in both carry the same value                     (value drift)
 *
 * Only the top-level `:root` block is compared — `.plink-ink` deliberately
 * re-maps the palette and is out of scope here.
 *
 * Exits 0 when in sync, 1 (with a report) otherwise.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import postcss from 'postcss';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

// fonts.css carries only @font-face (no custom properties), so it's excluded.
const TOKEN_FILES = ['tokens/colors.css', 'tokens/typography.css', 'tokens/spacing.css'];
const DIST = 'dist/plink.css';

/** Collect `--custom-property: value` declarations from the top-level :root rule. */
function rootVars(relPath) {
  const css = readFileSync(join(repoRoot, relPath), 'utf8');
  const vars = new Map();
  postcss.parse(css).walkRules((rule) => {
    if (rule.selector !== ':root') return; // skip .plink-ink and component rules
    rule.walkDecls((decl) => {
      if (decl.prop.startsWith('--')) {
        vars.set(decl.prop, decl.value.replace(/\s+/g, ' ').trim());
      }
    });
  });
  return vars;
}

const source = new Map(); // name -> { value, file }
for (const file of TOKEN_FILES) {
  for (const [name, value] of rootVars(file)) {
    source.set(name, { value, file });
  }
}

const dist = rootVars(DIST);
const errors = [];

// A — declared in tokens/ but missing from the shipped mirror
for (const [name, { file }] of source) {
  if (!dist.has(name)) {
    errors.push(`missing in ${DIST} :root — ${name}  (declared in ${file})`);
  }
}

// B — present in the mirror but not in any token source
for (const name of dist.keys()) {
  if (!source.has(name)) {
    errors.push(`stray in ${DIST} :root — ${name}  (not declared in any tokens/*.css)`);
  }
}

// C — present in both, but the values disagree
for (const [name, { value, file }] of source) {
  if (dist.has(name) && dist.get(name) !== value) {
    errors.push(
      `value drift — ${name}\n    ${file}: ${value}\n    ${DIST}: ${dist.get(name)}`,
    );
  }
}

if (errors.length > 0) {
  console.error(`✗ token parity: ${errors.length} issue(s) between tokens/ and ${DIST}\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error(
    `\nFix by syncing the :root block of ${DIST} with tokens/*.css (see dist/README.md § "Keeping in sync").`,
  );
  process.exit(1);
}

console.log(`✓ token parity: ${dist.size} tokens in sync between tokens/ and ${DIST}`);
