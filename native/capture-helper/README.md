# POEHelper Capture Helper

Small native Windows helper used by Buff Mirror.

Electron owns settings, calibration UI, and the overlay. This helper only captures the selected screen region, compares it against captured buff templates, and emits JSON-line events back to Electron.

Build:

```powershell
npm run build:capture-helper
```

Requires the .NET 8 SDK or newer. The .NET runtime alone is not enough because `dotnet publish` is an SDK command.

The build output is expected at:

```text
native/capture-helper/publish/win-x64/POEHelper.CaptureHelper.exe
```

Release builds include that folder as an Electron extra resource.
