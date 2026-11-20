# Troubleshooting

## Quick checks

| Symptom | What to check |
|---|---|
| Changes made in Studio do not appear in RUN | RUN runs the Project **as saved**. Click **Save**, then **Run**. Design changes need **Save** in Design Studio. |
| A button does nothing | Is the right app in front, and is the shortcut correct for that app? Is Accessibility allowed (below)? Read the Command Summary in Studio. |
| A Part shows **Missing Command** | The Command was deleted or its Pack is not installed. Bind another Command, or import / reinstall the Pack. |
| A Part shows **Missing Plugin Command** | The Plugin is not installed or is disabled (Plugin Studio), or the feature was removed in an update. |
| Dial Select does nothing | It needs at least 2 Commands. |
| A Page Command does nothing | Its Target must be a Part with Pages in the current Layer, and the Page must exist. |
| A Multi Action stops midway | A step failed or its Command is missing. Add Waits where an app needs time (for example after opening an app). |
| Cannot edit a Command | It is in a Built-in, Imported or Plugin Pack. Use **Duplicate to User Pack**. |
| A Show / Hide shortcut is marked "— unavailable" | Another app uses it. Choose another preset or record your own. |
| RUN disappeared | It collapsed (Auto Hide). Tap the small collapsed icon, or press the Show / Hide shortcut (default ⌘⌥⇧C). If it is off screen, use **Bring Overlay On Screen** (InterLayer menu or Dock menu). |
| "No Project open" | Open one with **InterLayer ▸ Open Project…**. |
| "The last Project could not be opened." | The folder was moved, deleted, or is not a Project. Use **Open Another Project…**, or **Copy Error Details** when asking for help. |

## macOS permissions

### Keys, clicks or media keys do nothing

RUN shows: *"…" did not run. InterLayer is not allowed to send keys. Allow it in System Settings > Privacy & Security > Accessibility.*

1. Open **System Settings ▸ Privacy & Security ▸ Accessibility**.
2. Turn on **InterLayer**.
3. Run a key Command again. No restart is needed. (If you only use mouse Commands, run one key Command or restart InterLayer once.)

If InterLayer is already turned on but it still does not work — typically after replacing the app with another build — remove InterLayer from the list with **−**, then add `/Applications/InterLayer.app` again with **+**.

### The Accessibility prompt did not appear

InterLayer collapses RUN when macOS shows the prompt, so it is not hidden behind the overlay. If you dismissed it, add InterLayer manually as above.

### Apple Music features do not work

*InterLayer is not allowed to control Music.* → **System Settings ▸ Privacy & Security ▸ Automation ▸ InterLayer**, turn on **Music**. Other messages: *Music is not running.* (open Music) and *Music did not answer in time.* (try again).

### "The InterLayer input helper is not available"

InterLayer could not start its helper for sending keys and clicks. Quit and start InterLayer again. If it persists, reinstall the app from the official `.dmg`.

### "This character cannot be typed with the current keyboard layout together with modifier keys."

The key in the shortcut does not exist as a separate key in your current keyboard layout. Use another key, or change the input source.

## Touch and Sidecar

InterLayer accepts touches from an iPad used as a **Sidecar** display, and mouse or trackpad input on any display.

- Connect the iPad with Sidecar (see Apple's Sidecar instructions for your macOS version), then move the RUN window onto the iPad screen. No setting in InterLayer is needed.
- Right-click / Control-click opens the RUN Menu.
- Mouse Commands are for touch input; they are not supported when you operate the overlay with the mouse pointer itself.
- After moving RUN with a window-management tool, input may be offset for a fraction of a second.

### Touches stop working or a touch seems stuck

Use **RUN Menu ▸ Input Troubleshooting** (also in RUN Settings ▸ General ▸ Troubleshooting):

| Item | What it does |
|---|---|
| **Reset Input** | Releases stuck touches, keys and window drags. Your Profiles and Bindings are not changed. |
| **Restart Screen Input** | Does a Reset, then restarts the touch / mouse input helper for the overlay. If it fails, quit and start InterLayer again. |
| **Input Diagnostics** | Saves a report of the input state to `~/Library/Application Support/InterLayer/logs/` (with **Show in Finder**). Attach it when you report an input problem. |

## Plugins

| Symptom | What to check |
|---|---|
| A Plugin Command shows *"…" did not run. It could not be run.* | Open Plugin Studio and select the Plugin: is it **Enabled**? Is its Adapter **approved**? Are its settings filled in? Is the target app running? |
| A Plugin stopped working after an update | Updating (re-importing) clears the approval. Approve it again with **Review & Approve…**. |
| *"…" did not run. Its Plugin does not have the permission it needs.* | The feature uses a built-in permission that is not declared or not approved. Open the Plugin in Plugin Studio and check **Built-in Permissions**. |
| A Data Display does not update | The app may not be running or not reachable; the last value stays on screen. Check **Test Connection** in Plugin Studio. Displays do not update while RUN is collapsed. |
| Import refuses a Plugin | Read the reason in the preview. Common causes: files or folders not allowed in a Plugin, hidden files, `plugin.json` not at the root of the ZIP, or a Plugin id that belongs to a built-in Plugin. See [Package structure](developer-guide/package-structure.md). |
| A Plugin's icons show a placeholder | An Icon Pack the Plugin uses is not installed. Plugin Studio lists the missing Packs. |
| An imported Profile shows missing Commands | The Import Summary listed *Plugins required*. Install those Plugins. |
| Running Apps / Launch App brings the app forward, but its minimized window stays in the Dock | After 0.1.0-beta.1, InterLayer brings back one window only when **all** of that app's windows are minimized, and only with Accessibility permission (System Settings ▸ Privacy & Security ▸ Accessibility). In 0.1.0-beta.1 it never does; click the window in the Dock. |
| A Plugin's saved data is gone after removing and reinstalling it | Removing a Plugin moves its Plugin Storage to `plugins/.trash/`. An update (Replace) keeps it. |

## Updates

- **InterLayer ▸ Check for Updates…** says *InterLayer could not check for updates.* → check your internet connection and try again later.
- Updates are not installed automatically: download the new `.dmg` and replace the app in Applications. Your data is kept.

## Starting over

See [Data locations ▸ Starting fresh](user-guide/data-locations.md#starting-fresh). To reset InterLayer's macOS permissions, run in Terminal:

```bash
tccutil reset All com.interlayer.app
```

Then start InterLayer and allow the permissions again.

## Reporting a problem

Open an issue in the [InterLayer documentation repository](https://github.com/operon-design-lab/interlayer-docs/issues). Include your macOS version, the InterLayer version (**InterLayer ▸ About InterLayer**), the steps to reproduce, and — for input problems — an Input Diagnostics report.
