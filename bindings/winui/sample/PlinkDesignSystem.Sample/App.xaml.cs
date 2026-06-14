using System;
using System.Linq;
using Microsoft.UI.Xaml;

namespace PlinkDesignSystem.Sample;

/// <summary>
/// The verify app. Launched normally it shows the gallery window; launched with
/// <c>--smoke</c> it builds the same window, runs <see cref="SmokeCheck"/>
/// against the real WinUI runtime (resources resolve, fonts ship, styles apply
/// without throwing), writes a report, and exits 0 / 1 — the automatable gate.
/// </summary>
public partial class App : Application
{
    private Window? _window;

    public App() => InitializeComponent();

    protected override void OnLaunched(LaunchActivatedEventArgs args)
    {
        UnhandledException += (_, e) =>
        {
            CrashLog("UnhandledException: " + e.Message + "\n" + e.Exception);
        };

        var smoke = Environment.GetCommandLineArgs()
            .Any(a => string.Equals(a, "--smoke", StringComparison.OrdinalIgnoreCase));

        try
        {
            _window = new MainWindow();
        }
        catch (Exception ex)
        {
            CrashLog("MainWindow construction threw:\n" + ex);
            Environment.Exit(3);
            return;
        }

        if (smoke)
        {
            if (_window.Content is FrameworkElement root)
            {
                root.Loaded += (_, _) => RunSmokeAndExit();
            }
        }

        _window.Activate();
    }

    private static void CrashLog(string text)
    {
        Console.WriteLine(text);
        try
        {
            System.IO.File.WriteAllText(
                System.IO.Path.Combine(AppContext.BaseDirectory, "smoke-result.txt"), text);
        }
        catch
        {
            // best-effort
        }
    }

    private void RunSmokeAndExit()
    {
        int code;
        try
        {
            var (ok, report) = SmokeCheck.Run();
            Console.WriteLine(report);
            try
            {
                System.IO.File.WriteAllText(
                    System.IO.Path.Combine(AppContext.BaseDirectory, "smoke-result.txt"),
                    report);
            }
            catch
            {
                // best-effort; the console output is the source of truth.
            }

            code = ok ? 0 : 1;
        }
        catch (Exception ex)
        {
            Console.WriteLine("SMOKE FAILED (exception): " + ex);
            code = 2;
        }

        Environment.Exit(code);
    }
}
