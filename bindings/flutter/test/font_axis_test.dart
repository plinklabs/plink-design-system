import 'dart:io';
import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';
import 'package:plink_design_system/plink_design_system.dart';

/// Reads the variable-axis ranges from a TrueType/OpenType font's `fvar`
/// table. Returns a map of axis tag → (min, default, max).
///
/// A font's declared weight is meaningless if the file's `wght` axis doesn't
/// actually cover it: a request outside the axis range is clamped to the
/// nearest end. The self-hosted Fraunces was once subset to wght 400–650, so
/// [PlinkType.displayWeight] (300) silently rendered at 400. This parser lets
/// the test below assert the font can really produce the weights we ship.
Map<String, ({double min, double def, double max})> readFvarAxes(File file) {
  final ByteData data = ByteData.sublistView(file.readAsBytesSync());

  // sfnt header: numTables at offset 4; 16-byte table records from offset 12.
  final int numTables = data.getUint16(4);
  int? fvarOffset;
  for (int i = 0; i < numTables; i++) {
    final int rec = 12 + i * 16;
    final String tag = String.fromCharCodes(
        <int>[for (int j = 0; j < 4; j++) data.getUint8(rec + j)]);
    if (tag == 'fvar') {
      fvarOffset = data.getUint32(rec + 8);
      break;
    }
  }
  if (fvarOffset == null) {
    throw StateError('font has no fvar table (not a variable font)');
  }

  // fvar header: axesArrayOffset @ +4, axisCount @ +8, axisSize @ +10.
  final int axesArrayOffset = data.getUint16(fvarOffset + 4);
  final int axisCount = data.getUint16(fvarOffset + 8);
  final int axisSize = data.getUint16(fvarOffset + 10);

  // Fixed 16.16 → double.
  double fixed(int byteOffset) => data.getInt32(byteOffset) / 65536.0;

  final Map<String, ({double min, double def, double max})> axes =
      <String, ({double min, double def, double max})>{};
  for (int i = 0; i < axisCount; i++) {
    final int a = fvarOffset + axesArrayOffset + i * axisSize;
    final String tag = String.fromCharCodes(
        <int>[for (int j = 0; j < 4; j++) data.getUint8(a + j)]);
    axes[tag] = (min: fixed(a + 4), def: fixed(a + 8), max: fixed(a + 12));
  }
  return axes;
}

void main() {
  group('bundled Fraunces variable font', () {
    final File fraunces = File('fonts/fraunces/Fraunces-Variable.ttf');

    test('exists', () {
      expect(fraunces.existsSync(), isTrue,
          reason: 'package must ship the Fraunces variable font');
    });

    test('wght axis actually covers the display weight we ship', () {
      final axes = readFvarAxes(fraunces);
      expect(axes.keys, contains('wght'));
      final wght = axes['wght']!;
      // The token claims 300; the file must physically span it, or the brand
      // weight clamps up. Regression guard for the 400-floor subset bug.
      expect(PlinkType.displayWeight, greaterThanOrEqualTo(wght.min));
      expect(PlinkType.displayWeight, lessThanOrEqualTo(wght.max));
      expect(wght.min, lessThanOrEqualTo(300),
          reason: 'Fraunces must carry the 300 master to match the brand');
    });

    test('keeps the optical-size axis (opsz 9–144)', () {
      final axes = readFvarAxes(fraunces);
      expect(axes.keys, contains('opsz'));
      final opsz = axes['opsz']!;
      expect(opsz.min, lessThanOrEqualTo(9));
      expect(opsz.max, greaterThanOrEqualTo(144));
    });
  });
}
