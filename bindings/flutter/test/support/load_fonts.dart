import 'dart:io';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plink_design_system/plink_design_system.dart';

/// Loads the real brand fonts from the package `fonts/` directory so that
/// render / golden tests use true glyphs instead of the flutter_test
/// placeholder font. Call once in `setUpAll`.
///
/// The fonts are registered under the package-qualified family names
/// ([PlinkType.packaged]) so they match exactly what the theme and widgets
/// request — the same names Flutter uses when the package is consumed.
Future<void> loadPlinkFonts() async {
  TestWidgetsFlutterBinding.ensureInitialized();

  Future<void> load(String family, List<String> paths) async {
    final FontLoader loader = FontLoader(family);
    for (final String path in paths) {
      final Uint8List bytes = await File(path).readAsBytes();
      loader.addFont(Future<ByteData>.value(ByteData.sublistView(bytes)));
    }
    await loader.load();
  }

  await load(PlinkType.packaged(PlinkType.displayFamily),
      <String>['fonts/fraunces/Fraunces-Variable.ttf']);
  await load(PlinkType.packaged(PlinkType.bodyFamily),
      <String>['fonts/hanken-grotesk/HankenGrotesk-Variable.ttf']);
  await load(PlinkType.packaged(PlinkType.monoFamily), <String>[
    'fonts/space-mono/SpaceMono-Regular.ttf',
    'fonts/space-mono/SpaceMono-Bold.ttf',
  ]);
}
