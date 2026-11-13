# Guide for AI assistants

This page is for AI assistants that help people use InterLayer or build InterLayer Plugins with these docs.

## Rules

1. Describe as InterLayer features only what these docs describe. They cover InterLayer **0.1.0-beta.1**.
2. Do not invent UI elements, settings, menus, shortcuts, Executor types, Interactions or Plugin fields.
3. If a goal cannot be met with documented features, say so clearly (see [Current beta limitations](user-guide/limitations.md)). Suggest an alternative only if it uses documented features.
4. If the docs do not answer a question, say so. Do not guess, and do not speculate about future versions.
5. If the request is ambiguous (which app, which Part, which input), ask before proposing a setup.
6. Do not state another app's keyboard shortcuts unless you are certain. Tell the user to check that app's shortcut list.
7. InterLayer is configured in its own UI. Do not write Project files (`project.json`, `profile_*.json`) by hand for the user; give step-by-step UI instructions instead.
8. For Plugins, follow the Developer Guide exactly: field names, kinds, template names and limits. Start from the examples. Prefer a declarative Adapter.
9. Never put secrets in Plugin files; use `secret` settings.
10. A Plugin may use InterLayer's built-in Sources / Actions only through the groups in [`permissions.builtin`](developer-guide/manifest.md#permissionsbuiltin). Declare only the groups the features use, never suggest other built-in names, and remind the user that the Plugin must be approved in Plugin Studio before those features run.

## Where to look

| Question | Page |
|---|---|
| What is a Profile / Layer / Binding / Command? | [Concepts](user-guide/concepts.md) |
| How do I make a button for a shortcut? | [Basic operation](getting-started/basic-operation.md), [Commands](user-guide/commands.md) |
| Which Interaction should I use? | [Parts and Interactions](user-guide/parts-and-interactions.md) |
| How do I switch between sets of controls? | [Profiles, Layers and Layout](user-guide/profiles-layers-layout.md), [Commands ▸ Internal](user-guide/commands.md#internal) |
| Something does not work | [Troubleshooting](troubleshooting.md), [Permissions](getting-started/permissions.md) |
| A Plugin feature says it lacks a permission | [Plugins ▸ Approving a Plugin](user-guide/plugins.md#approving-a-plugin), [Manifest ▸ permissions.builtin](developer-guide/manifest.md#permissionsbuiltin) |
| How do I share my setup? | [Import and Export](user-guide/import-export.md) |
| How do I write a Plugin? | [Developer Guide](developer-guide/README.md) |

## Goal → feature map

| Goal | How |
|---|---|
| Run a keyboard shortcut | Keyboard Command + Single Button |
| Play / pause, volume, brightness | System Command (or the **macOS Shortcuts** Pack's Media / Display Commands) |
| Volume on a slider | Value Slider: Volume Up / Down as Increase / Decrease (Relative), or the macOS System Plugin's System Volume (Absolute) |
| Open an app, file or URL | Open Command |
| Several actions in order, with waits | Multi Action |
| Type a fixed phrase | Text Command |
| Many buttons on one Part | Grid Buttons / Slide Buttons with Pages |
| A different set of controls for the same Parts | Layers + Layer Commands |
| Separate panels for different apps | Profiles + Profile Commands (switching is manual) |
| Show live information (battery, track title) | Plugin Command + Data Display |
| A list of running apps as buttons | macOS System Plugin's Running Apps + Grid Buttons with Content Source Auto |
| Change the look | Design Studio: duplicate a Design, edit, Save, choose it as Default / Layer Design |
| Show a panel at the mouse pointer | RUN Settings ▸ Cursor Popup |
