import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plink_design_system/plink_design_system.dart';

void main() {
  group('PlinkTheme.paper', () {
    final ThemeData theme = PlinkTheme.paper;

    test('uses paper surface and ink text', () {
      expect(theme.colorScheme.surface, PlinkColors.paper);
      expect(theme.colorScheme.onSurface, PlinkColors.ink);
      expect(theme.scaffoldBackgroundColor, PlinkColors.paper);
      expect(theme.brightness, Brightness.light);
    });

    test('magenta is the spark: primary + focus ring', () {
      expect(theme.colorScheme.primary, PlinkColors.magenta);
      expect(theme.focusColor, PlinkColors.magenta);
      expect(theme.inputDecorationTheme.focusedBorder!.borderSide.color,
          PlinkColors.magenta);
    });

    test('ships the per-product accent slot with its neutral ink default', () {
      final PlinkProductAccent? ext = theme.extension<PlinkProductAccent>();
      expect(ext, isNotNull);
      expect(ext!.accent, PlinkColors.productAccent);
      // the default must be neutral ink, never a second spark.
      expect(PlinkColors.productAccent, PlinkColors.ink);
    });

    test('an app overrides the accent without disturbing the magenta spark', () {
      const Color appAccent = Color(0xFF2563EB);
      final ThemeData themed = PlinkTheme.paper.copyWith(
        extensions: const <ThemeExtension<dynamic>>[
          PlinkProductAccent(appAccent),
        ],
      );
      expect(themed.extension<PlinkProductAccent>()!.accent, appAccent);
      // magenta stays the spark: primary + focus ring are untouched.
      expect(themed.colorScheme.primary, PlinkColors.magenta);
      expect(themed.focusColor, PlinkColors.magenta);
    });

    test('no shadows anywhere — zero elevation, transparent shadow', () {
      expect(theme.shadowColor, Colors.transparent);
      expect(theme.cardTheme.elevation, 0);
      expect(theme.cardTheme.shadowColor, Colors.transparent);
      expect(theme.appBarTheme.elevation, 0);
      expect(theme.appBarTheme.scrolledUnderElevation, 0);
      expect(
        theme.elevatedButtonTheme.style!.elevation!
            .resolve(<WidgetState>{}),
        0,
      );
    });

    test('1px hairline borders on cards and inputs', () {
      final RoundedRectangleBorder cardShape =
          theme.cardTheme.shape! as RoundedRectangleBorder;
      expect(cardShape.side.width, PlinkBorders.width);
      expect(cardShape.side.color, PlinkColors.hairline);
      expect(theme.inputDecorationTheme.enabledBorder!.borderSide.width,
          PlinkBorders.width);
    });

    test('one radius language — 6px on cards, buttons, inputs', () {
      final RoundedRectangleBorder cardShape =
          theme.cardTheme.shape! as RoundedRectangleBorder;
      expect(
        (cardShape.borderRadius as BorderRadius).topLeft.x,
        PlinkRadius.base,
      );
      final OutlineInputBorder inputBorder =
          theme.inputDecorationTheme.border! as OutlineInputBorder;
      expect(inputBorder.borderRadius.topLeft.x, PlinkRadius.base);
    });

    test('TextTheme is wired to the three brand families (package-qualified)',
        () {
      // Package-bundled fonts register under packages/<pkg>/<Family>; the
      // theme must request that exact name or the font silently falls back.
      expect(theme.textTheme.displayLarge!.fontFamily,
          PlinkType.packaged(PlinkType.displayFamily));
      expect(theme.textTheme.bodyMedium!.fontFamily,
          PlinkType.packaged(PlinkType.bodyFamily));
      expect(theme.textTheme.labelMedium!.fontFamily,
          PlinkType.packaged(PlinkType.monoFamily));
      // Fraunces display weight rides the wght variable axis at 300.
      expect(
        theme.textTheme.displayLarge!.fontVariations!
            .firstWhere((FontVariation v) => v.axis == 'wght')
            .value,
        PlinkType.displayWeight,
      );
    });
  });

  group('PlinkTheme.ink', () {
    final ThemeData theme = PlinkTheme.ink;

    test('uses ink surface and paper-coloured text', () {
      expect(theme.colorScheme.surface, PlinkColors.ink);
      expect(theme.colorScheme.onSurface, PlinkColors.onInk);
      expect(theme.brightness, Brightness.dark);
    });

    test('spark shifts to the on-dark magenta and stays the focus ring', () {
      expect(theme.colorScheme.primary, PlinkColors.magentaOnDark);
      expect(theme.focusColor, PlinkColors.magentaOnDark);
    });

    test('still no shadows', () {
      expect(theme.shadowColor, Colors.transparent);
      expect(theme.cardTheme.elevation, 0);
    });
  });
}
