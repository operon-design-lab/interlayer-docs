# RUN

RUN is the overlay you use. InterLayer starts with RUN and reopens the last Project.

## Operating Parts

- Touch a Part (on an iPad with Sidecar) or click / drag it with the mouse.
- Right-click or Control-click opens the RUN Menu.
- RUN runs the Project **as saved on disk**. After editing in Studio, click **Save** and **Run**.

## Corners and window controls

| Place | Default | Can be changed to |
|---|---|---|
| Top-right **•••** | Opens the window controls: Menu, Hide, Previous / Next Layer (Previous / Next Profile can be turned on). | Choose the buttons under **RUN Settings ▸ Corner Actions ▸ ••• Buttons**. |
| Top-left corner | None | Any Corner Action |
| Bottom-left corner | Move Handle (drag to move) | Any Corner Action |
| Bottom-right corner | Resize Handle (drag to resize) | Any Corner Action |

Corner Actions: **None, Collapse, Menu Open, Move Handle, Resize Handle, Previous Profile, Next Profile, Previous Layer, Next Layer**.

**Position & Scale Mode** (on by default) lets you move the window by dragging its empty background. Corner Actions work either way.

## Hiding and the collapsed view

When you hide RUN, it collapses to a small view. Tap it to restore; drag it to move it. **Collapsed Style** can be:

- **Icon** — a small icon (default).
- **Profile Launcher** — a Restore button plus one button per Profile, so you can open a Profile directly.

**Auto Hide** collapses RUN after a period without use (default: 5 seconds; choices Off, 3, 5, 10, 30 seconds).

## RUN Menu

Open it with right-click or the Menu button.

| Item | What it does |
|---|---|
| **Switch Profile ▸ / Previous Profile / Next Profile** | Show another Profile. |
| **Previous Layer / Next Layer** | Change Layer in the current Profile. |
| **Position & Scale Mode** | Turn background-drag moving on or off. |
| **Hide Overlay / Show Overlay** | Collapse or restore RUN. |
| **Capture Overlay** | Take a picture of the overlay (to the Clipboard or a PNG file). |
| **RUN Settings…** | Open RUN Settings. |
| **Open Studio** | Open Studio with the running Project. |
| **Developer ▸** | Tools for developers, including **Open Plugin Studio**. |
| **Input Troubleshooting ▸** | Input Diagnostics, Reset Input, Restart Screen Input. See [Troubleshooting](../troubleshooting.md). |
| **Quit InterLayer** | Quit. |

Right-clicking a corner also shows a menu for that corner's action. You can choose which items the RUN Menu shows in **RUN Settings ▸ Behavior**.

The menu bar (**InterLayer** menu) and the Dock menu contain the same items, plus **About InterLayer**, **Check for Updates…**, **Open Project…** and **Open Recent**.

## RUN Settings

RUN Settings are app preferences. They are not saved in the Project, and changes apply immediately.

| Pane | Settings |
|---|---|
| **Profiles** | Turn **Show in Launcher** off for Profiles you do not want in the Profile Launcher or in Previous / Next Profile. Remembered per Project. |
| **Shortcuts** | **Show / Hide Overlay** (default ⌘⌥⇧C; presets, Record… or None), **Cursor Popup** shortcut (default ⌘⌥⇧Space), fixed **Position & Scale Mode** (⌘⌥⇧P) and **Capture Overlay** (⌘⌥⇧S), Capture destination (Clipboard / PNG File…). |
| **Cursor Popup** | Show a Profile right at the mouse pointer with a keyboard shortcut. Turn it on and choose the Popup Profiles. Pressing the shortcut again moves to the next Popup Profile. It closes when the pointer leaves it. |
| **Corner Actions** | The action of each corner, Show Corner Buttons, and the ••• Buttons. |
| **Appearance** | RUN Controls (Dark / Light), Collapsed Style, Launcher size and orientation, Show Labels, Show Profile / Layer Names, Press Feedback, Commit Sound, Sound Volume (InterLayer's own sounds only). |
| **Behavior** | Position & Scale Mode, Auto Hide, Hide Overlay, Bring Overlay On Screen, and which items the right-click menu lists. |
| **General** | Open Studio, Open Project…, recent Projects, and Troubleshooting. |

## Which Profile RUN shows

- When you open a different Project, RUN starts with that Project's default Profile.
- Running the same Project again keeps the current Profile.
- Profiles with **Active in RUN** turned off (in Studio) are not shown in RUN.
- InterLayer does not switch Profiles or Layers automatically when you change apps.

## If a Project cannot be opened

RUN stays open without a Project and shows a dialog with the reason. You can choose **Open Another Project…**, **Show in Finder** or **Copy Error Details**.

If an older Project needed adjustments while loading, Studio and RUN tell you. The first Save after that keeps a backup inside the Project folder (`.pitsboard-backup/`).
