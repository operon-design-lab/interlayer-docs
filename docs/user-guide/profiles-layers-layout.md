# Profiles, Layers and Layout

## Profiles

A Profile is a complete panel. RUN shows one Profile at a time.

In Studio's **Profiles** list:

- **＋ ▸ New Profile** adds a blank Profile. **＋ ▸ Import Profile…** imports an exported Profile (see [Import and Export](import-export.md)).
- **↑ / ↓** change the order.
- The **gear** on the selected Profile opens its properties:

| Property | What it does |
|---|---|
| **Profile name** + **Rename** | Change the name. |
| **Profile icon** (Choose… / Clear) | The icon shown for this Profile in the Profile Launcher. |
| **Active in RUN** | Turn off to keep the Profile in the Project but not show it in RUN. |
| **Duplicate** | A complete copy. |
| **Delete Profile** | Delete it. |
| **Export Profile…** | Save it as a `.olprofile` file. |
| **Own Layout for this Profile / Use shared Layout** | See below. |
| **Surface Size** | Preset or **Width (px)** / **Height (px)** (64–8192). Changing the size does not move Parts. The change applies to every Profile that shares the same Layout. |

### Own or shared Layout

By default, all Profiles share one Layout (the same Parts in the same places).

- **Own Layout for this Profile** gives the Profile its own copy of the Layout. Its Bindings are kept.
- **Use shared Layout** returns it to the shared Layout.

## Layers

A Layer is a set of assignments for the Parts of a Profile. Only one Layer is active at a time.

In the **Layers** list:

- **＋** adds a blank Layer.
- **↑ / ↓** change the order. *Next Layer* / *Previous Layer* follow this order.
- The **gear** opens: **Layer name** + **Rename**, **Duplicate**, **Delete**, and **Layer Design** (a Design for this Layer, or *Use Plate Default* for the Project's Default Design).

## Layout: adding and arranging Parts

Inspector ▸ **Edit: Layout**.

- **Plate Parts**: choose a Part type and click **Add**. **Duplicate** and **Delete** act on the selected Part. Deleting a Part that has Bindings lists them and removes them after you confirm.
- Drag a Part in the Preview to move it; drag its handles to resize it. Positions and sizes are in pixels.
- **Snap drag/resize gestures to** 1, 5 or 10 px (on by default, 1 px). Turn it off for free movement.
- **Design Class**: a style variant defined by the Design (or none).
- A Part's type cannot be changed after it is added. Add a new Part instead.

### Part types

| Part | Zones | Typical use |
|---|---|---|
| `single_rect` | main | A button, a grid of buttons, a display |
| `single_circle` | main | A round button or display |
| `slider` | main | A value slider or a row of segment buttons |
| `ring` | main | A dial or a radial menu |
| `dual_circle` | outer, center | A dial or radial menu with a center button |
| `triple_circle` | outer, middle, center | Two rings and a center button |
| `decoration` | — | Text, an image or a background shape. It does not react to touch. |

### Decoration Parts

A `decoration` Part shows content but takes no touch. Settings include **Shape** (Rect / Circle), stacking (behind or in front of other Parts), **Content** (Text / Image / Background Only), the content **Source** (static, or the live state of a Plugin), font, image fit and background fill.
