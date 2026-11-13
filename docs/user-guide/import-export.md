# Import and Export

| What | File | Export from | Import from |
|---|---|---|---|
| Command Pack | `.olcommands` | Pack Manager ▸ Export… | Pack Manager ▸ Import Pack… |
| Icon Pack | `.olicons` | Pack Manager ▸ Export… | Pack Manager ▸ Import Pack… |
| Image Pack | `.olimages` | Pack Manager ▸ Export… | Pack Manager ▸ Import Pack… |
| Design Pack | `.oldesign` | Design Studio ▸ Export… | Design Studio ▸ Import… |
| Profile | `.olprofile` | Profile properties ▸ Export Profile… | Profiles ＋ ▸ Import Profile… |
| Plugin | `.interlayer-plugin` | Plugin Studio ▸ Export | Plugin Studio ▸ Import… / Import Folder… |

Pack, Design and Plugin imports also accept a folder, or a `.zip` of that folder.

An imported Command, Icon or Image Pack is **read-only**. Importing a Pack whose ID matches an Imported Pack you already have replaces it, after showing what changes.

## Profiles (`.olprofile`)

Export a single Profile to share a panel with someone else.

**Included:**

- The Profile, its Layers, Bindings and Layout.
- The Commands it uses from your own Packs (as a generated Command Pack).
- Your own icons and images it uses (as generated Icon / Image Packs).
- Imported Packs it uses.
- Your own Design Packs it uses.

**Not included:**

- Built-in Packs and Designs (every InterLayer has them).
- **Plugins.** The import summary lists them under **Plugins required**. Install those Plugins separately; until then, their Commands show as missing.

Import adds the Profile to the open Project. It never overwrites existing Profiles, and it shows one Import Summary first.

## Whole Projects

There is no single-file export of a whole Project. A Project is a folder: copy the folder to back it up or move it. Remember that Commands, icons and Designs are in your Library, not in the Project folder. To share a complete setup, export each Profile, or export the Packs it uses.
