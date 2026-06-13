import 'package:flutter/widgets.dart';

/// Plink Labs type tokens — a translation of `tokens/typography.css`.
///
/// Display: Fraunces (warm, characterful) · Body: Hanken Grotesk ·
/// Labels / section numbers / captions / technical microcopy: Space Mono —
/// the "Labs" signature.
///
/// Fraunces and Hanken Grotesk ship as variable fonts; weights are selected
/// through the `wght` [FontVariation] axis (more reliable across platforms
/// than relying on synthetic weight for variable files). Space Mono is static
/// 400 / 700 and uses [FontWeight].
abstract final class PlinkType {
  PlinkType._();

  // ── families ──────────────────────────────────────────────────────
  /// The package these fonts ship from. Flutter registers package-bundled
  /// fonts under `packages/<package>/<Family>`, so styles must either pass
  /// `package: PlinkType.fontPackage` to [TextStyle] or use [packaged].
  static const String fontPackage = 'plink_design_system';

  static const String displayFamily = 'Fraunces';
  static const String bodyFamily = 'Hanken Grotesk';
  static const String monoFamily = 'Space Mono';

  /// The package-qualified family name as registered by Flutter. Use this
  /// for plain `fontFamily` strings (e.g. [ThemeData.fontFamily]) where the
  /// `package:` parameter of [TextStyle] isn't available.
  static String packaged(String family) => 'packages/$fontPackage/$family';

  /// Fallbacks mirror the CSS font stacks for graceful degradation.
  static const List<String> displayFallback = <String>[
    'Georgia',
    'Times New Roman',
    'serif',
  ];
  static const List<String> bodyFallback = <String>['sans-serif'];
  static const List<String> monoFallback = <String>['monospace'];

  // ── weights (CSS custom-property values) ──────────────────────────
  /// Fraunces display weight. Matches the live brand site
  /// (plinklabs.org: `Fraunces:opsz,wght@9..144,300`) — light and elegant.
  /// NOTE: `tokens/typography.css` still says 560; that token is out of sync
  /// with the brand and should be reconciled separately.
  static const double displayWeight = 300;
  static const double bodyWeight = 400;
  static const double bodyWeightMedium = 500;
  static const double bodyWeightStrong = 600;

  // ── display scale (Fraunces, optical, tight) ──────────────────────
  /// hero — clamp in CSS; a sensible fixed value here.
  static const double display1 = 86.4; // 5.4rem
  static const double display2 = 54.4; // 3.4rem
  static const double display3 = 38.4; // 2.4rem
  static const double display1Lh = 0.98;
  static const double display2Lh = 1.02;
  static const double display3Lh = 1.06;
  static const double displayTracking = -0.018; // em

  // ── body scale (Hanken Grotesk) ───────────────────────────────────
  static const double textXl = 19; // 1.1875rem / lede
  static const double textLg = 17; // 1.0625rem
  static const double textBase = 16; // 1rem — the projector floor
  static const double textSm = 14; // 0.875rem
  static const double bodyLh = 1.5;

  // ── mono scale (Space Mono) — labels & microcopy ──────────────────
  static const double label = 12; // eyebrows, specs, tags
  static const double labelSm = 11; // footnotes, fine print
  static const double labelTracking = 0.14; // em — uppercase eyebrows
  static const double labelTrackingTight = 0.04; // em — sentence-case mono

  /// Converts a CSS `em` letter-spacing to Flutter's logical-pixel
  /// `letterSpacing`, which is relative to the [fontSize].
  static double tracking(double em, double fontSize) => em * fontSize;

  /// A `wght`-axis [FontVariation] list for the variable families.
  static List<FontVariation> wght(double weight) =>
      <FontVariation>[FontVariation('wght', weight)];

  /// Display (Fraunces) variations: weight plus the `opsz` optical-size axis.
  /// `opsz` tracks the font size — the same effect as CSS
  /// `font-optical-sizing: auto` — clamped to Fraunces' 9–144 axis range, so
  /// large headlines get the robust display cut instead of the spindly
  /// text-size cut.
  static List<FontVariation> displayWght(double fontSize) => <FontVariation>[
        const FontVariation('wght', displayWeight),
        FontVariation('opsz', fontSize.clamp(9.0, 144.0)),
      ];
}
