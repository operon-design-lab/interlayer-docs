# Plugins

A Plugin adds live Commands for macOS or another app. Unlike ordinary Commands, Plugin Commands can **read** a state (the current volume, the playing track, battery level) and show it on the overlay.

## Built-in Plugins

| Plugin | Features |
|---|---|
| **macOS System** | System Volume, System Mute, Output Device, Current Output, Input Volume, Input Mute, Input Device, Current Input, Input Source, Front App, Running Apps, Launch App, Quit App, Window Actions, Window Full Screen, Battery Level, Charging, Wi-Fi |
| **Apple Music** | Playback, Next Track, Previous Track, Shuffle, Repeat, Music Volume, Track Position, Current Track, Now Playing, Track Title, Artist, Album, Album Artist, Artwork |

The starter **Music(Default)** Profile uses the Apple Music Plugin. macOS asks for Automation permission the first time (see [Permissions](../getting-started/permissions.md)). Window controls of macOS System need Accessibility permission.

**Running Apps** and **Launch App** bring the chosen app to the front (Launch App opens it first if needed). After 0.1.0-beta.1, they also bring back one of its windows when **all** of that app's windows are minimized, as a click on its Dock icon does. Windows are never moved or resized, and no other app is touched. This needs Accessibility permission; without it, the app still comes to the front.

## Using Plugin Commands

Each Plugin brings a read-only Command Pack named *"<Plugin name> (Plugin)"*. Pick its Commands in the Command Browser like any other Command. What a Command can do depends on its kind:

| Kind | Example | Use it with |
|---|---|---|
| **Value** | System Volume | Value Slider / Value Dial (Absolute or Relative), XY Pad (Separate), Data Display |
| **Toggle** | System Mute, Shuffle | Single Button (shows On / Off), Data Display; also as a one-shot cell in Grid / Slide Buttons, Dial Select and Area Radial |
| **Collection** | Running Apps, Output Device | Grid / Slide Buttons with **Content Source: Auto** (one cell per item), Data Display |
| **Display** | Battery Level, Track Title | Data Display |
| **XY** | — | XY Pad with Output **Combined** |
| **Action** | — (new after 0.1.0-beta.1) | Single Button, Grid / Slide Buttons, Dial Select, Area Radial: runs once per use, shows no State |

Studio offers only the Commands that fit the selected Interaction.

## Plugin Studio (Alpha)

Plugins are managed in **Plugin Studio**: RUN Menu (or the InterLayer menu) ▸ **Developer ▸ Open Plugin Studio**.

- **Built-in Plugins** and **My Plugins** lists.
- **Enabled** turns a Plugin on or off. While it is off, its Commands are missing.
- **Import…** installs a `.interlayer-plugin` file (or a `.zip`); **Import Folder…** installs a Plugin folder. A preview shows the features, the connections it makes, the built-in permissions it asks for, the settings and secrets it uses, and any warnings, before you click **Install** (or **Replace** for an update).
- **Export…** saves a Plugin as a `.interlayer-plugin` file. Your settings, secrets and approval are never exported.
- **Remove…** lists where the Plugin is used and asks first. References stay in your Projects and show as missing until the Plugin is installed again.
- **Duplicate to My Plugins** makes an editable copy of a Built-in Plugin.
- **Variables & Secrets…** edits Global Variables and Global Secrets (stored in the macOS Keychain).

### Approving a Plugin

A Plugin that talks to another app contains an **Adapter**. A Plugin may also ask for **built-in permissions**: access to some of InterLayer's own macOS capabilities, shown as **Read** (information on the overlay, such as the system volume or the running apps) and **Control** (changes on your Mac, such as setting the volume or bringing an app to the front).

InterLayer runs neither until you approve them:

1. Select the Plugin in Plugin Studio.
2. Review its **Built-in Permissions** and, if it has one, its **Adapter** section (what it connects to and which secrets it receives).
3. Click **Review & Approve…** and confirm in InterLayer's confirmation window.

Approval covers exactly what you reviewed. If the Plugin is updated (re-imported) or its permissions change, you approve it again. An update keeps the Plugin's settings, secrets and its saved data (Plugin Storage, after 0.1.0-beta.1). **Revoke Approval** withdraws it. A feature whose permission is missing or not approved does not run; the Plugin's **Built-in Permissions** section lists those features and why. The built-in Plugins (macOS System, Apple Music) need no approval.

> Only install and approve Plugins from sources you trust. An approved script Adapter runs as a separate process on your Mac. See [Security](../developer-guide/security.md) for what Plugins can and cannot do.

### Settings and setup

A Plugin may ask for settings (for example a port number) and secrets (for example an access token). Fill them in on the Plugin's page in Plugin Studio. Secrets are saved in the macOS Keychain. Some Plugins include setup steps such as **Test Connection**.

## Plugins and shared Profiles

A Profile export (`.olprofile`) never includes Plugins. When you import a Profile that uses a Plugin, the Import Summary lists it under **Plugins required**.

To build your own Plugin, see the [Developer Guide](../developer-guide/README.md).
