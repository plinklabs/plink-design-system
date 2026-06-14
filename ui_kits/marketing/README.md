# Marketing Site — UI kit

The Plink Labs open-source marketing homepage. An editorial, instrument-panel take on a product
landing page: asymmetric grid, oversized flush-left Fraunces headline, mono technical microcopy,
and the ping motif as the recurring device. One magenta spark per region; one full-bleed ink section.

## Screens / regions
- `Nav.jsx` — logo + links + a single ink "Browse products" button.
- `Hero.jsx` — eyebrow, oversized headline with one magenta word + inline ping, lede, primary CTA + ghost star, faint open-ring watermark, oscilloscope rule, spec strip.
- `Products.jsx` — the six classroom tools as flat hairline cards with mono section numbers and a static-ping bullet.
- `Mission.jsx` — the one full-bleed **ink** section: a Fraunces statement, three mono-numbered columns, a magenta CTA, an on-ink spec strip.
- `Footer.jsx` — mono microcopy, hairline rules, link columns, the mark.

`index.html` composes them with a `PingDivider` between hero and products, and holds all page-level CSS.

## How it's built
Reusable primitives come from the design-system bundle via `window.PlinkLabsDesignSystem_59a0ef`
(Logo, Eyebrow, Button, Badge, Card, SpecStrip, Ping, PingDivider, ScopeRule). The kit only adds
page layout/composition — it does not re-implement primitives.

Open `index.html`. It loads React UMD + Babel + `../../_ds_bundle.js`, then each `*.jsx` as `text/babel`.
