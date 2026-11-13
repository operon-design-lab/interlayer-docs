# Icons

A feature's Command can have an icon: `command.icon_ref`, and for toggles `command.states.on.icon_ref` / `command.states.off.icon_ref`. A reference has the form `"<icon pack id>:<icon id>"`.

## Bundling your own icons

Put an Icon Pack in your Plugin's `icons/` folder:

```
icons/
├── icons.json
└── assets/
    ├── lamp.svg
    └── lamp_on.svg
```

`icons/icons.json`:

```json
{
  "version": 1,
  "document_type": "icon_pack",
  "id": "plugin-acme-lamp",
  "name": "Acme Lamp Plugin Icons",
  "pack_version": "1.0.0",
  "icons": [
    { "id": "lamp", "file": "assets/lamp.svg", "label": "Lamp" },
    { "id": "lamp_on", "file": "assets/lamp_on.svg", "label": "Lamp On" }
  ]
}
```

- The Pack `id` **must** be `plugin-<your plugin id>`.
- Allowed keys: `version` (1), `document_type` (`"icon_pack"`), `id`, `name`, `pack_version`, `icons`, and optionally `previous_ids`, `metadata`. Per icon: `id` (`^[a-z0-9][a-z0-9_.-]*$`), `file` (relative to `icons/`), `label`, optional `tags`.
- Files: `.svg` (≤ 256 KB), `.png` (≤ 1 MB), `.jpg` / `.jpeg` (≤ 2 MB). SVG files must not contain scripts, `<foreignObject>`, entity declarations, event attributes (`on…=`), `javascript:` or external references.
- Single-color SVG icons follow the Design's icon color. Light-on-dark artwork suits the default Designs.

Refer to them as `"plugin-acme-lamp:lamp"`.

If `icons/` is invalid, Import refuses the Plugin.

## Using icons from other Icon Packs

You can refer to icons in other installed Icon Packs. List those Pack ids in `plugin.json` → `requires.icon_packs`, for example `["<icon pack id>"]`. If a listed Pack is not installed, Plugin Studio shows a warning; the Plugin still works and the icon shows a placeholder.

## Updating icons

Icons are matched by id. Keep published icon ids: replacing the file behind an id is safe, but removing or renaming an id turns existing references into placeholders. The update preview in Plugin Studio lists removed, changed and added icon ids.
