import 'package:flutter/material.dart';

import '../tokens/colors.dart';
import '../tokens/spacing.dart';
import '../tokens/typography.dart';

/// Mono text chip for tags / statuses / technical labels. Square-crisp, never
/// a pill. Mirrors the web `Badge` component.
///
/// Named `PlinkBadge` to avoid colliding with Flutter's material [Badge].
enum BadgeVariant {
  /// muted text, strong hairline border, no fill.
  outline,

  /// paper text on a solid ink fill.
  ink,

  /// white text on a solid magenta fill.
  accent,

  /// magenta text + magenta hairline, no fill.
  spark,
}

class PlinkBadge extends StatelessWidget {
  const PlinkBadge(
    this.text, {
    super.key,
    this.variant = BadgeVariant.outline,
    this.dot = false,
  });

  final String text;
  final BadgeVariant variant;

  /// Adds a leading status dot in the current foreground colour.
  final bool dot;

  @override
  Widget build(BuildContext context) {
    final (Color fg, Color? bg, Color border) = switch (variant) {
      BadgeVariant.outline => (
          PlinkColors.ink60,
          null,
          PlinkColors.hairlineStrong
        ),
      BadgeVariant.ink => (PlinkColors.paper, PlinkColors.ink, PlinkColors.ink),
      BadgeVariant.accent => (
          Colors.white,
          PlinkColors.magenta,
          PlinkColors.magenta
        ),
      BadgeVariant.spark => (
          PlinkColors.magenta,
          null,
          PlinkColors.magenta
        ),
    };

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4.5),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: const BorderRadius.all(Radius.circular(PlinkRadius.sm)),
        border: Border.all(color: border, width: PlinkBorders.width),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          if (dot) ...<Widget>[
            Container(
              width: 6,
              height: 6,
              decoration: BoxDecoration(color: fg, shape: BoxShape.circle),
            ),
            const SizedBox(width: 6), // 0.4rem ≈ 6px
          ],
          Text(
            text.toUpperCase(),
            style: TextStyle(
              fontFamily: PlinkType.monoFamily,
              package: PlinkType.fontPackage,
              fontFamilyFallback: PlinkType.monoFallback,
              fontSize: PlinkType.labelSm,
              letterSpacing: PlinkType.tracking(
                  PlinkType.labelTrackingTight, PlinkType.labelSm),
              color: fg,
              height: 1,
            ),
          ),
        ],
      ),
    );
  }
}
