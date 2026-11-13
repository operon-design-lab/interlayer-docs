# Package structure

A Plugin is a folder. Its name should equal the Plugin `id`.

```
<plugin-id>/
├── plugin.json                 required — the manifest
├── features/
│   └── <feature-id>.json       one file per feature listed in plugin.json
├── adapter/                    the Adapter (required for any Plugin that talks to an app)
│   ├── adapter.json
│   └── *.mjs                   script Adapter only
├── icons/                      optional — icons bundled with the Plugin
│   ├── icons.json
│   └── *.svg / *.png / *.jpg
├── bridge/                     optional — files the user installs into the target app (e.g. an add-on)
├── assets/                     optional — other files (e.g. images for setup steps)
├── README.md                   optional
├── LICENSE / LICENSE.md / LICENSE.txt   optional
└── CHANGELOG.md                optional
```

## Rules

- **Root files:** only `plugin.json`, `README`, `README.md`, `README.txt`, `LICENSE`, `LICENSE.md`, `LICENSE.txt` and `CHANGELOG.md` (case-insensitive).
- **Root folders:** only `features/`, `adapter/`, `icons/`, `bridge/` and `assets/`. Anything else makes Import fail.
- `features/` holds only `<feature-id>.json` files. A file not listed in `plugin.json` gives a warning.
- `adapter/` is **flat** (no sub-folders). File names must match `[A-Za-z0-9_-]+` with the extension `.mjs`, `.json` or `.md`.
- `icons/` holds `icons.json` plus `.svg`, `.png`, `.jpg`, `.jpeg` files (sub-folders are allowed, for example `icons/assets/`).
- `bridge/` and `assets/` may contain any files and sub-folders.
- No hidden files (names starting with `.`, for example `.gitignore`). macOS junk files (`.DS_Store`, `._*`, `__MACOSX/`) are skipped automatically.
- No symbolic links, and no archives inside the package (`.zip`, `.tar`, `.gz`, `.dmg`, `.pkg`, `.jar` and similar).
- File names: no `..`, no absolute paths, no backslashes, none of `< > : " | ? *`, no trailing dot or space. Folder depth at most 8; path length at most 512 bytes.

## Limits

| Limit | Value |
|---|---|
| Package (`.interlayer-plugin`) file size | 32 MB |
| Total unpacked size | 32 MB |
| Number of files | 500 |
| One file | 8 MB |
| `adapter/` + `bridge/` together | 4 MB |
| Features per Plugin | 64 |
| SVG icon / PNG icon / JPEG icon | 256 KB / 1 MB / 2 MB |

## The `.interlayer-plugin` file

A distributable Plugin is a ZIP file with the extension `.interlayer-plugin`. **`plugin.json` must be at the root of the ZIP**, not inside a wrapping folder. Plugin Studio ▸ **Export…** creates a correct file for you (see [Testing and distribution](testing-and-distribution.md)).
