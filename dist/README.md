# Plink Labs — vanilla web binding (`dist/plink.css`)

A **single, framework-free stylesheet** for plain HTML/CSS/TS surfaces that can't
load the React `_ds_bundle.js` — browser extensions (Anchor's, and future ones)
above all. It carries the brand tokens, the self-hosted webfonts, and plain
component classes that render identically to the React layer.

The React `_ds_bundle.js` is unchanged and remains the path for marketing sites.

## Use

```html
<link rel="stylesheet" href="plink.css">
```

```html
<button class="pl-btn pl-btn--primary">Browse products →</button>
<span class="pl-badge pl-badge--spark"><span class="pl-badge__dot"></span>Live</span>
<div class="pl-card"><span class="pl-card__num">01</span> … </div>
<label class="pl-field"><span class="pl-field__label">Name</span>
  <input class="pl-input" type="text" placeholder="Your classroom"></label>
<p class="pl-eyebrow"><span class="pl-eyebrow__dot"></span>EYEBROW</p>
```

See [`example.html`](example.html) for every component on paper and on ink.

## Components

| Class | Variants / modifiers |
| --- | --- |
| `.pl-btn` | `--primary` `--secondary` `--outline` `--ghost` · `--sm` `--lg` `--block` |
| `.pl-badge` | `--outline` `--ink` `--accent` `--spark` · `.pl-badge__dot` |
| `.pl-card` | `--raised` `--ink` `--interactive` · `.pl-card__num` |
| `.pl-input` / `.pl-field` | `.pl-field__label` · `.pl-input--invalid` · `textarea.pl-input` |
| `.pl-eyebrow` | `--on-ink` · `.pl-eyebrow__dot` |
| `.pl-identity-rule` | thin top identity bar in `--product-accent` (see below) |
| `.pl-ping` | `--pulse` `--static` `--on-ink` · size via `--pl-ping-size` (default 28px) |

### The ping

```html
<span class="pl-ping pl-ping--pulse" aria-hidden="true">
  <span class="pl-ping__ring"></span>
  <span class="pl-ping__ring b"></span>
  <span class="pl-ping__core"></span>
</span>
```

Set the size with the `--pl-ping-size` custom property (no JS needed):
`style="--pl-ping-size:44px"`. For a static bullet, use `pl-ping--static` with a
single `.pl-ping__ring`. The pulse respects `prefers-reduced-motion`.

## The ink treatment — `.plink-ink`

Put `.plink-ink` on any section/container and it renders on the full-bleed ink
panel: it re-maps the palette so **every `.pl-*` component inside adopts its
on-ink form automatically** — no per-component modifiers. The first consumer
(the Anchor block page) renders on ink.

```html
<section class="plink-ink">
  <button class="pl-btn pl-btn--primary">Primary</button>   <!-- brighter magenta -->
  <div class="pl-card"> … </div>                            <!-- becomes an ink card -->
  <input class="pl-input" type="text">                      <!-- on-ink field -->
</section>
```

## Per-product accent — `--product-accent`

An app layers its own identity by overriding **one** token and supplying its own
product mark. Magenta stays the spark; the accent only tints the product mark and
the one identity rule. Defaults to ink.

```css
.app-root { --product-accent: #2563EB; }   /* clearly NOT magenta */
```

```html
<div class="pl-identity-rule" aria-hidden="true"></div>   <!-- thin top bar -->
<svg style="color:var(--product-accent)"> … your product mark … </svg>
```

See the "DS-5 · per-product accent" block in [`example.html`](example.html) and
the full convention in the repo `readme.md` § "Per-product accent".

## Fonts

`@font-face` `src` paths are relative to this file and expect `assets/fonts/`
**one level up** (the repo layout). When copying this into an extension, copy
`assets/fonts/` alongside so `../assets/fonts/…` still resolves, or edit the
`src` paths at the top of `plink.css`.

## Keeping in sync

`plink.css` is the vanilla mirror of `tokens/` + the `.pl-*` classes emitted by
`components/`. If those change, update this file to match (the component blocks
are copied 1:1 and labelled with their source).
