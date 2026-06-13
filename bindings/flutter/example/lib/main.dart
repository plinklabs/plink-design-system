import 'package:flutter/material.dart';
import 'package:plink_design_system/plink_design_system.dart';

void main() => runApp(const PlinkGalleryApp());

/// A gallery exercising the *whole* Plink Labs Flutter binding: the type ramp,
/// every themed Material component, and the four brand widgets. The app-bar
/// switch flips the entire gallery between the paper (light) and ink (dark)
/// themes so both can be verified in one place.
class PlinkGalleryApp extends StatefulWidget {
  const PlinkGalleryApp({super.key});

  @override
  State<PlinkGalleryApp> createState() => _PlinkGalleryAppState();
}

class _PlinkGalleryAppState extends State<PlinkGalleryApp> {
  bool _ink = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Plink Design System',
      theme: _ink ? PlinkTheme.ink : PlinkTheme.paper,
      home: _Gallery(ink: _ink, onToggle: () => setState(() => _ink = !_ink)),
    );
  }
}

class _Gallery extends StatelessWidget {
  const _Gallery({required this.ink, required this.onToggle});

  final bool ink;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    final TextTheme t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Plink Design System'),
        actions: <Widget>[
          Text('Ink', style: t.labelMedium),
          Switch(
              key: const Key('ink-toggle'),
              value: ink,
              onChanged: (_) => onToggle()),
          const SizedBox(width: PlinkSpacing.s4),
        ],
      ),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 760),
          child: ListView(
            padding: const EdgeInsets.symmetric(
                horizontal: PlinkSpacing.s6, vertical: PlinkSpacing.s6),
            children: <Widget>[
              // ── Hero ──────────────────────────────────────────────
              Eyebrow('Open source — free for every classroom', onInk: ink),
              const SizedBox(height: PlinkSpacing.s4),
              Text('Sound that\nteaches.', style: t.displayMedium),
              const SizedBox(height: PlinkSpacing.s5),
              Text(
                'Anchor turns any classroom projector into a calm, '
                'offline-first instrument. No accounts, no ads, no CDN.',
                style: t.bodyLarge,
              ),

              _SectionRule('Type', ink: ink),
              _TypeRamp(t: t),

              _SectionRule('Brand widgets', ink: ink),
              _BrandWidgets(ink: ink, t: t),

              _SectionRule('Badges', ink: ink),
              const Wrap(
                spacing: PlinkSpacing.s2,
                runSpacing: PlinkSpacing.s2,
                children: <Widget>[
                  PlinkBadge('GPL-3.0'),
                  PlinkBadge('Live', variant: BadgeVariant.spark, dot: true),
                  PlinkBadge('v2.4', variant: BadgeVariant.ink),
                  PlinkBadge('Beta', variant: BadgeVariant.accent),
                  PlinkBadge('Offline', dot: true),
                ],
              ),

              _SectionRule('Buttons', ink: ink),
              Wrap(
                spacing: PlinkSpacing.s4,
                runSpacing: PlinkSpacing.s3,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: <Widget>[
                  ElevatedButton(onPressed: () {}, child: const Text('Start')),
                  OutlinedButton(
                      onPressed: () {}, child: const Text('Learn more')),
                  TextButton(onPressed: () {}, child: const Text('Docs')),
                  const ElevatedButton(
                      onPressed: null, child: Text('Disabled')),
                ],
              ),

              _SectionRule('Inputs', ink: ink),
              const _Inputs(),

              _SectionRule('Tabs', ink: ink),
              const _Tabs(),

              _SectionRule('Card', ink: ink),
              _SampleCard(t: t),

              const SizedBox(height: PlinkSpacing.s8),
            ],
          ),
        ),
      ),
    );
  }
}

/// A labelled section divider: a mono caption over a [ScopeRule].
class _SectionRule extends StatelessWidget {
  const _SectionRule(this.label, {required this.ink});
  final String label;
  final bool ink;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
          top: PlinkSpacing.s8, bottom: PlinkSpacing.s4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(label.toUpperCase(),
              style: Theme.of(context).textTheme.labelMedium),
          const SizedBox(height: PlinkSpacing.s3),
          ScopeRule(position: 0.28, height: 40, onInk: ink),
        ],
      ),
    );
  }
}

class _TypeRamp extends StatelessWidget {
  const _TypeRamp({required this.t});
  final TextTheme t;

  @override
  Widget build(BuildContext context) {
    final List<(String, TextStyle?)> rows = <(String, TextStyle?)>[
      ('display L · Fraunces', t.displayLarge),
      ('display M', t.displayMedium),
      ('display S', t.displaySmall),
      ('title L · Hanken', t.titleLarge),
      ('title M', t.titleMedium),
      ('body L', t.bodyLarge),
      ('body M', t.bodyMedium),
      ('body S', t.bodySmall),
      ('label · Space Mono', t.labelMedium),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        for (final (String name, TextStyle? style) in rows)
          Padding(
            padding: const EdgeInsets.only(bottom: PlinkSpacing.s3),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(name.toUpperCase(), style: t.labelSmall),
                Text('Sound that teaches',
                    style: style, maxLines: 1, overflow: TextOverflow.ellipsis),
              ],
            ),
          ),
      ],
    );
  }
}

class _BrandWidgets extends StatelessWidget {
  const _BrandWidgets({required this.ink, required this.t});
  final bool ink;
  final TextTheme t;

  @override
  Widget build(BuildContext context) {
    Widget labelled(String label, Widget child) => Column(
          children: <Widget>[
            SizedBox(height: 56, child: Center(child: child)),
            const SizedBox(height: PlinkSpacing.s2),
            Text(label, style: t.labelSmall),
          ],
        );

    return Wrap(
      spacing: PlinkSpacing.s8,
      runSpacing: PlinkSpacing.s5,
      children: <Widget>[
        labelled('ping · pulse', Ping(size: 44, onInk: ink)),
        labelled(
            'ping · static', Ping(size: 28, mode: PingMode.static, onInk: ink)),
        labelled('eyebrow', Eyebrow('Live', onInk: ink)),
      ],
    );
  }
}

class _Inputs extends StatefulWidget {
  const _Inputs();
  @override
  State<_Inputs> createState() => _InputsState();
}

class _InputsState extends State<_Inputs> {
  bool _checked = true;
  bool _switched = true;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(PlinkSpacing.s5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            const TextField(
              decoration: InputDecoration(
                labelText: 'Room name',
                hintText: 'e.g. 4B — Mr. Okafor',
              ),
            ),
            const SizedBox(height: PlinkSpacing.s4),
            Row(
              children: <Widget>[
                Checkbox(
                    value: _checked,
                    onChanged: (v) => setState(() => _checked = v ?? false)),
                const Text('Keep playing offline'),
                const Spacer(),
                Switch(
                    value: _switched,
                    onChanged: (v) => setState(() => _switched = v)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Tabs extends StatelessWidget {
  const _Tabs();
  @override
  Widget build(BuildContext context) {
    return const DefaultTabController(
      length: 3,
      child: TabBar(
        tabs: <Widget>[
          Tab(text: 'Play'),
          Tab(text: 'Library'),
          Tab(text: 'Settings'),
        ],
      ),
    );
  }
}

class _SampleCard extends StatelessWidget {
  const _SampleCard({required this.t});
  final TextTheme t;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(PlinkSpacing.s5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                Text('Metronome', style: t.titleMedium),
                const Spacer(),
                const PlinkBadge('120 BPM', variant: BadgeVariant.spark),
              ],
            ),
            const SizedBox(height: PlinkSpacing.s2),
            Text(
              'A flat, calm pulse. One hairline border, six-pixel radius, '
              'no shadow — surfaces sit on the paper, they don\'t float.',
              style: t.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
