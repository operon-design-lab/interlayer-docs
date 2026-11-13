# Parts, Bindings and Interactions

A **Binding** says what one Part (and Zone) does in one Layer. It has an **Interaction** (how the touch is read) and one or more **Commands** (what happens).

## Create a Binding

1. Inspector ▸ **Edit: Binding**.
2. Select a Part in the Preview, then a **Zone** if the Part has more than one.
3. Choose an **Interaction**.
4. Fill the Command slots. An empty slot shows **Not Assigned**; click its **＋** to open the **Command Picker**. You can also select a Command in the Command Browser and use the **Set** / **Add** buttons, or drag it onto a slot.
5. Adjust the settings and the **Commit Method**.
6. **Save**, then **Run**.

**Remove Binding** deletes the Binding (Studio asks first).

## Interactions per Part

| Part · Zone | Interactions |
|---|---|
| `single_rect` · main | Single Button, Grid Buttons, Data Display, Text / Image, XY Pad |
| `single_circle` · main | Single Button, Data Display, Text / Image, XY Pad |
| `slider` · main | Value Slider, Slide Buttons |
| `ring` · main, `dual_circle` · outer, `triple_circle` · outer / middle | Area Radial, Dial Select, Value Dial |
| `dual_circle` · center, `triple_circle` · center | Single Button, Data Display, XY Pad |

## Commit Methods

| Interaction | Commit Methods |
|---|---|
| Single Button, Area Radial | **Touch Release** (default) or **Touch Down** |
| Grid Buttons, Slide Buttons, Dial Select | Touch Release |
| Value Slider, Value Dial, XY Pad | — (they send Commands while you move) |

- **Touch Release** runs the Command when you lift your finger (for a Single Button: on the same Part where you started).
- **Touch Down** runs it as soon as you touch.

## Single Button

One Command. Tap to run it.

## Grid Buttons

A grid of cells on a `single_rect`. Each cell runs one Command.

- **Rows**, **Columns**.
- **Content Source**: **Manual** (you choose a Command per cell) or **Auto** (the cells come from a Plugin list, for example running apps; one cell per item).
- **Pages**: ‹ › to view, ＋ to add, 🗑 to delete. Empty cells do nothing.
- **Page Navigation**: **Loop Pages** (wrap from the last Page to the first), **Swipe Paging** (swipe across the Part to change Page), **Page Controls**.

## Slide Buttons

Segments along a `slider`, one Command each. **Orientation**, **Segment Count** (2 or more), Content Source, Pages and Page Navigation as for Grid Buttons, plus **Reverse Swipe**.

## Value Slider and Value Dial

Moving along a `slider` (Value Slider) or around a ring (Value Dial) changes a value.

- **Mode**
  - **Absolute** — the place you touch is the value (for example a volume level). Needs a Command that has a value, such as a Plugin value Command.
  - **Relative** — moving adds or removes steps. Each step runs the **Increase Command** or **Decrease Command**. Plain Commands such as keyboard shortcuts work in Relative Mode only (*"This Command has no value: it runs once per step"*).
- **Increase Command** / **Decrease Command** (Relative with plain Commands). *Use the Increase Command for both* is available for value Commands.
- **Step Spacing** (Narrow / Normal / Wide) — how far you move for one step. **Step Size** — how much the value changes per step.
- **Grab** (Anywhere / Handle only), **Bar Width (px)**, **Current value marker**, **Wrap**, **Reverse**.
- Value Slider: **Orientation**. Value Dial: **Arc** (270° / 360°).
- **Advanced Settings ▸ Change Threshold**: movements smaller than this send nothing.

Typical use: a slider with Volume Up / Volume Down as Increase / Decrease, or a Plugin's System Volume in Absolute Mode.

## Dial Select

Move around the ring to choose one of several Commands; lifting runs the chosen one. Settings: **Commands** (at least 2), **Step Angle**, **Hysteresis**, **Wrap**. With fewer than 2 Commands it does nothing.

## Area Radial

The ring is divided into areas, one Command per area. Touch an area (or slide to another) and lift to run it, or run on touch with Touch Down.

- Each Page holds **2–6** Commands.
- Pages are available on the **outer** Zone. To change Page in RUN, use a Page Command (see [Commands](commands.md#internal)), for example on the center Zone of the same Part.

## XY Pad

Dragging in two directions sends X and Y steps.

- **Output**: **Separate** (an X Command and a Y Command) or **Combined** (one XY Command that gets both axes, from a Plugin).
- **X / Y Step Distance** (how far you move for one step), **Reverse X**, **Reverse Y**.
- XY Pad is relative only. It works with value Commands from Plugins.

## Data Display

Shows a live value from a Plugin, such as battery level or the current track. Touching it does nothing.

- **Format** (for example `{value}`, `{label}`), **Layout** (Plugin default / Stacked / Inline), alignment, **Text Size (px)**, and **Long Text** (Cut or Loop).

## Text / Image

Shows fixed text or an image on a `single_rect` or `single_circle`. Display only.
