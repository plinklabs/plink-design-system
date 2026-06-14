---
name: Component request
about: Request a new shared UI element (component, pattern, or token) so it's built
  once here and lands in every binding — instead of being reimplemented per app.
title: 'Component: <name>'
labels: feature, design
---

<!--
Before filing: this is for UI that should be SHARED across Plink Labs apps.

Two things that stay in YOUR app and don't need a request: your product's own
mark/lockup, and your one product-accent colour. Those are the per-product
accent extension point (see readme.md § "Per-product accent"), not new shared
components.

Everything else that's visual and reusable belongs in the system — request it
here so it's designed once and mirrored into all three bindings (Flutter, WinUI,
vanilla CSS) in lockstep. See CONSUMPTION.md.
-->

## The element
<!-- What is it? A button variant, a field, a layout pattern, a new token? -->

## Where it's needed
<!-- Which app(s) need it, and what is the surface/flow it appears in? -->

## States & variants
<!-- The states/variants it must cover: sizes, on-ink vs paper, hover/focus/
disabled, empty/loading/error, etc. -->

## Brand fit
<!-- How does it follow the foundations — hairlines (no shadows), 6px radius,
magenta only as the spark, the ping motif where relevant? Link a reference if
you have one. -->

## Bindings needed
<!-- Which bindings must carry it? Default is all three so apps stay in lockstep. -->
- [ ] Flutter (`bindings/flutter`)
- [ ] WinUI (`bindings/winui`)
- [ ] Vanilla CSS (`dist/plink.css`)
