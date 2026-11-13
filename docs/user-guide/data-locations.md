# Data locations

## Your Projects

A Project is the folder you chose. It contains:

| File | Contents |
|---|---|
| `project.json` | The Project: name, Profiles, default Profile, and the Packs and Designs it refers to |
| `plate.json` | The Project's base Layout record (required by the file format; no Profile uses it) |
| `plates/plate_<profile>.json` | Each Profile's Layout |
| `profile_<id>.json` | One per Profile: its Layers and Bindings |
| `.pitsboard-backup/` | Backups made when an older Project was adjusted on load |

Edit Projects in Studio, not by hand.

## Your Library and settings

Everything else is in:

```
~/Library/Application Support/InterLayer/
```

| Item | Contents |
|---|---|
| `command-packs/` | Command Packs (including My Commands) |
| `icon-packs/` | Icon Packs (`icon-packs/user` is User Icons) |
| `image-packs/` | Image Packs |
| `design-packs/` | Your Design Packs |
| `plugins/` | Plugins you installed, their settings and approvals |
| `logs/` | Input Diagnostics reports |
| `*.json` | RUN preferences, recent Projects and other app settings |

Plugin secrets and Global Secrets are stored in the macOS Keychain, not in this folder.

To open the folder: in Finder choose **Go ▸ Go to Folder…** and enter `~/Library/Application Support/InterLayer`.

## Backing up

- Copy your Project folders.
- Copy `~/Library/Application Support/InterLayer` (with InterLayer quit).

## Starting fresh

1. Quit InterLayer.
2. Move `~/Library/Application Support/InterLayer` to another place (or the Trash).
3. Start InterLayer. It asks for a Project folder again and reinstalls the starter content.

Reinstalling the app alone does not reset anything.
