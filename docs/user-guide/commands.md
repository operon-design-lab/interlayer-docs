# Commands

A Command is a reusable action. It has a **Name**, an optional **Overlay Label** and icon, and one **Executor Type**. Commands live in Command Packs in your Library, so one Command can be used by many Bindings and Projects. Editing a Command changes it everywhere.

## Command Browser

Choose **Commands** or **Split** in Studio's center view.

- **Search commands...**, a Pack filter (**All Packs** or one Pack), and a category filter.
- Selecting a Command shows a read-only **Command Summary** (Executor, keys, target and so on). Read it before using a Command: the name alone does not tell you what it sends.
- **＋ New Command** appears when the Pack filter is set to a Pack you can edit (for example **My Commands**).
- **Manage Packs…** opens the Pack Manager (see [Packs](packs.md)).

## Command Editor

Inspector ▸ **Edit: Command**, then select a Command.

Fields: **Immutable ID** (read-only), **Name**, **Category**, **Overlay Label (optional)** (shown on the overlay instead of the Name), **Icon Ref** with **Browse…**, **Executor Type**, then the Executor's own settings.

Buttons: **Save Command**, **Delete Command**, **Duplicate to User Pack**.

- Built-in, Imported and Plugin Packs are read-only. Use **Duplicate to User Pack** and edit the copy.
- **Delete Command** lists where the Command is used and asks first. Bindings that used it then show **Missing Command** and do nothing until a Command with the same ID exists again.

## Executor types

### Keyboard

Sends one key combination to the app in front.

- **Keys**, for example `Cmd + Shift + K` (separate with `+` or `,`).
- One key plus optional modifiers: **Ctrl, Option (Alt), Shift, Cmd**.
- Keys: letters, digits and printable ASCII characters (write `Comma` and `Plus` for those keys); **Enter, Escape, Tab, Space, ArrowUp / ArrowDown / ArrowLeft / ArrowRight, PageUp, PageDown, Home, End, Backspace, Delete, F1–F12**; **Numpad0, Numpad1, Numpad3, Numpad4, Numpad5, Numpad7, NumpadAdd, NumpadDecimal**.
- A letter does not add Shift by itself.
- For several key presses in a row, use a **Multi Action**.

### Mouse

Acts at the current pointer position.

- **Action**: `click`, `mouse_down`, `mouse_up` (with **Button** `left` / `right`), or `scroll` (with **Direction** up / down / left / right and **Amount**).
- **Modifiers**: Control, Option, Shift, Command (for example Command-click).
- Mouse Commands are for touch input (for example an iPad with Sidecar). They are not supported when you operate the overlay with the mouse pointer itself.

### System

System keys:

**Play / Pause**, **Next Track**, **Previous Track**, **Volume Up**, **Volume Down**, **Mute**, **Brightness Up**, **Brightness Down**.

Media keys control the app that is currently playing (Now Playing).

### Open

- **Application**: **Choose Application…** or a bundle identifier.
- **File**: an absolute path (or `~/…`), or **Choose File…**. Opens with the file's default app. Studio warns when the file would run something (apps, scripts, installers).
- **URL**: for example `https://…`. Opens in the default browser or the app registered for the scheme. `file:`, `javascript:`, `data:`, `vbscript:`, `about:` and `blob:` URLs are refused.

### Text

Inserts fixed text into the focused text field (by pasting; your previous Clipboard is restored afterwards). Up to 10,000 characters, multi-line allowed. No variables.

### Internal

Controls InterLayer itself. The built-in **Standard Internal** Pack has ready-made Commands with icons:

| Group | Commands |
|---|---|
| Layer | Next Layer, Previous Layer, Set Layer 1–5 |
| Page | Next Page, Previous Page, Set Page 1–5, Set Page (the Page is chosen on the Binding) |
| Profile | Next Profile, Previous Profile, Set Profile 1–5 |
| RUN | Collapse RUN, Toggle Position & Scale Mode, Open RUN Menu |
| InterLayer | Open Studio |

If there are fewer Layers, Pages or Profiles than the number, nothing happens.

To target a Layer or Profile by name, create your own Internal Command:

| Command | Setting |
|---|---|
| `layer.set` / `layer.next` / `layer.prev` | Layer (for `layer.set`) |
| `profile.set` / `profile.next` / `profile.prev` | Runtime Profile (for `profile.set`) |
| `page.set` / `page.next` / `page.prev` | **Target** and **Page** are chosen on each Binding |
| `overlay.collapse`, `overlay.toggle_position_scale`, `overlay.open_menu`, `studio.open` | — |

**Page Commands:** where the Command is bound, choose the **Target**: *This Part* (when the Part itself has Pages) or another Part with Pages (Grid Buttons, Slide Buttons, or an Area Radial outer ring).

### Multi Action

Runs steps in order.

- **+ Command** and **+ Wait** (0–60,000 ms, default 500). ↑ ↓ to reorder, × to remove. Up to **32 steps**.
- Steps can be Keyboard, Mouse, System, Open, Text and Internal Commands.
- A failed step stops the Multi Action. A Multi Action inside a Multi Action does not run. Pressing again while it is running is ignored.
- Add a Wait where an app needs time (for example after opening an app).

### MIDI Out (advanced)

Sends a MIDI message to a MIDI output on your Mac (a connected device, or the macOS IAC Driver).

- **Output** (*First available* or a named output), **Channel**, **Message**: Note On, Note Off, Control Change (CC), Program Change, Pitch Bend, with **Note**, **Velocity**, **CC Number**, **Fixed Value** or **Program** as needed.

### CLI (advanced)

Runs a program or script on your Mac.

- **Runner**:
  - **Process** (recommended) — runs a program directly with arguments, no shell.
  - **Shell script** — runs with `/bin/zsh -c`.
  - **AppleScript** — runs with `osascript`. Controlling another app needs Automation permission.
- A CLI Command runs only after you **Approve…** it. Approval records that you trust exactly this content; any change needs a new approval, and an imported CLI Command is never approved. **Run Test** tries it from the editor.
- **Approval is not a sandbox.** The Command runs with your user rights and can do anything you can. Only approve scripts you understand.
- `{{global.NAME}}` and `{{secret.NAME}}` insert Global Variables and Keychain Secrets set in Plugin Studio (**Variables & Secrets…**).

### Read-only types

Plugin Commands are shown read-only (as *External API*). Their settings come from the Plugin. Stored Commands of types that this version cannot create are also shown read-only.
