using Microsoft.UI;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Media.Animation;
using Microsoft.UI.Xaml.Shapes;
using Windows.Foundation;
using Windows.UI;
using Windows.UI.ViewManagement;

namespace PlinkDesignSystem.Controls;

/// <summary>How a <see cref="Ping"/> behaves.</summary>
public enum PingMode
{
    /// <summary>The signature concentric pulse — two rings radiate forever.</summary>
    Pulse,

    /// <summary>A quiet, still magenta ring — a bullet / accent.</summary>
    Static,
}

/// <summary>
/// The signature concentric-ring pulse — loading, success, bullets, accents.
///
/// Mirrors the web <c>Ping</c> component (and the Flutter <c>Ping</c> widget):
/// two rings radiate on the ping easing (offset by half a cycle) around a
/// solid magenta core. In <see cref="PingMode.Static"/> the ring is quiet and
/// still. Respects the platform "animations" / reduced-motion setting — when
/// animations are off, the pulse settles to a single quiet ring.
///
/// Colours are set in code (not via resource lookup) so the control renders
/// correctly even when an app forgets to merge the design-system dictionary.
/// </summary>
[TemplatePart(Name = PartRing1, Type = typeof(Ellipse))]
[TemplatePart(Name = PartRing2, Type = typeof(Ellipse))]
[TemplatePart(Name = PartCore, Type = typeof(Ellipse))]
public sealed class Ping : Control
{
    private const string PartRing1 = "PART_Ring1";
    private const string PartRing2 = "PART_Ring2";
    private const string PartRing1Scale = "PART_Ring1Scale";
    private const string PartRing2Scale = "PART_Ring2Scale";
    private const string PartCore = "PART_Core";

    // tokens/colors.css — the spark.
    private static readonly Color Magenta = Color.FromArgb(0xFF, 0xDB, 0x27, 0x77);
    private static readonly Color MagentaOnDark = Color.FromArgb(0xFF, 0xEC, 0x48, 0x99);

    // tokens/spacing.css — --dur-ping 1900ms, --ease-ping cubic-bezier(.16,1,.3,1).
    private static readonly Duration PingDuration = new(TimeSpan.FromMilliseconds(1900));

    // A KeySpline is a DependencyObject and cannot be shared across keyframes,
    // so build a fresh one (cubic-bezier(.16,1,.3,1)) for each use.
    private static KeySpline NewEasePing() => new()
    {
        ControlPoint1 = new Point(0.16, 1),
        ControlPoint2 = new Point(0.3, 1),
    };

    private Ellipse? _ring1;
    private Ellipse? _ring2;
    private Ellipse? _core;
    private ScaleTransform? _ring1Scale;
    private ScaleTransform? _ring2Scale;
    private Storyboard? _storyboard;

    public Ping()
    {
        DefaultStyleKey = typeof(Ping);
        Loaded += (_, _) => Apply();
        Unloaded += (_, _) => _storyboard?.Stop();
    }

    /// <summary>Overall diameter in DIPs. Default 28.</summary>
    public double Diameter
    {
        get => (double)GetValue(DiameterProperty);
        set => SetValue(DiameterProperty, value);
    }

    public static readonly DependencyProperty DiameterProperty = DependencyProperty.Register(
        nameof(Diameter), typeof(double), typeof(Ping),
        new PropertyMetadata(28.0, OnVisualPropertyChanged));

    /// <summary>Pulse (default) or a quiet static ring.</summary>
    public PingMode Mode
    {
        get => (PingMode)GetValue(ModeProperty);
        set => SetValue(ModeProperty, value);
    }

    public static readonly DependencyProperty ModeProperty = DependencyProperty.Register(
        nameof(Mode), typeof(PingMode), typeof(Ping),
        new PropertyMetadata(PingMode.Pulse, OnVisualPropertyChanged));

    /// <summary>Recolour for the full-bleed ink section.</summary>
    public bool OnInk
    {
        get => (bool)GetValue(OnInkProperty);
        set => SetValue(OnInkProperty, value);
    }

    public static readonly DependencyProperty OnInkProperty = DependencyProperty.Register(
        nameof(OnInk), typeof(bool), typeof(Ping),
        new PropertyMetadata(false, OnVisualPropertyChanged));

    private static void OnVisualPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        => ((Ping)d).Apply();

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();
        _ring1 = GetTemplateChild(PartRing1) as Ellipse;
        _ring2 = GetTemplateChild(PartRing2) as Ellipse;
        _core = GetTemplateChild(PartCore) as Ellipse;
        _ring1Scale = GetTemplateChild(PartRing1Scale) as ScaleTransform;
        _ring2Scale = GetTemplateChild(PartRing2Scale) as ScaleTransform;
        Apply();
    }

    private static bool AnimationsEnabled
    {
        get
        {
            try { return new UISettings().AnimationsEnabled; }
            catch { return true; }
        }
    }

    private void Apply()
    {
        if (_ring1 is null || _ring2 is null || _core is null)
        {
            return;
        }

        Width = Diameter;
        Height = Diameter;

        var color = OnInk ? MagentaOnDark : Magenta;
        var brush = new SolidColorBrush(color);

        foreach (var ring in new[] { _ring1, _ring2 })
        {
            ring.Stroke = brush;
            ring.Fill = new SolidColorBrush(Colors.Transparent);
            ring.StrokeThickness = 2;
        }

        _core.Fill = brush;
        var core = Math.Max(4, Diameter * 0.26);
        _core.Width = core;
        _core.Height = core;

        _storyboard?.Stop();

        var animate = Mode == PingMode.Pulse && AnimationsEnabled;
        if (animate && _ring1Scale is not null && _ring2Scale is not null)
        {
            _ring1.Opacity = 0;
            _ring2.Opacity = 0;
            _storyboard = new Storyboard();
            // The two rings radiate offset by half the 1900ms cycle.
            AddPulse(_storyboard, _ring1, _ring1Scale, TimeSpan.Zero);
            AddPulse(_storyboard, _ring2, _ring2Scale, TimeSpan.FromMilliseconds(950));
            _storyboard.Begin();
        }
        else
        {
            // Quiet static ring at 72% scale, 0.45 opacity (matches the web).
            _ring2.Opacity = 0;
            _ring1.Opacity = 0.45;
            if (_ring1Scale is not null)
            {
                _ring1Scale.ScaleX = 0.72;
                _ring1Scale.ScaleY = 0.72;
            }
        }
    }

    // One ring: scale 0.3 -> 1.0 while fading 0.55 -> 0, on the ping easing,
    // looping forever, started after <paramref name="begin"/> of the cycle.
    // Adds its three animations straight into <paramref name="sb"/> — a Timeline
    // can only belong to one storyboard.
    private static void AddPulse(Storyboard sb, Ellipse ring, ScaleTransform scale, TimeSpan begin)
    {
        var scaleX = ScaleAnimation(0.3, 1.0, begin);
        Storyboard.SetTarget(scaleX, scale);
        Storyboard.SetTargetProperty(scaleX, "ScaleX");

        var scaleY = ScaleAnimation(0.3, 1.0, begin);
        Storyboard.SetTarget(scaleY, scale);
        Storyboard.SetTargetProperty(scaleY, "ScaleY");

        var opacity = ScaleAnimation(0.55, 0.0, begin);
        Storyboard.SetTarget(opacity, ring);
        Storyboard.SetTargetProperty(opacity, "Opacity");

        sb.Children.Add(scaleX);
        sb.Children.Add(scaleY);
        sb.Children.Add(opacity);
    }

    private static DoubleAnimationUsingKeyFrames ScaleAnimation(double from, double to, TimeSpan begin)
    {
        var anim = new DoubleAnimationUsingKeyFrames
        {
            BeginTime = begin,
            RepeatBehavior = RepeatBehavior.Forever,
            Duration = PingDuration,
        };
        anim.KeyFrames.Add(new DiscreteDoubleKeyFrame
        {
            KeyTime = KeyTime.FromTimeSpan(TimeSpan.Zero),
            Value = from,
        });
        anim.KeyFrames.Add(new SplineDoubleKeyFrame
        {
            KeyTime = KeyTime.FromTimeSpan(PingDuration.TimeSpan),
            Value = to,
            KeySpline = NewEasePing(),
        });
        return anim;
    }
}
