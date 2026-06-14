using Windows.UI;

namespace PlinkDesignSystem;

/// <summary>
/// Plink Labs colour tokens in code — a 1:1 mirror of tokens/colors.css (and
/// of the brush resources in Themes/Colors.xaml). For XAML, prefer the
/// <c>Plink…Brush</c> resources; these are for code that builds brushes or
/// colours directly. ink + paper do ~90% of the work; magenta is a SPARK, kept
/// under ~5% of the pixels.
/// </summary>
public static class PlinkColors
{
    private static Color Rgb(byte r, byte g, byte b) => Color.FromArgb(0xFF, r, g, b);
    private static Color Argb(byte a, byte r, byte g, byte b) => Color.FromArgb(a, r, g, b);

    /// <summary>near-black, warm.</summary>
    public static readonly Color Ink = Rgb(0x1B, 0x1B, 0x23);

    /// <summary>warm calm paper.</summary>
    public static readonly Color Paper = Rgb(0xFA, 0xF7, 0xF2);
    public static readonly Color Paper2 = Rgb(0xF3, 0xEF, 0xE7);
    public static readonly Color Paper3 = Rgb(0xEC, 0xE7, 0xDC);

    public static readonly Color Ink80 = Rgb(0x3A, 0x3A, 0x42);

    /// <summary>body-muted text on paper.</summary>
    public static readonly Color Ink60 = Rgb(0x6E, 0x6A, 0x62);

    /// <summary>captions, labels, disabled.</summary>
    public static readonly Color Muted = Rgb(0x9A, 0x95, 0x8B);

    /// <summary>1px instrument rules — rgba(27,27,35,0.14).</summary>
    public static readonly Color Hairline = Argb(0x24, 0x1B, 0x1B, 0x23);
    public static readonly Color HairlineStrong = Argb(0x42, 0x1B, 0x1B, 0x23);

    /// <summary>the spark, on light.</summary>
    public static readonly Color Magenta = Rgb(0xDB, 0x27, 0x77);

    /// <summary>pressed / hover-darken.</summary>
    public static readonly Color MagentaPress = Rgb(0xC0, 0x1F, 0x68);

    /// <summary>the spark, on the full-bleed ink section.</summary>
    public static readonly Color MagentaOnDark = Rgb(0xEC, 0x48, 0x99);

    /// <summary>paper-coloured text on ink.</summary>
    public static readonly Color OnInk = Rgb(0xFA, 0xF7, 0xF2);
    public static readonly Color OnInkMuted = Rgb(0x8E, 0x8A, 0x82);

    /// <summary>rgba(250,247,242,0.16).</summary>
    public static readonly Color HairlineOnInk = Argb(0x29, 0xFA, 0xF7, 0xF2);
}

/// <summary>
/// Spacing, radius and motion scale — a mirror of tokens/spacing.css. 8px base.
/// ONE radius language: crisp ~6px. Hairlines, not shadows.
/// </summary>
public static class PlinkSpacing
{
    public const double S0 = 0;
    public const double S1 = 4;
    public const double S2 = 8;
    public const double S3 = 12;
    public const double S4 = 16;
    public const double S5 = 24;
    public const double S6 = 32;
    public const double S7 = 48;
    public const double S8 = 64;
    public const double S9 = 84;
    public const double S10 = 112;

    /// <summary>8px — vertical rhythm unit.</summary>
    public const double Baseline = 8;

    public const double Container = 1120;
    public const double Gutter = 40;
}

/// <summary>Radius tokens — ONE language: crisp. There are no pills.</summary>
public static class PlinkRadius
{
    public const double Small = 4;

    /// <summary>default — buttons, inputs, cards.</summary>
    public const double Base = 6;

    /// <summary>large surfaces only.</summary>
    public const double Large = 8;
}

/// <summary>1px hairline border width. The system uses borders, never shadows.</summary>
public static class PlinkBorders
{
    public const double Width = 1;
}

/// <summary>
/// Type tokens — a mirror of tokens/typography.css. The font-family strings are
/// the same ms-appx URIs the XAML uses; sizes are in DIPs (≈ CSS px).
/// </summary>
public static class PlinkType
{
    public const string DisplayFontFamily = "ms-appx:///PlinkDesignSystem/fonts/fraunces/Fraunces-Variable.ttf#Fraunces";
    public const string BodyFontFamily = "ms-appx:///PlinkDesignSystem/fonts/hanken-grotesk/HankenGrotesk-Variable.ttf#Hanken Grotesk";
    public const string MonoFontFamily = "ms-appx:///PlinkDesignSystem/fonts/space-mono/SpaceMono-Regular.ttf#Space Mono";

    // Fraunces display weight — matches the live brand (plinklabs.org @ 300).
    public const ushort DisplayWeight = 300;
    public const ushort BodyWeight = 400;
    public const ushort BodyWeightMedium = 500;
    public const ushort BodyWeightStrong = 600;

    public const double Display1 = 86.4;
    public const double Display2 = 54.4;
    public const double Display3 = 38.4;

    public const double TextXl = 19;
    public const double TextLg = 17;
    public const double TextBase = 16;
    public const double TextSm = 14;

    public const double Label = 12;
    public const double LabelSm = 11;

    /// <summary>0.14em uppercase eyebrow tracking, as XAML CharacterSpacing (em × 1000).</summary>
    public const int LabelTracking = 140;

    /// <summary>0.04em sentence-case mono tracking.</summary>
    public const int LabelTrackingTight = 40;

    /// <summary>-0.018em display tracking.</summary>
    public const int DisplayTracking = -18;
}
