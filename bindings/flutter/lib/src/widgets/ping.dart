import 'package:flutter/material.dart';

import '../tokens/colors.dart';
import '../tokens/spacing.dart';

/// The signature concentric-ring pulse — loading, success, bullets, accents.
///
/// Mirrors the web `Ping` component: two rings radiate on the ping easing
/// (offset by half a cycle) around a solid core. In [PingMode.static] the
/// ring is quiet and still — a small magenta bullet.
///
/// Respects the platform "reduce motion" setting (via
/// [MediaQuery.disableAnimationsOf]); when motion is disabled the pulse
/// settles to a single quiet ring, like the web `prefers-reduced-motion` path.
enum PingMode { pulse, static }

class Ping extends StatefulWidget {
  const Ping({
    super.key,
    this.size = 28,
    this.mode = PingMode.pulse,
    this.onInk = false,
  });

  /// Overall diameter in logical pixels.
  final double size;
  final PingMode mode;

  /// Recolour for the full-bleed ink section.
  final bool onInk;

  @override
  State<Ping> createState() => _PingState();
}

class _PingState extends State<Ping> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: PlinkMotion.ping,
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _syncAnimation();
  }

  @override
  void didUpdateWidget(Ping oldWidget) {
    super.didUpdateWidget(oldWidget);
    _syncAnimation();
  }

  bool get _animate =>
      widget.mode == PingMode.pulse &&
      !MediaQuery.disableAnimationsOf(context);

  void _syncAnimation() {
    if (_animate) {
      if (!_controller.isAnimating) _controller.repeat();
    } else {
      _controller.stop();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final Color color =
        widget.onInk ? PlinkColors.magentaOnDark : PlinkColors.magenta;
    final double core = (widget.size * 0.26).clamp(4, double.infinity);

    return SizedBox.square(
      dimension: widget.size,
      child: Stack(
        alignment: Alignment.center,
        children: <Widget>[
          if (_animate) ...<Widget>[
            _PulseRing(controller: _controller, color: color, phase: 0),
            _PulseRing(controller: _controller, color: color, phase: 0.5),
          ] else
            // Quiet static ring at 72% scale, 0.45 opacity (matches the web).
            Transform.scale(
              scale: 0.72,
              child: _Ring(color: color.withValues(alpha: 0.45)),
            ),
          // Solid core.
          Container(
            width: core,
            height: core,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
        ],
      ),
    );
  }
}

/// A single 2px magenta ring filling its parent.
class _Ring extends StatelessWidget {
  const _Ring({required this.color});
  final Color color;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: color, width: 2),
      ),
    );
  }
}

/// An animated ring that scales 0.3→1.0 while fading 0.55→0, on the ping
/// easing, offset by [phase] (0–1) of the loop.
class _PulseRing extends StatelessWidget {
  const _PulseRing({
    required this.controller,
    required this.color,
    required this.phase,
  });

  final AnimationController controller;
  final Color color;
  final double phase;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: controller,
      builder: (BuildContext context, Widget? child) {
        final double t = (controller.value + phase) % 1.0;
        final double eased = PlinkMotion.easePing.transform(t);
        final double scale = 0.3 + 0.7 * eased;
        final double opacity = 0.55 * (1 - eased);
        return Transform.scale(
          scale: scale,
          child: Opacity(opacity: opacity, child: child),
        );
      },
      child: _Ring(color: color),
    );
  }
}
