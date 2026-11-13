# Labels, icons and Display

## What a Part shows

A Part shows its Command's **Overlay Label** (or its **Name** when there is no Overlay Label) and the Command's icon, unless you set a Display override for that placement.

- **Show Labels** (RUN Settings ▸ Appearance, or the RUN Menu) turns labels on or off.
- A Value Slider or Value Dial shows no value label at rest.
- A Command with no icon shows an "icon not set" mark. An icon reference that cannot be found shows a neutral placeholder.

## Choosing a Command icon

Command Editor ▸ **Browse…** opens **Choose an Icon**. Search by name and filter by Icon Pack.

## Adding your own icons and images

In the Pack Manager (**Manage Packs…**):

- **Icons ▸ ＋ Import Icons…** copies SVG or PNG files into a User Icon Pack. Light-colored icons work best on the default dark Designs. Single-color SVG icons follow the Design's icon color.
- **Icons ▸ ＋ Import App Icon…** imports the icon of an installed application.
- **Images ▸ ＋ Import Images…** adds pictures to an Image Pack (**My Images** is created on the first import).

## Display override (Aa)

The **Aa** button next to a Command in a Binding opens **Display**. It changes only that placement, not the Command.

- **Custom Label** (up to 40 characters).
- **Visual**: **Command Icon**, **Icon**, **Image** (from an Image Pack, with **Fit** Contain / Cover and **Size** Icon Size / Fill), or **No Icon** (no icon and no placeholder; the label is still shown). *Fill* is available on rectangular buttons and on Grid / Slide cells.
- **Per State**: for Commands that have States (for example a Plugin toggle with On / Off), each State can use *Default*, an Icon, an Image or No Icon.
- **Reset** returns to the Command's own label and icon. **Apply** saves the override.

XY Pad has one Display for the whole Part. Data Display and Auto lists show the Plugin's own content and have no Display override.
