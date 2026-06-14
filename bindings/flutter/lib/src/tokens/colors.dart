import 'package:flutter/widgets.dart';

/// Plink Labs colour tokens — a 1:1 translation of `tokens/colors.css`.
///
/// ink + paper do ~90% of the work. magenta is a SPARK, never a coat of
/// paint: the mark, one highlighted word, the pulse, one primary action.
/// Keep it under ~5% of the pixels on any screen.
abstract final class PlinkColors {
  PlinkColors._();

  // ── base ink + paper ──────────────────────────────────────────────
  /// near-black, warm.
  static const Color ink = Color(0xFF1B1B23);

  /// warm calm paper.
  static const Color paper = Color(0xFFFAF7F2);

  // paper tints (for the rare raised surface — flat, never shadowed)
  /// slightly deeper paper.
  static const Color paper2 = Color(0xFFF3EFE7);

  /// deepest paper / inset.
  static const Color paper3 = Color(0xFFECE7DC);

  // ink tints (text + hairlines, all derived from ink)
  static const Color ink80 = Color(0xFF3A3A42);

  /// body-muted text on paper.
  static const Color ink60 = Color(0xFF6E6A62);

  /// captions, labels, disabled.
  static const Color muted = Color(0xFF9A958B);

  /// 1px instrument rules.
  static const Color hairline = Color(0x241B1B23); // rgba(27,27,35,0.14)
  static const Color hairlineStrong = Color(0x421B1B23); // rgba(27,27,35,0.26)

  // ── the spark ─────────────────────────────────────────────────────
  /// magenta on light.
  static const Color magenta = Color(0xFFDB2777);

  /// pressed / hover-darken.
  static const Color magentaPress = Color(0xFFC01F68);

  /// on the full-bleed ink section.
  static const Color magentaOnDark = Color(0xFFEC4899);

  // ── on-ink (the one full-bleed ink section per page) ──────────────
  /// paper-coloured text on ink.
  static const Color onInk = Color(0xFFFAF7F2);

  /// muted text on ink.
  static const Color onInkMuted = Color(0xFF8E8A82);
  static const Color hairlineOnInk = Color(0x29FAF7F2); // rgba(250,247,242,0.16)

  // ── per-product accent (the DS-5 extension point) ─────────────────
  /// Default for the per-product accent slot — the neutral fallback an app
  /// gets until it overrides it. Plink Labs foundations + ONE per-product
  /// accent: an app layers its own identity by supplying its product mark and
  /// a single reserved accent colour via the [PlinkProductAccent] theme
  /// extension. The accent is reserved for that mark/lockup and one thin
  /// identity element ([PlinkIdentityRule]) — it must NEVER take over the
  /// magenta spark (primary action, ping, focus ring). Defaults to [ink] so an
  /// app that doesn't override it renders neutrally, never as a second spark.
  static const Color productAccent = ink;
}
