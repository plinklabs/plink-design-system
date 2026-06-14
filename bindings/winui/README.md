# PlinkDesignSystem (WinUI / .NET)

The WinUI 3 / XAML binding for the Plink Labs design system. It translates the
shared design tokens (`tokens/*.css` in the repo root) into a single merged
`ResourceDictionary` — brushes, type styles, control styles — plus a `Ping`
control and the bundled brand fonts, so WinUI apps (starting with the Anchor
agent) don't each hand-translate the theme into XAML or hardcode brand colours.

## What's in the box

- **`PlinkResources.xaml`** — the one dictionary an app merges. It pulls in:
  - **Colours** (`Themes/Colors.xaml`) — every token as a `Color` and a
    `SolidColorBrush` (`PlinkInkBrush`, `PlinkPaperBrush`, `PlinkMagentaBrush`,
    `PlinkHairlineBrush`, …), **including the full ink / on-ink family**
    (`PlinkOnInkBrush`, `PlinkMagentaOnDarkBrush`, `PlinkHairlineOnInkBrush`) —
    because the first consumer composes a full-bleed ink section.
  - **Type** (`Themes/Typography.xaml`) — `FontFamily` resources for the three
    bundled families and `TextBlock` styles for the display / body / mono ramp
    (`PlinkDisplayLargeTextStyle`, `PlinkBodyTextStyle`, `PlinkEyebrowTextStyle`,
    …).
  - **Controls** (`Themes/Controls.xaml`) — the one radius language (6px), a
    neutral instrument **Button** by default + `PlinkPrimaryButtonStyle` (the
    magenta spark), a paper **TextBox** with a magenta focus border, and
    `PlinkCardStyle` / `PlinkInkCardStyle` / `PlinkInkSectionStyle` for surfaces.
- **`Ping`** — the signature concentric-ring pulse control (`Pulse` / `Static`,
  `OnInk`, `Diameter`); respects the platform "animations" / reduced-motion
  setting.
- **Code tokens** (`PlinkColors`, `PlinkSpacing`, `PlinkRadius`, `PlinkType`) —
  for C# that builds brushes/colours directly instead of looking up resources.
- **The three brand fonts** (Fraunces, Hanken Grotesk, Space Mono — all OFL,
  the same DS-1 **ttf** the Flutter binding ships) bundled and addressed via
  `ms-appx:///PlinkDesignSystem/fonts/...`.

The binding enforces the house rules: **1px hairline borders**, **6px radius**,
**no drop shadows anywhere**, and magenta reserved as the focus / spark colour
(kept under ~5% of the pixels on any screen).

## Use it

Consume via **git submodule / shared project** (this is not published to NuGet).
Add the library project to your solution and reference it, then merge the
dictionary in `App.xaml`:

```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls" />
            <ResourceDictionary Source="ms-appx:///PlinkDesignSystem/PlinkResources.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

```xml
<!-- the ink section the agent leans on -->
<Border Style="{StaticResource PlinkInkSectionStyle}">
    <StackPanel Spacing="20">
        <TextBlock Style="{StaticResource PlinkDisplayMediumTextStyle}"
                   Foreground="{StaticResource PlinkOnInkBrush}">
            <Run Text="Built for the " /><Run Text="classroom"
                Foreground="{StaticResource PlinkMagentaOnDarkBrush}" /><Run Text="." />
        </TextBlock>
        <Button Style="{StaticResource PlinkPrimaryButtonStyle}" Content="START" />
        <pds:Ping Diameter="44" OnInk="True" />
    </StackPanel>
</Border>
```

(`xmlns:pds="using:PlinkDesignSystem.Controls"` for `Ping`.)

## Develop & verify

Requires the **.NET 10 SDK** and **Windows App SDK 2.2** (restored from NuGet;
pinned in `Directory.Build.props`).

```powershell
dotnet build PlinkDesignSystem.sln    # compiles the library + sample; the XAML
                                       # compiler validates every dictionary
```

The [`sample/`](sample/PlinkDesignSystem.Sample) app is a gallery of the whole
binding — the ink section, the type ramp, the buttons, an input, a card and the
Ping. Run it to eyeball the theme:

```powershell
dotnet run --project sample\PlinkDesignSystem.Sample
```

To verify headlessly, run it with `--smoke`: it builds the same window against
the real WinUI runtime (so every style and the Ping template must apply without
throwing), then asserts that the brushes carry the right colours, the type /
control styles resolve, the radius is 6px, the font URIs point at the bundled
ttf, the ttf files physically shipped, and — by measuring rendered text width
against a missing family — that the **fonts actually load rather than silently
falling back**. It writes `smoke-result.txt` and exits 0 / 1:

```powershell
dotnet build sample\PlinkDesignSystem.Sample -c Debug
& (Get-ChildItem -Recurse sample\PlinkDesignSystem.Sample\bin -Filter PlinkDesignSystem.Sample.exe)[0].FullName --smoke
```

> The smoke check is the automatable gate. A pixel screenshot of the live window
> needs an interactive desktop session, so eyeballing `dotnet run` is the manual
> step for the visual details (hairlines, focus ring, no shadows).
