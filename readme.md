# Plink Labs — Design System

**Plink Labs is a lab for the classroom.** Free, open-source classroom tools —
a timer, picker, planner, attendance roll, flashcards, whiteboard — made by teachers, with no ads, no
tracking, and no accounts. This design system is the brand's foundations, components, and
product surfaces, packaged so design agents can build on-brand interfaces and assets.

**The one idea:** *editorial precision meets a playful instrument panel.* Calm warm paper,
heavy confident ink, magenta only as the spark — measured, labelled, a little bit like a synth.
Reference touchstones for *feel* (not to copy): Teenage Engineering's playful precision,
Dieter Rams / Braun restraint, well-set print editorial.

## Sources
This system was authored from a written design direction plus four uploaded reference assets
(no codebase or Figma was provided):
- `uploads/plink-labs-hero-reference.html` — the hero "feel" target (matched, not pixel-copied).
- `uploads/plink-mark.svg` — the open-ring mark.
- **`uploads/plink-lockup-light.svg`** — wordmark lockup (was set in Inter; **rebuilt** here with the "plink labs" wordmark in **Fraunces**, the brand display face).
- `uploads/plink-labs-ping-variations.svg` — six ping treatments (was **coral `#FB5A3C`**; **recoloured** to brand magenta here).

If a real codebase or Figma file exists, re-attach it and these recreations can be tightened against source.

---

## CONTENT FUNDAMENTALS — how Plink Labs writes

**Voice:** plain, warm, a little dry. A teacher who respects your time, not a growth marketer.
Confidence comes from restraint, not exclamation marks.

- **Person:** speaks as "we" about the project ("Made by teachers"); addresses the reader as
  "you"/"your classroom". Never corporate "Plink Labs is committed to…".
- **Casing:** sentence case everywhere in prose and UI. The wordmark "plink labs" is **lowercase**.
  Mono microcopy (eyebrows, specs, tags) is **UPPERCASE** with wide tracking.
- **Sentence length:** short, declarative. Em-dashes and lists do the structuring. e.g.
  *"Made by teachers, free for everyone. Open source, no ads, no tracking — just tools that
  help students learn and teachers teach."*
- **Technical microcopy is a feature, not a footnote.** Mono spec chips state facts flatly:
  `GPL-3.0` · `GDPR-clean` · `Works offline` · `16px → projector`. Section numbers (`01 / 04`)
  and code-comment asides (`// reference target`) reinforce the "Labs" feel.
- **Claims are concrete and verifiable:** "no ads", "no tracking", "no accounts", "works
  offline", "GPL-3.0" — never vague ("best-in-class", "delightful").
- **Emoji:** none. The ping mark and mono symbols (★, →, //) carry any "icon" duty.
- **Numbers/specs:** only when they mean something (a licence, a font size, a beat count).
  No invented stats, no slop.

**Headline pattern:** one oversized Fraunces line, flush-left, with exactly **one** magenta word
and (optionally) an inline ping. e.g. "Good **software** for the classroom ◉".

---

## VISUAL FOUNDATIONS

**Colour.** Paper `#FAF7F2` and ink `#1B1B23` do ~90% of the work. Magenta is a **spark, not a
coat of paint** — it appears only on the mark, **one** highlighted word per screen, the pulse
animation, and a **single** primary action. If magenta covers more than ~5% of the pixels, it's
wrong. `#DB2777` on light, `#EC4899` on the ink section. Muted text `#6E6A62`; captions/labels
`#9A958B`. **No gradients, no glassmorphism — flat fills only.** Never orange.

**Type.**
- **Display — Fraunces** (warm, characterful). Weight 300 + optical sizing (opsz 9–144), line-height 0.98–1.06, tracking −0.018em.
  Oversized and flush-left; never centered.
- **Body/UI — Hanken Grotesk** (400/500/600). 16px is the floor (projector legibility). Lede 19px.
- **Labels/mono — Space Mono** (the "Labs" signature). Section numbers, tags, eyebrows, specs,
  captions, code-comment asides. UPPERCASE + wide tracking for eyebrows; sentence mono elsewhere.
- All three are OFL-licensed.

**Structure.** Left-aligned **asymmetric editorial grid** — the centered hero is banned. Make the
structure *visible*: mono section numbers, hairline rules, a real baseline rhythm (8px). Whitespace
with tension, not symmetric padding on everything. Column max `1120px`, gutter `40px`, measure `46ch`.

**Backgrounds.** Flat paper by default; exactly **one full-bleed ink section per page** for drama.
No images-as-texture, no gradients, no patterns. A faint oversized open-ring **watermark** may sit
behind the hero (≈6% opacity).

**Borders, cards & elevation.** **Hairlines, not shadows.** 1px ink hairline (`rgba(27,27,35,.14)`,
strong `.26`) + flat fill — reads like an instrument panel, not a SaaS dashboard. **No drop shadows
anywhere.** Cards are flat paper (or ink) with a hairline border and a mono section number; hover
darkens the *border* to full ink (or magenta on ink), never adds a shadow.

**Radius.** One language: **crisp ~6px** (`--radius`), 4px small, 8px large surfaces only. **No pills**
(`--radius-pill: 0`) — badges are square-ish mono chips, never pill + green checkmark.

**The signature motif — the ping is everywhere.** The open-ring mark / concentric rings recur as:
bullets (`Ping mode="static"`), the **divider between sections** (a ping radiating across a hairline,
`PingDivider`), loading + success states (`Ping mode="pulse"`), and the hero watermark. A thin
**oscilloscope/waveform line** (`ScopeRule`) is a recurring horizontal rule — plink = sound. This
repeated device is what makes it unmistakably Plink Labs.

**Animation.** Restrained and physical. The ping pulse loops on `--ease-ping`
(`cubic-bezier(.16,1,.3,1)`) over `--dur-ping` (1900ms): scale 0.3→1, opacity .55→0. UI transitions
are fast (`--dur-fast` 140ms) on `--ease-standard`. **No bounce, no parallax, no decorative loops on
content.** Everything animating respects `prefers-reduced-motion`.

**Hover / press.** Hover: primary button darkens magenta→`#C01F68`; outline/card borders darken to
ink; links go magenta or full opacity. Press: buttons nudge `translateY(.5px) scale(.985)` — a tiny
physical click, no colour flip. Focus: 2px magenta outline, 2px offset (inputs get a 3px magenta glow ring).

**Imagery.** There is essentially none by default — the brand is typographic + the ping device.
If photography is ever used, keep it warm and plain. No stock-photo gradients or glassy 3D.

---

## PER-PRODUCT ACCENT — how an app layers its identity

Plink Labs apps share these foundations, but each product carries its own
identity. The convention is deliberately narrow: **Plink Labs foundations + ONE
per-product accent.** An app layers its identity by doing exactly two things —
supplying **its own product mark/lockup**, and overriding **one reserved accent
token**. Anchor is the first product to use it.

**The one rule:** the product accent must **never** touch or compete with the
magenta spark. Magenta stays the single in-app spark — the one highlighted word,
the ping, the focus ring, and the one primary action — exactly as in VISUAL
FOUNDATIONS. The product accent is **reserved** for just two things:

1. the app's own **product mark / lockup**, and
2. **one** thin **identity element** — a hairline-weight top *identity rule*
   (`.pl-identity-rule` / `PlinkIdentityRule`), typically pinned to the top of
   the app shell or window chrome.

Nothing else reacts to it. If the product accent starts coloring buttons,
badges, links, or pings, it has become a second spark — which is wrong. Pick one
accent that is clearly **not** magenta. The slot defaults to **ink**, so an app
that doesn't override it renders neutrally rather than as a second spark.

**Where the mark/lockup live:** the *Plink Labs* marks/lockups are in `assets/`
(`plink-mark.svg`, `plink-lockup-light.svg`, …). A **product's own** mark is
owned by that app, not this repo — it lives in the app and is tinted with the
product accent (e.g. `fill`/`color: var(--product-accent)`).

**The token slot, per binding:**

- **CSS / vanilla (DS-4)** — token `--product-accent` (declared in
  `tokens/colors.css` and `dist/plink.css`, default `var(--ink)`). Override it on
  any scope:
  ```css
  .app-root { --product-accent: #2563EB; }   /* Anchor blue */
  ```
  Use it via the `.pl-identity-rule` element and on your product mark. See
  `dist/example.html` for two apps overriding it while magenta stays the spark.

- **Flutter (DS-2)** — the `PlinkProductAccent` `ThemeExtension` (default
  `PlinkColors.productAccent` = ink). Override once at the theme root:
  ```dart
  theme: PlinkTheme.paper.copyWith(
    extensions: const [PlinkProductAccent(Color(0xFF2563EB))],
  ),
  ```
  Read it with `PlinkProductAccent.of(context).accent`; render the identity rule
  with `PlinkIdentityRule()`.

- **WinUI (DS-3)** — the `PlinkProductAccentColor` / `PlinkProductAccentBrush`
  resources (default ink; `PlinkColors.ProductAccent` in code). Override by
  redefining the keys **after** the binding's merge, in `App.xaml`:
  ```xml
  <ResourceDictionary>
    <ResourceDictionary.MergedDictionaries>
      <ResourceDictionary Source="ms-appx:///PlinkDesignSystem/PlinkResources.xaml" />
    </ResourceDictionary.MergedDictionaries>
    <Color x:Key="PlinkProductAccentColor">#FF2563EB</Color>
    <SolidColorBrush x:Key="PlinkProductAccentBrush" Color="{StaticResource PlinkProductAccentColor}" />
  </ResourceDictionary>
  ```
  Use `{StaticResource PlinkProductAccentBrush}` on a 2px top `Border` and your
  product mark. See the sample.

---

## ICONOGRAPHY

Plink Labs is **deliberately icon-light**. The system leans on one proprietary device and a few
mono glyphs rather than a general icon set:

- **The ping mark** (open ring + filled centre) is the primary "icon" — as a logo, a list bullet
  (`Ping mode="static"`), a loading/success pulse, a divider, and a watermark. Use the components
  `Logo`, `Ping`, `PingDivider`, `ScopeRule`, or the SVG assets in `assets/`.
- **Mono unicode glyphs** carry small UI duties in Space Mono: `→` (forward/links), `★` (GitHub star),
  `//` (code-comment asides), `◉`/`·` (separators). These are typographic, not an icon font.
- **No emoji.** No coloured icon illustrations. No green-checkmark trust rows.
- **No bundled icon font.** If a UI genuinely needs functional glyphs beyond the above (e.g. a media
  player), use a thin-stroke open-source set that matches the hairline weight — **Lucide** (1.5–2px
  stroke) is the recommended CDN substitute. **Flag any such addition** — it is not yet part of the
  system. Keep strokes hairline-thin and monochrome ink; never fill them magenta.

Assets in `assets/`: `plink-mark.svg`, `plink-mark-dark.svg`, `plink-lockup-light.svg`,
`plink-lockup-dark.svg`, `ping-variations.svg` (brand-recoloured reference of the six ping treatments).

---

## Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this one file). `@import` lines only.
- `tokens/` — `fonts.css` (webfonts), `colors.css`, `typography.css`, `spacing.css` (+ radius/motion).
- `dist/plink.css` — vanilla, React-free binding: tokens + plain `.pl-*` component classes +
  the `.plink-ink` base class, in one self-contained file. For plain HTML/CSS/TS surfaces
  (browser extensions) that can't load `_ds_bundle.js`. See `dist/README.md`.
- `assets/` — marks, lockups (light/dark), ping-variations reference.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand) for the Design System tab.
- `readme.md` (this file) · `SKILL.md` (Agent-Skills compatible entry).

**Components** (`window.PlinkLabsDesignSystem_59a0ef`)
- `components/core/` — `Button`, `Badge`, `Card`, `SpecStrip`
- `components/forms/` — `Input`, `Switch`, `Checkbox`
- `components/brand/` — `Logo`, `Eyebrow`, `Ping`, `PingDivider`, `ScopeRule`
- `components/navigation/` — `Tabs`

**UI kits**
- `ui_kits/marketing/` — the open-source marketing homepage (Nav, Hero, Products, Mission, Footer).

**Generated (do not edit):** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

---

## Notes & substitutions
- **Fonts** are loaded from Google Fonts (woff2) via `@import` in `tokens/fonts.css` — all three
  families (Fraunces, Hanken Grotesk, Space Mono) are the *real* specified faces, OFL-licensed.
  They are not self-hosted binaries; if you need an offline/self-hosted bundle, drop the woff2 files
  in `assets/fonts/` and swap the `@import` for local `@font-face` rules.
- The lockup was **rebuilt** off Inter (per the "drop Inter" rule) — the "plink labs" wordmark is
  now set in **Fraunces** (the brand display face) — and the ping-variations reference
  was **recoloured** from coral to brand magenta.
