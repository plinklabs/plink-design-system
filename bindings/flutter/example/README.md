# plink_design_system — example

A gallery of the **whole** Plink Labs Flutter binding: the type ramp, every
themed Material component (buttons, inputs, checkbox, switch, tabs, cards) and
the four brand widgets (`Ping`, `ScopeRule`, `Eyebrow`, `PlinkBadge`). The
app-bar **Ink** switch flips the entire gallery between the paper (light) and
ink (dark) themes.

```bash
flutter pub get
flutter run -d windows      # then toggle "Ink" and scroll to see everything
```

## End-to-end check

[`integration_test/app_test.dart`](integration_test/app_test.dart) drives the
real app on Windows with the bundled fonts. It asserts the headline resolves to
Fraunces, magenta stays under 5% of the pixels, and there are no shadows — then
scrolls the whole gallery, writing a screenshot of each viewport to
`build/example_screenshot_*.png` (plus `build/example_ink.png` for the dark
theme).

```bash
flutter test integration_test/app_test.dart -d windows
```

> Only the Windows runner is committed. Add web with
> `flutter create --platforms=web .` if you want `flutter run -d chrome`.
