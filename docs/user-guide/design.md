# Design

A **Design Pack** sets the look of the overlay: colors, borders, materials, background image and corner radius.

## Where a Design is chosen

- **Default Design** of the Project (chosen when you create it; change it in Studio ▸ **Settings**).
- **Layer Design** for a single Layer (Layer properties).
- **Design Class** for a single Part (Edit: Layout), if the Design defines classes.

Designs available after installation:

- Built-in (read-only): **Default Style**.
- Starter Designs (yours to edit): **Minimal Dark(Default)**, **Minimal Light(Default)**, **Minimal Solid Dark(Default)**, **Minimal Solid Light(Default)**.

## Design Studio

Open it from Studio ▸ **Open in Design Studio**.

- **Pack list** (Built-in and User): **New**, **Duplicate**, **Import…**, **Export…** (`.oldesign`; Import also accepts a folder or a `.zip`), **Delete…**, **Save**, **Revert**. Built-in Designs are read-only; **Duplicate** one to make your own.
- **Preview**: **Pack** or **Parts** view, Design Class preview, Label / Icon / Material toggles, and backgrounds (Checker, Dark, Light, Desktop Light, Desktop Dark).
- **Tabs**:
  - **Info** — Name, Description.
  - **Properties** — **Surface** (background, outline, ink, panel, **Corner Radius** 0–24, **Surface Effect**), **Presentation** and **Parts** (fill, border, touch and commit colors, slot, marker, icon, guides, **Part Shadow**). A **Scope** chooses all Parts, one Part type, or a single Zone (*Zone Override*). Each color swatch opens **Solid / Gradient…** for solid colors and linear or radial gradients.
  - **CSS** — edit the Pack's `style.css` directly (User Designs).
  - **Classes** — add or remove Design Classes, which Studio offers for Parts.
  - **Assets** — **Add image…** (PNG, WebP, JPEG, SVG), Background Image / Texture, Part Materials (an image per Part type drawn under its shape).

Studio and RUN use Design changes after you **Save** in Design Studio.

## Share a Design

**Export…** writes a `.oldesign` file. The other person uses **Import…** in Design Studio.
