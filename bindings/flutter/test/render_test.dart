import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plink_design_system/plink_design_system.dart';

import 'support/load_fonts.dart';

/// A representative Plink screen — the kind of layout the teacher dashboard
/// composes. Mostly paper + ink type, with magenta reserved for the spark:
/// the eyebrow dot, one primary action, a couple of chips, the ping.
class _SampleScreen extends StatelessWidget {
  const _SampleScreen();

  @override
  Widget build(BuildContext context) {
    final TextTheme t = Theme.of(context).textTheme;
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(PlinkSpacing.s6),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const Eyebrow('Open source — free for every classroom'),
              const SizedBox(height: PlinkSpacing.s4),
              Text('Sound that\nteaches.', style: t.displayMedium),
              const SizedBox(height: PlinkSpacing.s5),
              SizedBox(
                width: 360,
                child: Text(
                  'Anchor turns any classroom projector into a calm, '
                  'offline-first instrument. No accounts, no ads, no CDN.',
                  style: t.bodyLarge,
                ),
              ),
              const SizedBox(height: PlinkSpacing.s5),
              const ScopeRule(position: 0.35, height: 56),
              const SizedBox(height: PlinkSpacing.s5),
              const Row(
                children: <Widget>[
                  PlinkBadge('GPL-3.0'),
                  SizedBox(width: PlinkSpacing.s2),
                  PlinkBadge('Live', variant: BadgeVariant.spark, dot: true),
                  SizedBox(width: PlinkSpacing.s2),
                  PlinkBadge('v2.4', variant: BadgeVariant.ink),
                ],
              ),
              const SizedBox(height: PlinkSpacing.s6),
              Row(
                children: <Widget>[
                  ElevatedButton(onPressed: () {}, child: const Text('Start')),
                  const SizedBox(width: PlinkSpacing.s4),
                  OutlinedButton(
                      onPressed: () {}, child: const Text('Learn more')),
                  const Spacer(),
                  const Ping(size: 36, mode: PingMode.static),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Counts pixels whose hue is unmistakably the magenta spark (covers both the
/// light and on-dark magentas, plus their anti-aliased edges), and ignores
/// paper / ink / muted tones.
double _magentaRatio(ByteData rgba) {
  int magenta = 0;
  final int total = rgba.lengthInBytes ~/ 4;
  for (int i = 0; i < rgba.lengthInBytes; i += 4) {
    final int r = rgba.getUint8(i);
    final int g = rgba.getUint8(i + 1);
    final int b = rgba.getUint8(i + 2);
    // High red, suppressed green, mid blue, red-dominant over blue.
    if (r > 150 && (r - g) > 80 && (r - b) > 30 && b > 40) {
      magenta++;
    }
  }
  return magenta / total;
}

void main() {
  setUpAll(loadPlinkFonts);

  testWidgets('magenta stays a spark — under 5% of rendered pixels',
      (tester) async {
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.reset);

    final GlobalKey boundaryKey = GlobalKey();
    await tester.pumpWidget(MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: PlinkTheme.paper,
      home: RepaintBoundary(key: boundaryKey, child: const _SampleScreen()),
    ));
    await tester.pump(const Duration(milliseconds: 50));

    final RenderRepaintBoundary boundary = boundaryKey.currentContext!
        .findRenderObject()! as RenderRepaintBoundary;
    // toImage() rasterizes on the real event loop, which is paused under the
    // fake-async test binding — it must run inside runAsync or it deadlocks.
    late final ByteData rgba;
    await tester.runAsync(() async {
      final ui.Image image = await boundary.toImage(pixelRatio: 1);
      rgba = (await image.toByteData(format: ui.ImageByteFormat.rawRgba))!;
      image.dispose();
    });

    final double ratio = _magentaRatio(rgba);
    expect(ratio, lessThan(0.05),
        reason: 'magenta should be a spark, was ${(ratio * 100).toStringAsFixed(2)}%');
    // Sanity: it must actually appear, or the test proves nothing.
    expect(ratio, greaterThan(0.0));
  });

  testWidgets('sample screen renders (golden screenshot)', (tester) async {
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.reset);

    await tester.pumpWidget(const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: _ThemedSample(),
    ));
    await tester.pump(const Duration(milliseconds: 50));

    await expectLater(
      find.byType(_SampleScreen),
      matchesGoldenFile('goldens/sample_screen.png'),
    );
  });
}

class _ThemedSample extends StatelessWidget {
  const _ThemedSample();
  @override
  Widget build(BuildContext context) => Theme(
        data: PlinkTheme.paper,
        child: const _SampleScreen(),
      );
}
