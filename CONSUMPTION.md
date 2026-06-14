# Consuming Plink Labs across platforms — and keeping the bindings in lockstep

Plink Labs apps don't re-implement the brand. They consume one of three
**bindings** that translate the shared design tokens into a native form, and the
bindings are held in parity against a single source of truth so the same button
looks the same in a Flutter dashboard, a WinUI agent, and a browser extension.

This doc covers two things:

1. **How to consume** each binding from a downstream app (dependency wiring).
2. **How the bindings stay in lockstep** — the source of truth, the per-binding
   parity gates, and how the repo is published to the Claude design project.

If you need a component that doesn't exist yet, jump to
[§ Need a component that doesn't exist yet?](#need-a-component-that-doesnt-exist-yet)
— **request it here, don't rebuild it per app.**

---

## The shape of the system

```
tokens/*.css            ← single source of truth (colours, type, spacing, radius, motion)
   │
   ├─ bindings/flutter   → Dart ThemeData + brand widgets   (git / path dependency)
   ├─ bindings/winui     → XAML ResourceDictionary + Ping    (git submodule / shared project)
   └─ dist/plink.css      → vanilla `.pl-*` CSS + .plink-ink  (vendored stylesheet)

   …and, sideways:
   DesignSync (/design-sync)  → publishes this repo into the claude.ai design project
```

`tokens/*.css` is authored once. Each binding mirrors those values into its
native vocabulary. The parity gates (below) catch a binding drifting from the
tokens.

---

## Consuming each binding

| Binding | Consume via | Brings | Full guide |
| --- | --- | --- | --- |
| **Flutter** | git or path dependency (not on pub.dev) | `PlinkTheme.paper` / `.ink`, tokens, brand widgets, the three OFL fonts bundled | [`bindings/flutter/README.md`](bindings/flutter/README.md) |
| **WinUI / .NET** | git submodule / shared project (not on NuGet) | `PlinkResources.xaml` (brushes, type, control styles), `Ping`, code tokens, bundled fonts | [`bindings/winui/README.md`](bindings/winui/README.md) |
| **Vanilla CSS** | vendored `dist/plink.css` (+ `assets/fonts/`) | tokens + `.pl-*` classes + `.plink-ink`, framework-free | [`dist/README.md`](dist/README.md) |

### Flutter — git / path dependency

```yaml
dependencies:
  plink_design_system:
    git:
      url: https://github.com/plinklabs/plink-design-system.git
      path: bindings/flutter
    # or, for local development:
    # path: ../plink-design-system/bindings/flutter
```

```dart
import 'package:plink_design_system/plink_design_system.dart';

MaterialApp(theme: PlinkTheme.paper, darkTheme: PlinkTheme.ink, home: const HomeScreen());
```

The fonts ship with the package, so any app depending on it gets them
automatically. See [`bindings/flutter/README.md`](bindings/flutter/README.md).

### WinUI / .NET — git submodule / shared project

Add the library project to your solution, reference it, and merge the one
dictionary in `App.xaml`:

```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls" />
            <ResourceDictionary Source="ms-appx:///PlinkDesignSystem/PlinkResources.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

Requires the **.NET 10 SDK** and **Windows App SDK 2.2**. See
[`bindings/winui/README.md`](bindings/winui/README.md).

### Vanilla CSS — vendored stylesheet

For plain HTML/CSS/TS surfaces that can't load the React `_ds_bundle.js`
(browser extensions above all): copy `dist/plink.css` into the consumer and link
it. Copy `assets/fonts/` alongside it so the relative `@font-face` `src` paths
(`../assets/fonts/…`) still resolve, or edit those paths.

```html
<link rel="stylesheet" href="plink.css">
<button class="pl-btn pl-btn--primary">Browse products →</button>
```

See [`dist/README.md`](dist/README.md).

### Layering an app's own identity

Every binding ships the **per-product accent** extension point: an app supplies
its own product mark and overrides **one** accent token, while magenta stays the
shared spark. Don't fork the tokens to recolour an app — use the accent slot.
The full convention (and the per-binding override snippet) is in
[`readme.md` § "Per-product accent"](readme.md).

---

## Single source of truth & parity

`tokens/*.css` (`colors.css`, `typography.css`, `spacing.css`, plus the webfonts
in `fonts.css`) is the **only** place a design value is decided. The three
bindings are mirrors of it — they must never invent or retune a value locally:

- **Flutter** — `tokens/*` → `PlinkColors` / `PlinkType` / `PlinkSpacing` / … in
  Dart, assembled into `PlinkTheme.paper` / `.ink`.
- **WinUI** — `tokens/*` → a merged `ResourceDictionary` of `Color` /
  `SolidColorBrush` / `TextBlock` / control-style resources.
- **Vanilla CSS** — `dist/plink.css` is a hand-copied 1:1 mirror of the `:root`
  custom properties in `tokens/*` plus the `.pl-*` component classes from
  `components/`.

Because the mirroring is partly by hand, each binding carries an **automated
gate** — run it before you open a PR that touches that binding:

| Binding | Gate | Command |
| --- | --- | --- |
| Flutter | static analysis + unit/widget/golden tests | `flutter analyze` && `flutter test` |
| WinUI | XAML compile + headless smoke (brushes, styles, radius, fonts actually load) | `dotnet build` then run the sample with `--smoke` |
| Vanilla CSS | stylelint + token-parity | `npm run verify` |

The vanilla gate is the one that directly enforces parity with `tokens/`:
[`scripts/check-token-parity.mjs`](scripts/check-token-parity.mjs) asserts the
`:root` block of `dist/plink.css` matches `tokens/*.css` exactly — nothing
missing, nothing stray, no value drift — and CI runs `npm run verify` on every
push/PR touching those files
([`.github/workflows/css-gate.yml`](.github/workflows/css-gate.yml)). The Flutter
and WinUI bindings are kept in step against `tokens/` **by hand** at change time;
their gates prove the binding still builds and renders, not 1:1 token parity.

**The rule for contributors:** a token change is a `tokens/*.css` change first,
then a same-PR update to every binding that surfaces it. Never patch a value in
one binding alone.

---

## DesignSync — publishing the repo to the Claude design project

`DesignSync` (the `/design-sync` tooling) is a **separate, one-way publish** of
this repo into a [claude.ai](https://claude.ai) **design-system project** — the
"Design System" pane where the tokens, type ramp, and component cards are
browsed. It reads the local repo and writes the project; it does **not** flow the
other way, and it is **not** how apps consume the bindings (that's the dependency
wiring above).

Think of it as the documentation/preview channel: `tokens/*` and `components/`
are the source, the bindings are the platform translations, and DesignSync mirrors
the source into the browsable Claude design project. Keep the source of truth in
`tokens/`; let DesignSync publish, never author.

---

## Need a component that doesn't exist yet?

**Open a component request issue here — don't build it inside your app.**

A button, field, or layout pattern built locally in one app is invisible to the
other apps and immediately drifts from the brand: it gets reimplemented (slightly
differently) in the next app, and the "same" component now looks different in
three places. That is exactly the drift this design system exists to prevent.

So when an app needs a UI element the system doesn't have yet:

1. **File a [component request](.github/ISSUE_TEMPLATE/component-request.md)** on
   this repo describing the element, where it's needed, and the states/variants
   it has to cover.
2. It gets designed once against the brand and landed in `tokens/` +
   **all three bindings together**, so every app picks it up in lockstep.
3. Your app then consumes it through its normal binding dependency — no local
   one-off.

Two things that legitimately stay in the app (not here): the app's **own product
mark/lockup**, and its **one product-accent colour** — both are the per-product
accent extension point, not new shared components. Everything else that's visual
and reusable belongs in the system.
