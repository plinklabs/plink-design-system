import 'package:flutter/material.dart';

import '../tokens/colors.dart';

/// The per-product accent slot (the DS-5 extension point) for the Flutter
/// binding.
///
/// Plink Labs apps share the foundations but each carries its own identity:
/// **Plink Labs foundations + ONE per-product accent**. Because the tokens in
/// [PlinkColors] are compile-time constants, an app can't "override" them — so
/// the per-app accent rides on the theme as a [ThemeExtension] instead. Every
/// [PlinkTheme] ships a default instance (`accent` = [PlinkColors.productAccent]
/// = ink), and an app overrides it once, at the root of its theme:
///
/// ```dart
/// MaterialApp(
///   theme: PlinkTheme.paper.copyWith(
///     extensions: const <ThemeExtension<dynamic>>[
///       PlinkProductAccent(Color(0xFF2563EB)), // Anchor's blue
///     ],
///   ),
/// );
/// ```
///
/// Read it back anywhere with [PlinkProductAccent.of].
///
/// The accent is **reserved** for the app's own product mark/lockup and ONE
/// thin identity element (see [PlinkIdentityRule]). It must **never** take over
/// the magenta spark — primary action, ping, and focus ring stay magenta.
@immutable
class PlinkProductAccent extends ThemeExtension<PlinkProductAccent> {
  const PlinkProductAccent([this.accent = PlinkColors.productAccent]);

  /// The single reserved per-product accent colour.
  final Color accent;

  /// The product accent for the nearest [Theme]. Falls back to the neutral
  /// default ([PlinkColors.productAccent]) when no app override is present, so
  /// callers never have to null-check.
  static PlinkProductAccent of(BuildContext context) =>
      Theme.of(context).extension<PlinkProductAccent>() ??
      const PlinkProductAccent();

  @override
  PlinkProductAccent copyWith({Color? accent}) =>
      PlinkProductAccent(accent ?? this.accent);

  @override
  PlinkProductAccent lerp(
    covariant ThemeExtension<PlinkProductAccent>? other,
    double t,
  ) {
    if (other is! PlinkProductAccent) return this;
    return PlinkProductAccent(Color.lerp(accent, other.accent, t) ?? accent);
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is PlinkProductAccent && other.accent == accent);

  @override
  int get hashCode => accent.hashCode;
}
