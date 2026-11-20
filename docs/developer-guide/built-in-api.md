# Built-in Sources and Actions

InterLayer has its own macOS capabilities (volume, apps, the Music app, audio devices and more). A Plugin can use some of them, from a feature or from a script Adapter, but only through a **permission group** that the Plugin declares in [`permissions.builtin`](manifest.md#permissionsbuiltin) and the user approves.

> **Availability.** The groups `system_volume.*`, `running_apps.read`, `app.activate` and `music.*` are in 0.1.0-beta.1, for features only. Everything marked **new** on this page is **new after 0.1.0-beta.1 and not in that build**: the other groups, script access through `api.builtin`, and the minimized-window restore of `app.activate` / `app.launch`.

## Using them

**From a feature:** name the built-in id as the feature's `source.source_identifier` or `action.action_identifier`, as you would an id of your own Adapter.

```json
"source": { "data_type": "value", "source_identifier": "macos.output_volume" },
"action": { "action_identifier": "volume.set", "parameters": { "value": "{{value}}" } }
```

**From a script Adapter (new):** use `api.builtin`. See [Script Adapter ▸ Built-in calls](script-adapter.md#built-in-calls-apibuiltin).

```js
const { volume, muted } = await api.builtin.read("macos.output_volume");          // a read group
await api.builtin.run("app.launch", { bundle_id: "com.apple.Notes" });            // a control group, inside an Action only
```

The same check applies to both paths. The group must be declared and approved, and the id must be in the table below. Any other id is refused, even if you know its name.

## Permission groups

**Read** groups only show information. **Control** groups change something on the Mac when the user uses one of your Parts. A feature that shows a state and also changes it needs both groups.

| Group | Access | Sources / Actions | Data / parameters | |
|---|---|---|---|---|
| `system_volume.read` | read | Source `macos.output_volume` | `{ volume (0–1), muted }` | |
| `system_volume.control` | control | Actions `volume.set`, `volume.toggle_mute` | `volume.set`: `{ value }` (0–100) | |
| `running_apps.read` | read | Source `macos.running_apps` | `{ apps: [{ bundle_id, name, icon_url, is_frontmost, is_hidden }], frontmost_name, frontmost_bundle_id }` | |
| `app.activate` | control | Action `app.activate` | `{ bundle_id }`. See [Activating and opening apps](#activating-and-opening-apps). | |
| `music.read` | read | Source `music.player` | The Music app's player state and current track | Automation |
| `music.control` | control | Actions `music.play_pause`, `music.next_track`, `music.previous_track`, `music.set_position` `{ value }`, `music.toggle_shuffle`, `music.set_repeat` `{ mode }`, `music.set_volume` `{ value }` or `{ delta }` | | Automation |
| `audio_devices.read` | read | Sources `macos.audio_devices`, `macos.input_volume`, `macos.input_mute` | `macos.audio_devices`: `{ devices: [{ id, name, input, output, selected_input, selected_output, … }], current_input, current_output }` | new |
| `input_sources.read` | read | Source `macos.input_sources` | `{ sources: [{ id, name, selected }] }` | new |
| `input_sources.control` | control | Action `input.select` | `{ input_source_id }` | new |
| `displays.read` | read | Source `macos.displays` | `{ displays: [{ id, name, width, height, x, y, scale, main, builtin }], count, summary }` | new |
| `power.read` | read | Source `macos.power` | `{ battery, charging, power_source, low_power, charging_text, low_power_text }` | new |
| `wifi.read` | read | Source `macos.wifi_state` | `{ wifi_available, wifi_on, wifi_text }`. The network name is never included. | new |
| `installed_apps.read` | read | Source `macos.installed_apps` | `{ apps: [{ id, name }] }` (`id` is the bundle id) | new |
| `apps.control` | control | Actions `app.launch`, `app.hide`, `app.unhide` | `{ bundle_id }`. See [Activating and opening apps](#activating-and-opening-apps). | new |
| `apps.quit` | control | Action `app.quit` | `{ bundle_id }`. The app may ask to save; unsaved work can be lost when it does not. | new, a group of its own on purpose |
| `shortcuts.read` | read | Source `macos.shortcuts` | `{ shortcuts: [{ id, name }], count }`: the names of the user's shortcuts | new |

- Declare only the groups you use, and prefer read groups.
- In feature parameters every value arrives as a string, and InterLayer converts it where a number is expected. From a script, pass numbers as numbers.

## macOS permissions

Some built-ins need a macOS permission. macOS gives that permission to **InterLayer as a whole**, not to your Plugin. Once the user allows it, every approved Plugin with the matching group can use it. That is why the permission group is the gate.

| Built-in | macOS permission |
|---|---|
| `music.*` | Automation for the Music app. macOS asks on first use. |
| Restoring a minimized window (`app.activate`, `app.launch`) | Accessibility. Without it, the app is still activated or opened; the window stays minimized. |

Without the macOS permission, the built-in fails with a message: a State error or a failed Command for a feature, `builtin_failed` for a script. Show the message; do not retry in a loop.

## Activating and opening apps

| Action | What it does |
|---|---|
| `app.activate` `{ bundle_id }` | Brings a running app to the front. If the app is not running, nothing happens. |
| `app.launch` `{ bundle_id }` | Opens the app (`open -b`). If it is already running, macOS brings it to the front. |

**Minimized windows (new).** After `app.activate` or `app.launch`, InterLayer looks at the windows of **that app only** (by bundle id, never the app in front):

- If at least one of its windows is not minimized, nothing else happens. No window is moved or resized.
- If **all** of its windows are minimized, InterLayer brings back **one**: the app's main window if it is minimized, otherwise the first in the app's own window order. Only the minimized state changes; position and size stay as they were. This matches a click on the app's Dock icon.
- This needs Accessibility permission. Without it nothing is restored, and the activation itself still succeeds.

The Action's result adds `window`, one of: `restored`, `has_open_window`, `no_windows`, `not_running`, `needs_accessibility`, `failed`, or `unavailable` (the check could not run). A problem here never fails the Action.

`app.hide` and `app.unhide` are requests; read `macos.running_apps` (`is_hidden`) for the outcome.

## Shortcuts

| Capability | Status |
|---|---|
| The names of the user's shortcuts (`shortcuts.read`, Source `macos.shortcuts`) | Available (new). |
| **Running a shortcut** | **Not available to Plugins.** There is no permission group for it. A call to `shortcuts.run` is refused (`builtin_permission_denied`, reason `unlisted`). |

To run a shortcut from a Part today, use a CLI Command (`shortcuts run "<name>"`), which the user approves on its own. See [Commands ▸ CLI](../user-guide/commands.md#cli-advanced).

## Not available to Plugins

These capabilities belong to InterLayer's own macOS System Plugin, and a call from any other Plugin is refused (`owner_only`):

- changing the output or input audio device, and setting the input volume or input mute;
- turning Wi-Fi on or off;
- reading or changing windows (position, size, full screen, minimize, window titles);
- the detailed system snapshot (uptime and similar), the battery Source of macOS System, and the active-window Source.

The following are not available through any API: the clipboard, selected text, other apps' Accessibility elements, arbitrary files, global keyboard or mouse monitoring, Keychain items other than your own secret settings, synthesized keystrokes or clicks, and running shell or AppleScript code. For keystrokes and scripts, use ordinary Commands (Keyboard, CLI) and combine them with your Plugin's Commands in a Multi Action.
