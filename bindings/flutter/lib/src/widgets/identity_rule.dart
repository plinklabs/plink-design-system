import 'package:flutter/material.dart';

import '../theme/product_accent.dart';

/// The one per-product identity element (the DS-5 extension point) — a thin
/// horizontal bar in the per-product [accent], for an app to mark its own
/// surface (typically pinned to the very top of the app shell / window chrome).
/// Mirrors the vanilla binding's `.pl-identity-rule` class.
///
/// Besides the app's own product mark/lockup, this is the only element the
/// product accent is allowed to colour — it is not a divider and not a spark.
/// The colour comes from [PlinkProductAccent.of] (the app's theme override),
/// so without an override it reads as a plain ink bar; pass [accent] to force a
/// colour outside a Plink theme.
class PlinkIdentityRule extends StatelessWidget {
  const PlinkIdentityRule({super.key, this.height = 2, this.accent});

  /// Bar thickness in logical pixels (2 to match the web `.pl-identity-rule`).
  final double height;

  /// Override the colour explicitly; defaults to the theme's product accent.
  final Color? accent;

  @override
  Widget build(BuildContext context) {
    final Color color = accent ?? PlinkProductAccent.of(context).accent;
    return SizedBox(
      height: height,
      width: double.infinity,
      child: ColoredBox(color: color),
    );
  }
}
