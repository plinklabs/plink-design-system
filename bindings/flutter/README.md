# plink_design_system (Flutter)

The Flutter binding for the Plink Labs design system. It translates the shared
design tokens (`tokens/*.css` in the repo root) into a Dart `ThemeData` and a
handful of brand widgets, so Flutter apps — starting with the Anchor teacher
dashboard — don't each re-implement the theme.

## What's in the box

- **`PlinkTheme.paper`** — the light theme (the default for Plink apps).
- **`PlinkTheme.ink`** — the dark / full-bleed-ink theme.
- **Tokens** — `PlinkColors`, `PlinkType`, `PlinkSpacing`, `PlinkRadius`,
  `PlinkBorders`, `PlinkMotion`.
- **Brand widgets** — `Ping`, `ScopeRule`, `Eyebrow`, `PlinkBadge`,
  `PlinkIdentityRule`.
- **Per-product accent** — `PlinkProductAccent` (a `ThemeExtension`), the DS-5
  per-app identity slot (see below).

Both themes enforce the house rules: **1px hairline borders**, **6px radius**,
**zero elevation / no shadows**, and magenta reserved as the focus / spark
colour (kept under ~5% of the pixels on any screen).

The three brand fonts (Fraunces, Hanken Grotesk, Space Mono — all OFL) are
bundled with the package and declared in `pubspec.yaml`, so they ship
automatically with any app that depends on it.

## Use it

Consume via a git or path dependency (this package is **not** published to
pub.dev). For the cross-binding picture — how all three bindings stay in lockstep
with `tokens/`, and how to request a new shared component — see the repo
[`CONSUMPTION.md`](../../CONSUMPTION.md).

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
import 'package:flutter/material.dart';
import 'package:plink_design_system/plink_design_system.dart';

void main() => runApp(MaterialApp(
      theme: PlinkTheme.paper,
      darkTheme: PlinkTheme.ink,
      home: const HomeScreen(),
    ));
```

### Brand widgets

```dart
const Eyebrow('Open source — free for every classroom');

const ScopeRule(position: 0.35);          // oscilloscope hairline rule

const PlinkBadge('GPL-3.0');              // mono chip
const PlinkBadge('Live', variant: BadgeVariant.spark, dot: true);

const Ping(size: 36);                      // animated concentric pulse
const Ping(size: 14, mode: PingMode.static); // quiet ring bullet
```

`Ping` respects the platform "reduce motion" setting; all four widgets take an
`onInk` flag to recolour for the dark section.

### Per-product accent (DS-5)

Layer this app's identity on the foundations by overriding the one accent slot —
magenta stays the spark. The accent is reserved for your product mark and the one
`PlinkIdentityRule`; it defaults to ink.

```dart
MaterialApp(
  theme: PlinkTheme.paper.copyWith(
    extensions: const [PlinkProductAccent(Color(0xFF2563EB))], // clearly NOT magenta
  ),
  home: const HomeScreen(),
);

// read it anywhere:  PlinkProductAccent.of(context).accent
const PlinkIdentityRule();   // thin top bar in the product accent
```

See the repo `readme.md` § "Per-product accent" for the full convention.

## Develop

```bash
flutter pub get
flutter analyze
flutter test                  # unit + widget + render/golden tests
flutter test --update-goldens # regenerate the screenshot baseline
```

## Verify the theme (Windows)

The [`example/`](example/lib/main.dart) app is a gallery of the **whole**
theme — the type ramp, every themed Material component (buttons, inputs,
checkbox, switch, tabs, cards) and the four brand widgets — with an app-bar
switch that flips the entire gallery between the paper (light) and ink (dark)
themes. Run it on Windows and scroll/toggle to inspect everything:

```bash
cd example
flutter pub get
flutter run -d windows        # toggle the "Ink" switch to see the dark theme
```

To verify headlessly (and produce screenshots), run the end-to-end test, which
builds the real `.exe`, renders the gallery with the bundled fonts, and writes
`example/build/example_screenshot_*.png` for each scrolled viewport:

```bash
cd example
flutter test integration_test/app_test.dart -d windows
```

> A web runner isn't committed; add one with
> `cd example && flutter create --platforms=web .` if you want `-d chrome`.
