import 'package:flutter/material.dart';

import '../tokens/colors.dart';
import '../tokens/spacing.dart';
import '../tokens/typography.dart';
import 'product_accent.dart';

/// Builds the Plink Labs [ThemeData] from the shared design tokens.
///
/// Two themes are exposed: [paper] (light — the required first consumer is
/// the teacher dashboard) and [ink] (dark — the one full-bleed ink section).
/// Both enforce the house rules: **1px hairline borders**, **6px radius**,
/// **zero elevation / no shadows**, and magenta reserved as the focus / spark.
abstract final class PlinkTheme {
  PlinkTheme._();

  /// The light "paper" theme. This is the default for Plink apps.
  static ThemeData get paper => _build(
        brightness: Brightness.light,
        surface: PlinkColors.paper,
        surfaceRaised: PlinkColors.paper2,
        onSurface: PlinkColors.ink,
        onSurfaceMuted: PlinkColors.ink60,
        spark: PlinkColors.magenta,
        sparkPress: PlinkColors.magentaPress,
        onSpark: Colors.white,
        hairline: PlinkColors.hairline,
        hairlineStrong: PlinkColors.hairlineStrong,
      );

  /// The dark "ink" theme — the full-bleed ink section.
  static ThemeData get ink => _build(
        brightness: Brightness.dark,
        surface: PlinkColors.ink,
        surfaceRaised: PlinkColors.ink80,
        onSurface: PlinkColors.onInk,
        onSurfaceMuted: PlinkColors.onInkMuted,
        spark: PlinkColors.magentaOnDark,
        sparkPress: PlinkColors.magenta,
        onSpark: PlinkColors.ink,
        hairline: PlinkColors.hairlineOnInk,
        hairlineStrong: PlinkColors.hairlineOnInk,
      );

  static ThemeData _build({
    required Brightness brightness,
    required Color surface,
    required Color surfaceRaised,
    required Color onSurface,
    required Color onSurfaceMuted,
    required Color spark,
    required Color sparkPress,
    required Color onSpark,
    required Color hairline,
    required Color hairlineStrong,
  }) {
    final ColorScheme scheme = ColorScheme(
      brightness: brightness,
      primary: spark,
      onPrimary: onSpark,
      secondary: spark,
      onSecondary: onSpark,
      surface: surface,
      onSurface: onSurface,
      surfaceContainerHighest: surfaceRaised,
      onSurfaceVariant: onSurfaceMuted,
      outline: hairlineStrong,
      outlineVariant: hairline,
      error: const Color(0xFFB3261E),
      onError: Colors.white,
    );

    final TextTheme textTheme = _textTheme(onSurface, onSurfaceMuted);

    // One radius language, one hairline. Shared by every component theme.
    const BorderRadius radius =
        BorderRadius.all(Radius.circular(PlinkRadius.base));
    final OutlineInputBorder inputBorder = OutlineInputBorder(
      borderRadius: radius,
      borderSide: BorderSide(color: hairlineStrong, width: PlinkBorders.width),
    );

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: scheme,
      // The per-product accent slot (DS-5) ships with its neutral default;
      // an app overrides it via copyWith(extensions: [PlinkProductAccent(…)]).
      extensions: const <ThemeExtension<dynamic>>[PlinkProductAccent()],
      scaffoldBackgroundColor: surface,
      canvasColor: surface,
      fontFamily: PlinkType.packaged(PlinkType.bodyFamily),
      fontFamilyFallback: PlinkType.bodyFallback,
      textTheme: textTheme,
      // No shadows anywhere — the system uses hairlines, never elevation.
      shadowColor: Colors.transparent,
      splashFactory: NoSplash.splashFactory,
      highlightColor: Colors.transparent,
      dividerTheme: DividerThemeData(
        color: hairline,
        thickness: PlinkBorders.width,
        space: PlinkBorders.width,
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        color: surface,
        surfaceTintColor: Colors.transparent,
        shadowColor: Colors.transparent,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: radius,
          side: BorderSide(color: hairline, width: PlinkBorders.width),
        ),
      ),
      appBarTheme: AppBarTheme(
        elevation: 0,
        scrolledUnderElevation: 0,
        backgroundColor: surface,
        foregroundColor: onSurface,
        surfaceTintColor: Colors.transparent,
        shadowColor: Colors.transparent,
        centerTitle: false,
        titleTextStyle: textTheme.titleLarge,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ButtonStyle(
          elevation: const WidgetStatePropertyAll<double>(0),
          shadowColor:
              const WidgetStatePropertyAll<Color>(Colors.transparent),
          surfaceTintColor:
              const WidgetStatePropertyAll<Color>(Colors.transparent),
          backgroundColor: WidgetStateProperty.resolveWith<Color>((states) {
            if (states.contains(WidgetState.pressed)) return sparkPress;
            return spark;
          }),
          foregroundColor: WidgetStatePropertyAll<Color>(onSpark),
          textStyle: WidgetStatePropertyAll<TextStyle>(textTheme.labelLarge!),
          padding: const WidgetStatePropertyAll<EdgeInsets>(
            EdgeInsets.symmetric(
                horizontal: PlinkSpacing.s5, vertical: PlinkSpacing.s3),
          ),
          shape: const WidgetStatePropertyAll<OutlinedBorder>(
            RoundedRectangleBorder(borderRadius: radius),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: ButtonStyle(
          foregroundColor: WidgetStatePropertyAll<Color>(onSurface),
          textStyle: WidgetStatePropertyAll<TextStyle>(textTheme.labelLarge!),
          side: WidgetStatePropertyAll<BorderSide>(
            BorderSide(color: hairlineStrong, width: PlinkBorders.width),
          ),
          padding: const WidgetStatePropertyAll<EdgeInsets>(
            EdgeInsets.symmetric(
                horizontal: PlinkSpacing.s5, vertical: PlinkSpacing.s3),
          ),
          shape: const WidgetStatePropertyAll<OutlinedBorder>(
            RoundedRectangleBorder(borderRadius: radius),
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: ButtonStyle(
          foregroundColor: WidgetStatePropertyAll<Color>(spark),
          textStyle: WidgetStatePropertyAll<TextStyle>(textTheme.labelLarge!),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: false,
        contentPadding: const EdgeInsets.symmetric(
            horizontal: PlinkSpacing.s4, vertical: PlinkSpacing.s3),
        border: inputBorder,
        enabledBorder: inputBorder,
        focusedBorder: inputBorder.copyWith(
          borderSide: BorderSide(color: spark, width: PlinkBorders.width),
        ),
        hintStyle: textTheme.bodyMedium?.copyWith(color: PlinkColors.muted),
        labelStyle: textTheme.bodyMedium?.copyWith(color: onSurfaceMuted),
      ),
      // Magenta focus ring everywhere a focus highlight is drawn.
      focusColor: spark,
      checkboxTheme: CheckboxThemeData(
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(PlinkRadius.sm)),
        ),
        side: BorderSide(color: hairlineStrong, width: PlinkBorders.width),
        fillColor: WidgetStateProperty.resolveWith<Color?>((states) {
          if (states.contains(WidgetState.selected)) return spark;
          return Colors.transparent;
        }),
        checkColor: WidgetStatePropertyAll<Color>(onSpark),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith<Color>((states) {
          if (states.contains(WidgetState.selected)) return onSpark;
          return surface;
        }),
        trackColor: WidgetStateProperty.resolveWith<Color>((states) {
          if (states.contains(WidgetState.selected)) return spark;
          return Colors.transparent;
        }),
        trackOutlineColor: WidgetStatePropertyAll<Color>(hairlineStrong),
      ),
      tabBarTheme: TabBarThemeData(
        indicatorColor: spark,
        labelColor: onSurface,
        unselectedLabelColor: onSurfaceMuted,
        dividerColor: hairline,
        labelStyle: textTheme.labelLarge,
        unselectedLabelStyle: textTheme.labelLarge,
      ),
    );
  }

  static TextTheme _textTheme(Color onSurface, Color onSurfaceMuted) {
    // Display — Fraunces, optical, tight tracking, wght 300.
    TextStyle display(double size, double lh) => TextStyle(
          fontFamily: PlinkType.displayFamily,
          package: PlinkType.fontPackage,
          fontFamilyFallback: PlinkType.displayFallback,
          fontVariations: PlinkType.displayWght(size),
          fontSize: size,
          height: lh,
          letterSpacing:
              PlinkType.tracking(PlinkType.displayTracking, size),
          color: onSurface,
        );

    // Body — Hanken Grotesk, wght 400/500/600.
    TextStyle body(double size, double weight, {Color? color}) => TextStyle(
          fontFamily: PlinkType.bodyFamily,
          package: PlinkType.fontPackage,
          fontFamilyFallback: PlinkType.bodyFallback,
          fontVariations: PlinkType.wght(weight),
          fontSize: size,
          height: PlinkType.bodyLh,
          color: color ?? onSurface,
        );

    // Mono — Space Mono, used for labels / eyebrows / specs.
    TextStyle mono(double size, FontWeight weight, double trackingEm) =>
        TextStyle(
          fontFamily: PlinkType.monoFamily,
          package: PlinkType.fontPackage,
          fontFamilyFallback: PlinkType.monoFallback,
          fontWeight: weight,
          fontSize: size,
          letterSpacing: PlinkType.tracking(trackingEm, size),
          color: onSurface,
        );

    return TextTheme(
      displayLarge: display(PlinkType.display1, PlinkType.display1Lh),
      displayMedium: display(PlinkType.display2, PlinkType.display2Lh),
      displaySmall: display(PlinkType.display3, PlinkType.display3Lh),
      headlineMedium: display(PlinkType.display3, PlinkType.display3Lh),
      titleLarge: body(PlinkType.textXl, PlinkType.bodyWeightStrong),
      titleMedium: body(PlinkType.textLg, PlinkType.bodyWeightMedium),
      bodyLarge: body(PlinkType.textLg, PlinkType.bodyWeight),
      bodyMedium: body(PlinkType.textBase, PlinkType.bodyWeight),
      bodySmall: body(PlinkType.textSm, PlinkType.bodyWeight,
          color: onSurfaceMuted),
      labelLarge: mono(PlinkType.label, FontWeight.w400,
          PlinkType.labelTrackingTight),
      labelMedium:
          mono(PlinkType.label, FontWeight.w400, PlinkType.labelTracking),
      labelSmall:
          mono(PlinkType.labelSm, FontWeight.w400, PlinkType.labelTracking),
    );
  }
}
