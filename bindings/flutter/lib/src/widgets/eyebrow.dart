import 'package:flutter/material.dart';

import '../tokens/colors.dart';
import '../tokens/typography.dart';

/// Mono uppercase kicker with a magenta ping dot — sits above oversized,
/// flush-left headlines. Mirrors the web `Eyebrow` component.
class Eyebrow extends StatelessWidget {
  const Eyebrow(this.text, {super.key, this.onInk = false});

  final String text;

  /// Recolour for the full-bleed ink section.
  final bool onInk;

  @override
  Widget build(BuildContext context) {
    final Color fg = onInk ? PlinkColors.onInk : PlinkColors.ink;
    final Color dot =
        onInk ? PlinkColors.magentaOnDark : PlinkColors.magenta;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Container(
          width: 9,
          height: 9,
          decoration: BoxDecoration(color: dot, shape: BoxShape.circle),
        ),
        const SizedBox(width: 10), // 0.65rem ≈ 10px
        // Flexible so a long kicker wraps (as the web `<p>` does) instead of
        // overflowing the row in a narrow column.
        Flexible(
          child: Text(
            text.toUpperCase(),
            style: TextStyle(
              fontFamily: PlinkType.monoFamily,
              package: PlinkType.fontPackage,
              fontFamilyFallback: PlinkType.monoFallback,
              fontSize: PlinkType.label,
              letterSpacing: PlinkType.tracking(
                  PlinkType.labelTracking, PlinkType.label),
              color: fg,
              height: 1.3,
            ),
          ),
        ),
      ],
    );
  }
}
