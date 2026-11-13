# Profiles, Layers and Layout

## Profiles

A Profile is a complete panel. RUN shows one Profile at a time.

In Studio's **Profiles** list:

- **＋ ▸ New Profile…** opens the New Profile dialog:
  - **Empty Profile** — a new Profile with its own empty Layout (from the Workspace Defaults in **Settings**).
  - **Copy Layout from Existing Profile** — choose a **Source Profile**. The new Profile gets a copy of its Layout only: the Parts (types, positions, sizes), Surface Size and Default Design. Layers, Bindings and Commands start new, with no Part assigned.
- **＋ ▸ Import Profile…** imports an exported Profile (see [Import and Export](import-export.md)).
- **↑ / ↓** change the order.
- The **gear** on the selected Profile opens its properties:

| Property | What it does |
|---|---|
| **Profile name** + **Rename** | Change the name. |
| **Profile icon** (Choose… / Clear) | The icon shown for this Profile in the Profile Launcher. |
| **Active in RUN** | Turn off to keep the Profile in the Project but not show it in RUN. |
| **Duplicate** | A complete copy: Layout, Layers, Bindings and Design settings. |
| **Delete Profile** | Delete it. |
| **Export Profile…** | Save it as a `.olprofile` file. |
| **Surface Size** | Preset or **Width (px)** / **Height (px)** (64–8192). Changing the size does not move Parts; Parts left outside the Surface are reported by Validation. |
| **Default Design** | The Layout's Design, used by every Layer that has no Design of its own. |

### Every Profile has its own Layout

Each Profile has its own Layout. Editing Parts, Surface Size or Default Design changes only the selected Profile; Profiles never share or sync a Layout. To reuse a Layout, create a new Profile with **Copy Layout from Existing Profile**, or **Duplicate** the whole Profile.

Projects made with an earlier beta, where several Profiles could share one Layout, are updated when opened: each of those Profiles gets its own copy of the Layout, so nothing changes in what they show or do. InterLayer says *Project updated for compatibility*; the change is written at the next **Save**, and a backup of the previous files is kept in the Project folder (`.pitsboard-backup/`).

## Layers

A Layer is a set of assignments for the Parts of a Profile. Only one Layer is active at a time.

In the **Layers** list:

- **＋** adds a blank Layer.
- **↑ / ↓** change the order. *Next Layer* / *Previous Layer* follow this order.
- The **gear** opens: **Layer name** + **Rename**, **Duplicate**, **Delete**, and **Layer Design** (a Design for this Layer, or *Use Plate Default* for the Profile's Layout Default Design).

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
