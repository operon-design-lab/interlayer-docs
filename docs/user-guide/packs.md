# Packs and the Library

Your **Library** is shared by all Projects. It holds:

| Pack type | Contents | Export file |
|---|---|---|
| **Command Pack** | Commands | `.olcommands` |
| **Icon Pack** | SVG / PNG icons | `.olicons` |
| **Image Pack** | Pictures for Display overrides and Decorations | `.olimages` |
| **Design Pack** | The look of the overlay (see [Design](design.md)) | `.oldesign` |

Plugins are also kept in the Library (see [Plugins](plugins.md)).

## Kinds of Packs

| Kind | Editable | Notes |
|---|---|---|
| **Built-in** | No | Comes with the app, for example **Standard Internal** and the **Default Style** Design. |
| **User** | Yes | Yours. The starter Packs (**Keyboard**, **Mouse**, **macOS Shortcuts**, **Keyboard Glyphs**, **Standard Icons**) are installed as User Packs. **My Commands** and **User Icons** always exist and cannot be deleted. |
| **Imported** | No | A Pack you imported from a file. To change it, duplicate its Commands into a User Pack. |
| **Plugin** | No | The Commands and icons an installed Plugin brings. They appear while the Plugin is enabled. |

## Pack Manager

Open it with **Manage Packs…** in the Command Browser (or **Manage…** in the icon chooser). Tabs: **Commands**, **Icons**, **Images**. Changes are saved immediately.

| Action | Notes |
|---|---|
| **＋ New Pack** | Create a User Pack. |
| **Rename** | Changes the display name only. |
| **Export…** | Save a Pack as one file. Not available for Built-in and Plugin Packs. |
| **Import Pack…** | Install a Pack file (or a Pack folder, or a `.zip` of one) as an Imported Pack. Importing a Pack with the same ID as an Imported Pack replaces it after showing what changes. |
| **Delete Pack** | Lists where the Pack is used and asks first. |
| **In pickers** | Hide a Pack from the Command / icon pickers only. Bindings and RUN are not affected. |
| Icon actions | Rename, remove, or ⧉ copy an icon into another User Icon Pack. Plugin icons can be copied too. |

## Starter Command Packs

| Pack | Contents |
|---|---|
| **Keyboard** | One Command per key. |
| **Mouse** | Left Click, Right Click, Command Click, Shift Click, Option Click, Scroll Up / Down / Left / Right. |
| **macOS Shortcuts** | Common macOS shortcuts in the categories Edit, File, Find, View, Window, System, Screenshot, Text Navigation, Media and Display (for example Copy, Undo, Spotlight, Mission Control, Screenshot Selection, Play / Pause, Brightness Up). |

## Missing Commands and icons

Projects refer to Commands and icons by ID. If a Pack is deleted or not installed, the Binding shows **Missing Command** (or **Missing Plugin Command**) and does nothing in RUN. When a Pack with the same IDs comes back, the references work again.
