import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plink_design_system/plink_design_system.dart';

import 'support/load_fonts.dart';

Widget _host(Widget child) => MaterialApp(
      theme: PlinkTheme.paper,
      home: Scaffold(body: Center(child: child)),
    );

void main() {
  setUpAll(loadPlinkFonts);

  testWidgets('Eyebrow renders uppercased text with a dot', (tester) async {
    await tester.pumpWidget(_host(const Eyebrow('Open source')));
    expect(find.text('OPEN SOURCE'), findsOneWidget);
  });

  testWidgets('PlinkBadge renders uppercased text', (tester) async {
    await tester.pumpWidget(
      _host(const PlinkBadge('gpl-3.0', variant: BadgeVariant.spark, dot: true)),
    );
    expect(find.text('GPL-3.0'), findsOneWidget);
  });

  testWidgets('ScopeRule lays out at its given height', (tester) async {
    await tester.pumpWidget(_host(const SizedBox(
      width: 400,
      child: ScopeRule(position: 0.4, height: 60),
    )));
    expect(tester.getSize(find.byType(ScopeRule)).height, 60);
  });

  testWidgets('Ping pulses then settles, and does not pump forever',
      (tester) async {
    await tester.pumpWidget(_host(const Ping(size: 40)));
    expect(find.byType(Ping), findsOneWidget);
    await tester.pump(const Duration(milliseconds: 200));
    // A repeating controller never "settles", so pumpAndSettle would hang —
    // this confirms the animation is actually running.
    expect(tester.hasRunningAnimations, isTrue);
  });

  testWidgets('Ping honours reduce-motion (no running animation)',
      (tester) async {
    await tester.pumpWidget(MediaQuery(
      data: const MediaQueryData(disableAnimations: true),
      child: _host(const Ping(size: 40)),
    ));
    await tester.pump(const Duration(milliseconds: 200));
    expect(tester.hasRunningAnimations, isFalse);
  });

  testWidgets('Ping static mode is not animated', (tester) async {
    await tester.pumpWidget(_host(const Ping(size: 40, mode: PingMode.static)));
    await tester.pump(const Duration(milliseconds: 200));
    expect(tester.hasRunningAnimations, isFalse);
  });

  Color identityRuleColor(WidgetTester tester) => tester
      .widget<ColoredBox>(find.descendant(
        of: find.byType(PlinkIdentityRule),
        matching: find.byType(ColoredBox),
      ))
      .color;

  testWidgets('PlinkIdentityRule falls back to the neutral product default',
      (tester) async {
    // _host uses PlinkTheme.paper, which ships the default accent (ink).
    await tester.pumpWidget(_host(const PlinkIdentityRule()));
    expect(identityRuleColor(tester), PlinkColors.productAccent);
  });

  testWidgets('PlinkIdentityRule paints the app-overridden product accent',
      (tester) async {
    const Color appAccent = Color(0xFF2563EB);
    await tester.pumpWidget(MaterialApp(
      theme: PlinkTheme.paper.copyWith(
        extensions: const <ThemeExtension<dynamic>>[
          PlinkProductAccent(appAccent),
        ],
      ),
      home: const Scaffold(body: PlinkIdentityRule()),
    ));
    expect(identityRuleColor(tester), appAccent);
  });

  testWidgets('PlinkIdentityRule honours an explicit accent override',
      (tester) async {
    const Color forced = Color(0xFF0F8A5F);
    await tester.pumpWidget(_host(const PlinkIdentityRule(accent: forced)));
    expect(identityRuleColor(tester), forced);
  });
}
