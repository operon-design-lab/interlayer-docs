# Concepts

InterLayer shows a configurable on-screen control panel (**RUN**) on top of your other apps. The panel is made of **Parts**: buttons, sliders, rings and dials. Touching or clicking a Part runs a **Command**, such as a keyboard shortcut, a media key, a mouse click, inserted text, or opening an app, file or URL.

You build the panel in **Studio** and use it in **RUN**.

## How the pieces fit together

```
Project / Workspace (a folder)
 └─ Profile               a complete panel; RUN shows one at a time
     ├─ Layout            where the Parts are (shared by Profiles, or the Profile's own)
     │   └─ Part          a button, slider, ring …; has one or more Zones
     └─ Layer             one set of assignments for the same Parts
         └─ Binding       on one Part + Zone: an Interaction and its Commands
             └─ Interaction   how the touch is read: tap, grid, slider, dial …
                 └─ Command   what happens
                     └─ Executor   the kind of action: Keyboard, Mouse, System, Open …

Library (shared by all Projects)
 Command Packs · Icon Packs · Image Packs · Design Packs · Plugins
```

## Glossary

| Term | Meaning |
|---|---|
| **Project / Workspace** | A folder that holds one InterLayer setup. RUN calls it a *Project*; Studio calls it a *Workspace*. They are the same thing. |
| **Profile** | A complete panel with its own Layers and, optionally, its own Layout and size. RUN shows one Profile at a time. |
| **Layout** | The positions, sizes and types of the Parts. By default all Profiles share one Layout. |
| **Surface** | The drawing area of the panel, in pixels (for example 800 × 480). |
| **Part** | One control on the Surface. Types: `single_rect`, `single_circle`, `slider`, `ring`, `dual_circle`, `triple_circle`, and `decoration` (display only). |
| **Zone** | A touchable region of a Part. Most Parts have one (`main`). `dual_circle` has `outer` and `center`; `triple_circle` has `outer`, `middle` and `center`. |
| **Layer** | A set of assignments for the Parts of a Profile. Same Parts, different Commands. One Layer is active at a time. |
| **Binding** | What one Part + Zone does in one Layer: an Interaction, its Commands and settings. |
| **Interaction** | How a Part reacts to touch: Single Button, Grid Buttons, Slide Buttons, Value Slider, Value Dial, Dial Select, Area Radial, XY Pad, Data Display, Text / Image. |
| **Page** | Grid Buttons, Slide Buttons and the outer ring of an Area Radial can hold several Pages of Commands on the same Part. |
| **Command** | A reusable action with a name, an optional label and icon, and one Executor. Commands live in Command Packs, not in the Project, so one Command can be used in many places. |
| **Executor** | The kind of action a Command performs: Keyboard, Mouse, System, Open, Text, Internal, Multi Action, MIDI Out, CLI. |
| **Pack** | A collection in your Library: Command Pack, Icon Pack, Image Pack or Design Pack. |
| **Design** | The look of the panel (colors, borders, background image, materials), stored in a Design Pack. |
| **Plugin** | An add-on that brings live Commands for another app or for macOS, such as the current volume or the playing track. |

## Key differences

- **Layer vs Profile:** a Layer changes the *assignments* on the same Parts. A Profile is a whole separate panel.
- **Layer vs Page:** switching Layer changes every Part. Switching Page changes one Part only.
- **Command vs Binding:** editing a Command changes it everywhere it is used. Editing a Binding changes only that Part in that Layer.

## Where things are stored

- Your **Project** folder holds Profiles, Layers, Layouts and Bindings.
- Your **Library** holds Commands, icons, images, Designs and Plugins. A Project only *refers* to them; nothing is copied into the Project folder.

See [Data locations](data-locations.md).
