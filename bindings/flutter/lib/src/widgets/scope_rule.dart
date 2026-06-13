import 'package:flutter/material.dart';

import '../tokens/colors.dart';
import '../tokens/spacing.dart';

/// A thin oscilloscope waveform line used as a recurring rule — a flat signal
/// that plinks once. Mirrors the web `ScopeRule` component.
///
/// The hairline flexes to fill the available width; the waveform + round
/// emission dot are a fixed, undistorted glyph (never stretched into ovals).
/// [position] (0–1) places the glyph along the rule.
class ScopeRule extends StatelessWidget {
  const ScopeRule({
    super.key,
    this.position = 0.35,
    this.height = 80,
    this.onInk = false,
  });

  final double position;
  final double height;

  /// Recolour for dark sections.
  final bool onInk;

  @override
  Widget build(BuildContext context) {
    final Color magenta =
        onInk ? PlinkColors.magentaOnDark : PlinkColors.magenta;
    final Color line =
        onInk ? PlinkColors.hairlineOnInk : PlinkColors.hairline;
    final double p = position.clamp(0.0, 1.0);

    const double glyphWidth = 172;
    final Widget hairline = SizedBox(
      height: PlinkBorders.width,
      child: ColoredBox(color: line),
    );

    return SizedBox(
      height: height,
      child: Row(
        children: <Widget>[
          if (p > 0) Expanded(flex: (p * 1000).round(), child: Center(child: hairline)),
          SizedBox(
            width: glyphWidth,
            height: height,
            child: CustomPaint(
              painter: _ScopeGlyphPainter(color: magenta),
            ),
          ),
          if (p < 1)
            Expanded(
                flex: ((1 - p) * 1000).round(),
                child: Center(child: hairline)),
        ],
      ),
    );
  }
}

/// Paints the fixed glyph: a round emission dot in open flat space, then one
/// clean plink to its right. Geometry mirrors the web SVG path exactly.
class _ScopeGlyphPainter extends CustomPainter {
  _ScopeGlyphPainter({required this.color});

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final double mid = size.height / 2;
    final double amp = (mid - 8).clamp(0.0, 22.0);
    const double dx = 30; // dot sits on the baseline, clear of the spike

    final Paint stroke = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.2
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final Path wave = Path()
      ..moveTo(0, mid)
      ..lineTo(dx - 12, mid) // baseline up to a gap before the dot
      ..moveTo(dx + 12, mid) // resume after the dot, flat lead-in
      ..lineTo(74, mid)
      ..lineTo(92, mid - amp) // the plink
      ..lineTo(110, mid + amp)
      ..lineTo(128, mid)
      ..lineTo(size.width, mid); // baseline tail
    canvas.drawPath(wave, stroke);

    final Paint fill = Paint()..color = color;
    canvas.drawCircle(Offset(dx, mid), 4.5, fill);
  }

  @override
  bool shouldRepaint(_ScopeGlyphPainter oldDelegate) =>
      oldDelegate.color != color;
}
