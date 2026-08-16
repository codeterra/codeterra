using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace POEHelper.CaptureHelper;

internal static class Program
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    private static readonly object ConfigLock = new();
    private static ScannerConfig CurrentConfig = new();
    private static CancellationTokenSource? ScannerCts;
    private static Task? ScannerTask;

    public static async Task Main()
    {
        Console.InputEncoding = System.Text.Encoding.UTF8;
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        Write(new { type = "log", message = "capture-helper-ready" });

        string? line;
        while ((line = await Console.In.ReadLineAsync()) != null)
        {
            if (string.IsNullOrWhiteSpace(line))
            {
                continue;
            }

            try
            {
                using var document = JsonDocument.Parse(line);
                var root = document.RootElement;
                var type = root.GetProperty("type").GetString();
                switch (type)
                {
                    case "configure":
                        Configure(root);
                        break;
                    case "captureTemplate":
                        CaptureTemplate(root);
                        break;
                    case "exit":
                        StopScanner();
                        return;
                    default:
                        Write(new { type = "log", message = $"unknown-command:{type}" });
                        break;
                }
            }
            catch (Exception error)
            {
                Write(new { type = "error", message = error.Message });
            }
        }

        StopScanner();
    }

    private static void Configure(JsonElement root)
    {
        var enabled = root.TryGetProperty("enabled", out var enabledElement) && enabledElement.GetBoolean();
        var next = new ScannerConfig
        {
            Enabled = enabled,
            ConfigId = root.TryGetProperty("configId", out var configId) ? configId.GetInt32() : 0,
            ScanRegion = root.TryGetProperty("scanRegion", out var scanRegion)
                ? ReadRect(scanRegion)
                : new CaptureRect(),
            Threshold = root.TryGetProperty("threshold", out var threshold)
                ? Math.Clamp(threshold.GetDouble(), 0.5, 0.99)
                : 0.88,
            IntervalMs = root.TryGetProperty("intervalMs", out var intervalMs)
                ? Math.Clamp(intervalMs.GetInt32(), 1000, 5000)
                : 1500,
            Templates = root.TryGetProperty("templates", out var templates) && templates.ValueKind == JsonValueKind.Array
                ? templates.EnumerateArray().Select(ReadTemplate).Where(template => template != null).Cast<Template>().ToList()
                : new List<Template>()
        };

        lock (ConfigLock)
        {
            CurrentConfig = next;
        }

        StopScanner();
        if (next.Enabled && next.Templates.Count > 0)
        {
            ScannerCts = new CancellationTokenSource();
            ScannerTask = Task.Run(() => ScannerLoop(ScannerCts.Token));
            Write(new { type = "log", message = $"scanner-started:{next.Templates.Count}" });
        }
        else
        {
            Write(new { type = "missing", configId = next.ConfigId });
        }
    }

    private static void CaptureTemplate(JsonElement root)
    {
        var requestId = root.TryGetProperty("requestId", out var requestIdElement)
            ? requestIdElement.GetString()
            : null;
        try
        {
            var name = root.TryGetProperty("name", out var nameElement)
                ? nameElement.GetString()
                : "Buff template";
            var region = root.TryGetProperty("region", out var regionElement)
                ? ReadRect(regionElement)
                : new CaptureRect();
            CaptureRect? matchRegion = root.TryGetProperty("matchRegion", out var matchRegionElement)
                ? ReadRect(matchRegionElement)
                : null;
            using var bitmap = CaptureRegion(region);
            var normalizedMatchRegion = ClampRect(matchRegion ?? DefaultMatchRegion(bitmap.Width, bitmap.Height), bitmap.Width, bitmap.Height);
            Write(new
            {
                type = "templateCaptured",
                requestId,
                template = new
                {
                    id = $"buff-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}-{Guid.NewGuid():N}".Substring(0, 24),
                    name = string.IsNullOrWhiteSpace(name) ? "Buff template" : name.Trim(),
                    dataUrl = ToPngDataUrl(bitmap),
                    width = bitmap.Width,
                    height = bitmap.Height,
                    matchRegion = normalizedMatchRegion,
                    capturedAt = DateTimeOffset.UtcNow.ToString("O")
                }
            });
        }
        catch (Exception error)
        {
            Write(new { type = "error", requestId, message = error.Message });
        }
    }

    private static async Task ScannerLoop(CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            ScannerConfig config;
            lock (ConfigLock)
            {
                config = CurrentConfig.Snapshot();
            }

            try
            {
                using var scan = CaptureRegion(config.ScanRegion);
                using var normalizedScan = EnsureFormat(scan);
                var scanPixels = BitmapPixels.FromBitmap(normalizedScan);
                var results = FindTemplateResults(scanPixels, config);
                var matches = results
                    .Where(result => result.Score >= config.EffectiveThreshold)
                    .OrderBy(result => result.Template.Id)
                    .ToList();
                var candidates = results
                    .OrderByDescending(result => result.Score)
                    .Take(5)
                    .Select(result => new
                    {
                        templateId = result.Template.Id,
                        score = result.Score
                    })
                    .ToList();

                if (matches.Count == 0)
                {
                    Write(new { type = "missing", configId = config.ConfigId, candidates });
                }
                else
                {
                    Write(new
                    {
                        type = "state",
                        configId = config.ConfigId,
                        candidates,
                        matches = matches.Select(match => CreateMatchPayload(config, match)).ToList()
                    });
                }
            }
            catch (Exception error)
            {
                Write(new { type = "error", message = error.Message });
            }

            try
            {
                await Task.Delay(config.IntervalMs, token);
            }
            catch (TaskCanceledException)
            {
                return;
            }
        }
    }

    private static object CreateMatchPayload(ScannerConfig config, MatchResult match)
    {
        var x = Math.Max(0, config.ScanRegion.X + match.X - match.Template.MatchRegion.X);
        var y = Math.Max(0, config.ScanRegion.Y + match.Y - match.Template.MatchRegion.Y);
        string? dataUrl = null;

        try
        {
            using var live = CaptureRegion(new CaptureRect(x, y, match.Template.Width, match.Template.Height));
            dataUrl = ToPngDataUrl(live);
        }
        catch
        {
            dataUrl = null;
        }

        return new
        {
            templateId = match.Template.Id,
            score = match.Score,
            x,
            y,
            width = match.Template.Width,
            height = match.Template.Height,
            dataUrl
        };
    }

    private static List<MatchResult> FindTemplateResults(BitmapPixels scan, ScannerConfig config)
    {
        var results = new List<MatchResult>();
        foreach (var template in config.Templates)
        {
            if (template.Pixels.Width > scan.Width || template.Pixels.Height > scan.Height)
            {
                continue;
            }

            var match = FindTemplateMatch(scan, template);
            if (match == null)
            {
                continue;
            }

            results.Add(match);
        }

        return results;
    }

    private static MatchResult? FindTemplateMatch(BitmapPixels scan, Template template)
    {
        var templatePixels = template.Pixels;
        var minSide = Math.Min(templatePixels.Width, templatePixels.Height);
        var searchStep = Math.Max(2, minSide / 12);
        var sampleStep = Math.Max(2, minSide / 12);
        MatchResult? best = null;

        for (var y = 0; y <= scan.Height - templatePixels.Height; y += searchStep)
        {
            for (var x = 0; x <= scan.Width - templatePixels.Width; x += searchStep)
            {
                var score = ScoreAt(scan, templatePixels, x, y, sampleStep);
                if (best == null || score > best.Score)
                {
                    best = new MatchResult(template, x, y, score);
                }
            }
        }

        return best;
    }

    private static double ScoreAt(BitmapPixels scan, BitmapPixels template, int x, int y, int sampleStep)
    {
        long total = 0;
        long samples = 0;

        for (var ty = 0; ty < template.Height; ty += sampleStep)
        {
            for (var tx = 0; tx < template.Width; tx += sampleStep)
            {
                var scanOffset = ((y + ty) * scan.Stride) + ((x + tx) * 4);
                var templateOffset = (ty * template.Stride) + (tx * 4);
                total += Math.Abs(scan.Bytes[scanOffset] - template.Bytes[templateOffset]);
                total += Math.Abs(scan.Bytes[scanOffset + 1] - template.Bytes[templateOffset + 1]);
                total += Math.Abs(scan.Bytes[scanOffset + 2] - template.Bytes[templateOffset + 2]);
                samples += 3;
            }
        }

        return 1.0 - (total / Math.Max(1.0, samples * 255.0));
    }

    private static Template? ReadTemplate(JsonElement element)
    {
        try
        {
            var id = element.GetProperty("id").GetString();
            var dataUrl = element.GetProperty("dataUrl").GetString();
            if (string.IsNullOrWhiteSpace(id) || string.IsNullOrWhiteSpace(dataUrl))
            {
                return null;
            }

            using var image = BitmapFromDataUrl(dataUrl);
            using var normalized = EnsureFormat(image);
            var matchRegion = element.TryGetProperty("matchRegion", out var matchRegionElement)
                ? ClampRect(ReadRect(matchRegionElement), normalized.Width, normalized.Height)
                : DefaultMatchRegion(normalized.Width, normalized.Height);
            using var matchBitmap = normalized.Clone(
                new Rectangle(matchRegion.X, matchRegion.Y, matchRegion.Width, matchRegion.Height),
                PixelFormat.Format32bppArgb);
            return new Template(
                id,
                element.TryGetProperty("name", out var name) ? name.GetString() ?? "Buff template" : "Buff template",
                normalized.Width,
                normalized.Height,
                matchRegion,
                BitmapPixels.FromBitmap(matchBitmap));
        }
        catch
        {
            return null;
        }
    }

    private static CaptureRect ReadRect(JsonElement element)
    {
        var x = element.TryGetProperty("x", out var xElement) ? xElement.GetInt32() : 0;
        var y = element.TryGetProperty("y", out var yElement) ? yElement.GetInt32() : 0;
        var width = element.TryGetProperty("width", out var widthElement) ? widthElement.GetInt32() : 1;
        var height = element.TryGetProperty("height", out var heightElement) ? heightElement.GetInt32() : 1;
        return new CaptureRect(
            Math.Max(0, x),
            Math.Max(0, y),
            Math.Clamp(width, 1, 2048),
            Math.Clamp(height, 1, 1024));
    }

    private static CaptureRect DefaultMatchRegion(int width, int height)
    {
        return ClampRect(new CaptureRect(
            Math.Max(0, (int)Math.Round(width * 0.2)),
            Math.Max(0, (int)Math.Round(height * 0.2)),
            Math.Max(4, (int)Math.Round(width * 0.6)),
            Math.Max(4, (int)Math.Round(height * 0.6))), width, height);
    }

    private static CaptureRect ClampRect(CaptureRect rect, int width, int height)
    {
        var x = Math.Clamp(rect.X, 0, Math.Max(0, width - 1));
        var y = Math.Clamp(rect.Y, 0, Math.Max(0, height - 1));
        return new CaptureRect(
            x,
            y,
            Math.Max(1, Math.Min(rect.Width, width - x)),
            Math.Max(1, Math.Min(rect.Height, height - y)));
    }

    private static Bitmap CaptureRegion(CaptureRect region)
    {
        var bitmap = new Bitmap(region.Width, region.Height, PixelFormat.Format32bppArgb);
        using var graphics = Graphics.FromImage(bitmap);
        graphics.CopyFromScreen(region.X, region.Y, 0, 0, new Size(region.Width, region.Height), CopyPixelOperation.SourceCopy);
        return bitmap;
    }

    private static Bitmap EnsureFormat(Bitmap source)
    {
        if (source.PixelFormat == PixelFormat.Format32bppArgb)
        {
            return new Bitmap(source);
        }

        var bitmap = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb);
        using var graphics = Graphics.FromImage(bitmap);
        graphics.CompositingMode = CompositingMode.SourceCopy;
        graphics.DrawImage(source, 0, 0, source.Width, source.Height);
        return bitmap;
    }

    private static Bitmap BitmapFromDataUrl(string dataUrl)
    {
        var comma = dataUrl.IndexOf(',');
        var base64 = comma >= 0 ? dataUrl[(comma + 1)..] : dataUrl;
        var bytes = Convert.FromBase64String(base64);
        using var stream = new MemoryStream(bytes);
        using var image = Image.FromStream(stream);
        return new Bitmap(image);
    }

    private static string ToPngDataUrl(Bitmap bitmap)
    {
        using var stream = new MemoryStream();
        bitmap.Save(stream, ImageFormat.Png);
        return $"data:image/png;base64,{Convert.ToBase64String(stream.ToArray())}";
    }

    private static void StopScanner()
    {
        try
        {
            ScannerCts?.Cancel();
            ScannerTask?.Wait(500);
        }
        catch
        {
            // Best effort shutdown.
        }
        finally
        {
            ScannerCts?.Dispose();
            ScannerCts = null;
            ScannerTask = null;
        }
    }

    private static void Write(object payload)
    {
        Console.WriteLine(JsonSerializer.Serialize(payload, JsonOptions));
        Console.Out.Flush();
    }
}

internal sealed record ScannerConfig
{
    public bool Enabled { get; init; }
    public int ConfigId { get; init; }
    public CaptureRect ScanRegion { get; init; } = new();
    public double Threshold { get; init; } = 0.88;
    public double EffectiveThreshold => Math.Min(Threshold, 0.80);
    public int IntervalMs { get; init; } = 1500;
    public List<Template> Templates { get; init; } = new();

    public ScannerConfig Snapshot() => this with { Templates = new List<Template>(Templates) };
}

internal sealed record CaptureRect(int X = 0, int Y = 0, int Width = 1, int Height = 1);

internal sealed record Template(string Id, string Name, int Width, int Height, CaptureRect MatchRegion, BitmapPixels Pixels);

internal sealed record MatchResult(Template Template, int X, int Y, double Score);

internal sealed record BitmapPixels(byte[] Bytes, int Width, int Height, int Stride)
{
    public static BitmapPixels FromBitmap(Bitmap bitmap)
    {
        var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
        var data = bitmap.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        try
        {
            var length = Math.Abs(data.Stride) * data.Height;
            var bytes = new byte[length];
            Marshal.Copy(data.Scan0, bytes, 0, length);
            return new BitmapPixels(bytes, bitmap.Width, bitmap.Height, Math.Abs(data.Stride));
        }
        finally
        {
            bitmap.UnlockBits(data);
        }
    }
}
