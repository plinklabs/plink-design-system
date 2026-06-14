---
name: plink-labs-design
description: Use this skill to generate well-branded interfaces and assets for Plink Labs, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Plink Labs is a lab for the classroom — free, open-source classroom tools. The aesthetic
is editorial precision meets a playful instrument panel: warm paper, confident ink, magenta only as a
spark (<5% of pixels), Fraunces display + Hanken Grotesk body + Space Mono labels, hairline borders
(never shadows), and the open-ring "ping" motif as the recurring device.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create
static HTML files for the user to view. If working on production code, you can copy assets and read
the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design,
ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code,
depending on the need.

Key files:
- `readme.md` — full brand guide: content fundamentals, visual foundations, iconography, manifest.
- `styles.css` + `tokens/` — link `styles.css` to get all tokens and webfonts.
- `components/` — React primitives (Button, Badge, Card, SpecStrip, Input, Switch, Checkbox, Logo,
  Eyebrow, Ping, PingDivider, ScopeRule, Tabs), reachable at `window.PlinkLabsDesignSystem_59a0ef`
  after loading `_ds_bundle.js`.
- `ui_kits/marketing/` — a full example homepage to copy patterns from.
- `assets/` — marks, lockups (light/dark), ping reference.
