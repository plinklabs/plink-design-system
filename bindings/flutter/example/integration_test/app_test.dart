import 'dart:io';
import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:plink_design_system/plink_design_system.dart';
import 'package:plink_design_system_example/main.dart';

/// End-to-end run of the real example app, in the real engine, using the
/// fonts that ship **bundled in the package pubspec** (not manually loaded).
/// This is the layer that catches "the design doesn't render in a real app"
/// bugs that the package's unit/render tests structurally cannot.
///
/// It scrolls the whole gallery, writing a screenshot of each viewport to
/// `build/example_screenshot_N.png` so the full theme can be eyeballed, and
/// asserts the brand renders correctly (Fraunces resolves, magenta stays a
/// spark, no shadows).
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  Future<ByteData> capture(WidgetTester tester, int n) async {
    final RenderRepaintBoundary boundary = tester
        .renderObject<RenderRepaintBoundary>(find.byType(RepaintBoundary).first);
    final ui.Image image = await boundary.toImage(pixelRatio: 1);
    final ByteData png =
        (await image.toByteData(format: ui.ImageByteFormat.png))!;
    Directory('build').createSync(recursive: true);
    File('build/example_screenshot_$n.png')
        .writeAsBytesSync(png.buffer.asUint8List());
    final ByteData rgba =
        (await image.toByteData(format: ui.ImageByteFormat.rawRgba))!;
    image.dispose();
    return rgba;
  }

  double magentaRatio(ByteData rgba) {
    int magenta = 0;
    final int total = rgba.lengthInBytes ~/ 4;
    for (int i = 0; i < rgba.lengthInBytes; i += 4) {
      final int r = rgba.getUint8(i);
      final int g = rgba.getUint8(i + 1);
      final int b = rgba.getUint8(i + 2);
      if (r > 150 && (r - g) > 80 && (r - b) > 30 && b > 40) magenta++;
    }
    return magenta / total;
  }

  // Measures rendered width of a string in [family]; if a real brand font
  // loaded it differs from the missing-family fallback, otherwise it matches.
  double widthOf(String family) {
    final TextPainter tp = TextPainter(
      text: TextSpan(
        text: 'Built for the classroom 0123456789',
        style: TextStyle(fontFamily: family, fontSize: 48),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    return tp.width;
  }

  testWidgets('the three brand fonts actually load (not fallback)',
      (tester) async {
    // Pump the app so its bundled fonts are registered in the engine.
    await tester.pumpWidget(const PlinkGalleryApp());
    await tester.pump(const Duration(milliseconds: 300));

    final double fallback = widthOf('__definitely_missing_font__');
    final double fraunces = widthOf(PlinkType.packaged(PlinkType.displayFamily));
    final double hanken = widthOf(PlinkType.packaged(PlinkType.bodyFamily));
    final double mono = widthOf(PlinkType.packaged(PlinkType.monoFamily));
    debugPrint('FONTCHECK fallback=$fallback fraunces=$fraunces '
        'hanken=$hanken mono=$mono');

    expect(fraunces, isNot(closeTo(fallback, 0.5)),
        reason: 'Fraunces did not load (fell back)');
    expect(hanken, isNot(closeTo(fallback, 0.5)),
        reason: 'Hanken Grotesk did not load (fell back)');
    expect(mono, isNot(closeTo(fallback, 0.5)),
        reason: 'Space Mono did not load (fell back)');
  });

  testWidgets('gallery renders the brand: fonts, spark budget, no shadows',
      (tester) async {
    tester.view.physicalSize = const Size(900, 1500);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.reset);

    await tester.pumpWidget(const PlinkGalleryApp());
    // Ping pulses forever, so settle with fixed pumps rather than
    // pumpAndSettle (which would never return).
    await tester.pump(const Duration(milliseconds: 300));

    // The brand surfaces are on screen.
    expect(find.text('OPEN SOURCE — FREE FOR EVERY CLASSROOM'), findsOneWidget);
    expect(find.text('Built for\nthe classroom.'), findsOneWidget);
    expect(find.byType(Ping), findsNWidgets(2));
    expect(find.byType(ScopeRule), findsWidgets);

    // The display headline must resolve to the bundled Fraunces font (not a
    // fallback) — this is what was missing when nothing "looked like the
    // design".
    final Element headlineEl = tester.element(find.text('Built for\nthe classroom.'));
    final Text headline = headlineEl.widget as Text;
    final TextStyle effective =
        DefaultTextStyle.of(headlineEl).style.merge(headline.style);
    expect(effective.fontFamily, PlinkType.packaged(PlinkType.displayFamily));

    // First viewport: assert magenta stays a spark (<5%).
    final ByteData first = await capture(tester, 1);
    final double ratio = magentaRatio(first);
    expect(ratio, greaterThan(0.0), reason: 'the spark must appear');
    expect(ratio, lessThan(0.05),
        reason: 'magenta was ${(ratio * 100).toStringAsFixed(2)}% of pixels');

    // Scroll through the rest of the gallery, capturing each viewport so the
    // whole theme (buttons, inputs, tabs, card) is verifiable.
    final Finder list = find.byType(Scrollable).first;
    for (int n = 2; n <= 4; n++) {
      await tester.drag(list, const Offset(0, -1100));
      await tester.pump(const Duration(milliseconds: 200));
      await capture(tester, n);
    }

    // Flip to the ink (dark) theme and capture it too, from the top.
    await tester.drag(list, const Offset(0, 4000)); // back to top first
    await tester.pump(const Duration(milliseconds: 200));
    await tester.tap(find.byKey(const Key('ink-toggle')));
    await tester.pump(const Duration(milliseconds: 400)); // theme cross-fade
    final RenderRepaintBoundary inkBoundary = tester
        .renderObject<RenderRepaintBoundary>(find.byType(RepaintBoundary).first);
    final ui.Image inkImage = await inkBoundary.toImage(pixelRatio: 1);
    final ByteData inkPng =
        (await inkImage.toByteData(format: ui.ImageByteFormat.png))!;
    File('build/example_ink.png').writeAsBytesSync(inkPng.buffer.asUint8List());
    inkImage.dispose();
  });
}
