import 'package:flutter/animation.dart';

/// Plink Labs spacing, radius & motion tokens — a translation of
/// `tokens/spacing.css`. One radius language: crisp ~6px. No soft 16px
/// everywhere. Hairlines, not shadows.
abstract final class PlinkSpacing {
  PlinkSpacing._();

  // ── spacing scale (8px base, baseline-friendly) ───────────────────
  static const double s0 = 0;
  static const double s1 = 4;
  static const double s2 = 8;
  static const double s3 = 12;
  static const double s4 = 16;
  static const double s5 = 24;
  static const double s6 = 32;
  static const double s7 = 48;
  static const double s8 = 64;
  static const double s9 = 84;
  static const double s10 = 112;

  /// 8px — vertical rhythm unit.
  static const double baseline = 8;

  // ── layout ────────────────────────────────────────────────────────
  /// editorial column max.
  static const double container = 1120;
  static const double gutter = 40;
}

/// Radius tokens — ONE language: crisp. There are no pills.
abstract final class PlinkRadius {
  PlinkRadius._();

  static const double sm = 4;

  /// default — buttons, inputs, cards.
  static const double base = 6;

  /// large surfaces only.
  static const double lg = 8;
}

/// Hairline border width — 1px. The system uses borders, never shadows.
abstract final class PlinkBorders {
  PlinkBorders._();

  static const double width = 1;
}

/// Motion tokens — the ping easing and durations.
abstract final class PlinkMotion {
  PlinkMotion._();

  static const Duration fast = Duration(milliseconds: 140);
  static const Duration base = Duration(milliseconds: 220);

  /// the concentric pulse loop.
  static const Duration ping = Duration(milliseconds: 1900);

  /// fast-out, settle — cubic-bezier(0.16, 1, 0.3, 1).
  static const Cubic easePing = Cubic(0.16, 1, 0.3, 1);

  /// cubic-bezier(0.2, 0, 0, 1).
  static const Cubic easeStandard = Cubic(0.2, 0, 0, 1);
}
