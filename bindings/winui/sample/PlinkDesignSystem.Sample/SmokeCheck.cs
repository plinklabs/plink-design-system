using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Media;
using Windows.UI;

namespace PlinkDesignSystem.Sample;

/// <summary>
/// Asserts the merged design-system dictionary actually resolved in the real
/// WinUI runtime: the brushes carry the right colours, the type / control
/// styles are present, the font-family URIs point at the bundled ttf, and the
/// ttf files physically shipped next to the exe. Reaching here at all proves
/// App.xaml merged and MainWindow (every styled control + the Ping template)
/// built without throwing.
/// </summary>
internal static class SmokeCheck
{
    public static (bool ok, string report) Run()
    {
        var log = new StringBuilder();
        var failures = new List<string>();

        void Pass(string msg) => log.AppendLine("  ok   " + msg);
        void Fail(string msg)
        {
            log.AppendLine("  FAIL " + msg);
            failures.Add(msg);
        }

        var res = Application.Current.Resources;

        object? Lookup(string key) => res.TryGetValue(key, out var v) ? v : null;

        void Brush(string key, Color expected)
        {
            if (Lookup(key) is SolidColorBrush b)
            {
                if (b.Color == expected) Pass($"{key} = {Hex(b.Color)}");
                else Fail($"{key} expected {Hex(expected)} but was {Hex(b.Color)}");
            }
            else
            {
                Fail($"{key} missing or not a SolidColorBrush");
            }
        }

        void Style(string key, Type target)
        {
            if (Lookup(key) is Style s)
            {
                if (s.TargetType == target) Pass($"{key} (Style for {target.Name})");
                else Fail($"{key} targets {s.TargetType?.Name}, expected {target.Name}");
            }
            else
            {
                Fail($"{key} missing or not a Style");
            }
        }

        void Font(string key, string mustContain)
        {
            if (Lookup(key) is FontFamily f)
            {
                if (f.Source.Contains(mustContain, StringComparison.OrdinalIgnoreCase))
                    Pass($"{key} -> {f.Source}");
                else
                    Fail($"{key} source '{f.Source}' does not contain '{mustContain}'");
            }
            else
            {
                Fail($"{key} missing or not a FontFamily");
            }
        }

        log.AppendLine("Plink Labs WinUI binding — smoke check");
        log.AppendLine();
        log.AppendLine("[brushes]");
        Brush("PlinkInkBrush", PlinkColors.Ink);
        Brush("PlinkPaperBrush", PlinkColors.Paper);
        Brush("PlinkMagentaBrush", PlinkColors.Magenta);
        Brush("PlinkMagentaOnDarkBrush", PlinkColors.MagentaOnDark);
        Brush("PlinkHairlineBrush", PlinkColors.Hairline);
        Brush("PlinkHairlineOnInkBrush", PlinkColors.HairlineOnInk);
        Brush("PlinkOnInkBrush", PlinkColors.OnInk);
        Brush("PlinkFocusRingBrush", PlinkColors.Magenta);

        log.AppendLine();
        log.AppendLine("[per-product accent — DS-5]");
        // The binding ships a neutral ink default in code...
        if (PlinkColors.ProductAccent == PlinkColors.Ink)
            Pass("PlinkColors.ProductAccent default = ink (neutral)");
        else
            Fail($"PlinkColors.ProductAccent expected ink but was {Hex(PlinkColors.ProductAccent)}");
        // ...and the sample app overrides the slot in App.xaml, so the resolved
        // brush must be the app's accent — proving the override path works
        // end-to-end (a merged key, defined after the binding, wins).
        Brush("PlinkProductAccentBrush", Color.FromArgb(0xFF, 0x25, 0x63, 0xEB));

        log.AppendLine();
        log.AppendLine("[type styles]");
        Style("PlinkDisplayLargeTextStyle", typeof(Microsoft.UI.Xaml.Controls.TextBlock));
        Style("PlinkBodyTextStyle", typeof(Microsoft.UI.Xaml.Controls.TextBlock));
        Style("PlinkEyebrowTextStyle", typeof(Microsoft.UI.Xaml.Controls.TextBlock));

        log.AppendLine();
        log.AppendLine("[control styles]");
        Style("PlinkPrimaryButtonStyle", typeof(Microsoft.UI.Xaml.Controls.Button));
        Style("PlinkSecondaryButtonStyle", typeof(Microsoft.UI.Xaml.Controls.Button));
        Style("PlinkCardStyle", typeof(Microsoft.UI.Xaml.Controls.Border));
        Style("PlinkInkCardStyle", typeof(Microsoft.UI.Xaml.Controls.Border));

        log.AppendLine();
        log.AppendLine("[one radius language]");
        if (Lookup("ControlCornerRadius") is CornerRadius cr && Math.Abs(cr.TopLeft - 6) < 0.001)
            Pass($"ControlCornerRadius = {cr.TopLeft}");
        else
            Fail("ControlCornerRadius is not 6");

        log.AppendLine();
        log.AppendLine("[fonts]");
        Font("PlinkDisplayFontFamily", "Fraunces");
        Font("PlinkBodyFontFamily", "HankenGrotesk");
        Font("PlinkMonoFontFamily", "SpaceMono");

        log.AppendLine();
        log.AppendLine("[bundled ttf on disk — the ms-appx:///PlinkDesignSystem/... layout]");
        foreach (var rel in new[]
        {
            @"PlinkDesignSystem\fonts\fraunces\Fraunces-Variable.ttf",
            @"PlinkDesignSystem\fonts\hanken-grotesk\HankenGrotesk-Variable.ttf",
            @"PlinkDesignSystem\fonts\space-mono\SpaceMono-Regular.ttf",
            @"PlinkDesignSystem\fonts\space-mono\SpaceMono-Bold.ttf",
        })
        {
            var path = Path.Combine(AppContext.BaseDirectory, rel);
            if (File.Exists(path)) Pass($"{rel} ({new FileInfo(path).Length} bytes)");
            else Fail($"{rel} not shipped (looked in {AppContext.BaseDirectory})");
        }

        log.AppendLine();
        log.AppendLine("[fonts actually render (not fallback)]");
        // Measure a string in each bundled family and in a deliberately-missing
        // family. If the real face loaded, the width differs from the fallback;
        // if it silently fell back, the widths match. Mirrors the Flutter
        // binding's font-load assertion.
        const string probe = "Built for the classroom 0123456789";
        var fallbackWidth = MeasureWidth(probe, new FontFamily("__plink_missing_font__"));
        foreach (var key in new[] { "PlinkDisplayFontFamily", "PlinkBodyFontFamily", "PlinkMonoFontFamily" })
        {
            if (Lookup(key) is FontFamily f)
            {
                var w = MeasureWidth(probe, f);
                if (Math.Abs(w - fallbackWidth) > 0.5)
                    Pass($"{key} renders at {w:F1}px (fallback {fallbackWidth:F1}px)");
                else
                    Fail($"{key} fell back — width {w:F1}px == fallback {fallbackWidth:F1}px");
            }
        }

        log.AppendLine();
        if (failures.Count == 0)
            log.AppendLine("RESULT: PASS — all checks green.");
        else
            log.AppendLine($"RESULT: FAIL — {failures.Count} check(s) failed.");

        return (failures.Count == 0, log.ToString());
    }

    private static string Hex(Color c) => $"#{c.A:X2}{c.R:X2}{c.G:X2}{c.B:X2}";

    private static double MeasureWidth(string text, FontFamily family)
    {
        var tb = new Microsoft.UI.Xaml.Controls.TextBlock
        {
            Text = text,
            FontFamily = family,
            FontSize = 48,
        };
        tb.Measure(new Windows.Foundation.Size(double.PositiveInfinity, double.PositiveInfinity));
        return tb.DesiredSize.Width;
    }
}
