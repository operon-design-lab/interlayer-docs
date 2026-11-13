# Basic operation

InterLayer has two main windows:

- **RUN** — the overlay you use every day. It floats above other apps.
- **Studio** (window title *Overlay Studio*) — the editor where you build Profiles, place Parts and assign Commands.

A third window, **Design Studio**, edits the look of the overlay. See [Design](../user-guide/design.md).

## Use RUN

- **Run a Command:** click or touch a Part. Most buttons run when you release; some are set to run as soon as you touch.
- **Use a slider or dial:** drag along it.
- **Change Page** on a grid or slide of buttons: swipe across the Part (if swiping is turned on for it).
- **Move the overlay:** drag the empty background (while *Position & Scale Mode* is on, which is the default) or drag the bottom-left corner.
- **Resize the overlay:** drag the bottom-right corner.
- **Window controls:** tap **•••** in the top-right corner. It shows buttons for the RUN Menu, Hide, and Previous / Next Layer.
- **Open the RUN Menu:** right-click (or Control-click) the overlay, or use the Menu button in the ••• controls.
- **Hide the overlay:** use Hide in the ••• controls, or press **⌘⌥⇧C**. Tap the small collapsed icon (or press the shortcut again) to bring it back. By default, RUN also collapses by itself after 5 seconds without use (*Auto Hide*).

All of these can be changed in **RUN Settings…** (RUN Menu). See [RUN](../user-guide/run.md).

## Make a button in Studio

This example adds a button that sends **⌘Z** (Undo) to the app in front.

1. RUN Menu ▸ **Open Studio**.
2. In the left column, select a Profile and a Layer.
3. In the right column (Inspector), choose **Edit: Layout**. Under **Plate Parts**, choose `single_rect` and click **Add**. Drag the new Part to where you want it.
4. Choose **Edit: Binding**. Select the new Part in the Preview.
5. Choose the Interaction **Single Button**.
6. Click **＋** on the empty slot (*Not Assigned*) to open the Command Picker, search for *Undo* and choose it. The **macOS Shortcuts** Pack has an Undo Command. You can also create your own: see [Commands](../user-guide/commands.md).
7. Click **Save** in the header, then **Run**.

RUN now shows the button. Open any app, click into it, and touch the button to undo.

> RUN always runs the Project **as saved on disk**. If a change does not appear in RUN, click **Save** and then **Run** in Studio.

## Switch between sets of controls

- **Layers** change what the same Parts do (for example "Edit" and "Color" for one app). Use Previous / Next Layer in the ••• controls, or a Layer Command on a Part.
- **Profiles** are complete separate panels (for example one per app). Use **Switch Profile** in the RUN Menu, or a Profile Command on a Part.

InterLayer does not switch Profiles automatically when you change apps. You switch them yourself.

## Quit

RUN Menu ▸ **Quit InterLayer**, or **⌘Q**. If Studio or Design Studio has unsaved changes, InterLayer asks whether to save them first.

Next: [User Guide](../user-guide/README.md)
