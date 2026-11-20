# InterLayer Documentation

**InterLayer** is a touch control layer for your Mac. Place buttons, sliders and dials on an on-screen panel and send shortcuts, media keys, text and app actions to the app you are working in — by touch on an iPad with Sidecar, or with a mouse or trackpad.

- Official site: <https://inter-layer.app>
- Download (beta for macOS): <https://inter-layer.app/#download>
- Current version: **0.1.0-beta.1** (macOS, Apple Silicon)

This repository contains the user guide and the Plugin developer guide.

## Documentation

### Getting Started

- [Installation](docs/getting-started/installation.md)
- [First launch](docs/getting-started/first-launch.md)
- [Permissions](docs/getting-started/permissions.md)
- [Basic operation](docs/getting-started/basic-operation.md)

### User Guide

- [Concepts](docs/user-guide/concepts.md) — Projects, Profiles, Layers, Parts, Bindings, Commands
- [RUN](docs/user-guide/run.md) — the overlay, corners, RUN Menu, RUN Settings
- [Studio](docs/user-guide/studio.md) — the editor
- [Profiles, Layers and Layout](docs/user-guide/profiles-layers-layout.md)
- [Parts and Interactions](docs/user-guide/parts-and-interactions.md)
- [Commands](docs/user-guide/commands.md) — every Executor type
- [Labels, icons and Display](docs/user-guide/labels-icons-display.md)
- [Packs and the Library](docs/user-guide/packs.md)
- [Design](docs/user-guide/design.md) — Design Packs and Design Studio
- [Plugins](docs/user-guide/plugins.md) — using and managing Plugins
- [Import and Export](docs/user-guide/import-export.md) — file formats
- [Data locations](docs/user-guide/data-locations.md)
- [Current beta limitations](docs/user-guide/limitations.md)

### Developer Guide (Plugins)

- [Overview](docs/developer-guide/README.md)
- [Package structure](docs/developer-guide/package-structure.md)
- [Manifest (`plugin.json`)](docs/developer-guide/manifest.md)
- [Features](docs/developer-guide/features.md)
- [Declarative Adapter](docs/developer-guide/declarative-adapter.md)
- [Script Adapter](docs/developer-guide/script-adapter.md)
- [Built-in Sources and Actions](docs/developer-guide/built-in-api.md)
- [Security](docs/developer-guide/security.md)
- [Icons](docs/developer-guide/icons.md)
- [Testing and distribution](docs/developer-guide/testing-and-distribution.md)
- [Example Plugins](examples/)

### Help

- [Troubleshooting](docs/troubleshooting.md)

## Using these docs with an AI assistant

These docs are written so that AI assistants (Claude, ChatGPT, Codex and others) can help you set up InterLayer or build a Plugin.

- **Index for AI tools:** [`llms.txt`](llms.txt) lists every page with a one-line summary.
- **Rules for assistants:** [`docs/ai-assistant-guide.md`](docs/ai-assistant-guide.md) tells an assistant how to answer about InterLayer (only documented features, no guessed shortcuts).

Example prompts:

- *"Read https://github.com/operon-design-lab/interlayer-docs (start with llms.txt). How do I make a volume slider in InterLayer?"*
- *"Using the InterLayer Developer Guide and the acme-lamp example, write a declarative Plugin for an app whose API is: …"*

Paste the relevant pages into the conversation if your assistant cannot browse.

## Scope

These docs describe InterLayer **0.1.0-beta.1** only. Features not described here are not available in this version. Where these docs and the app disagree, please [open an issue](https://github.com/operon-design-lab/interlayer-docs/issues).
