# Developer Guide: building Plugins

A **Plugin** brings live Commands for another app into InterLayer. A Plugin Command can **read** state from the app (a value, an on/off state, a list, text or an image) and **send** actions to it. Users bind Plugin Commands to Parts in Studio like any other Command.

> The Plugin platform is in **alpha** in the current beta (0.1.0-beta.1). File formats are versioned (`schema_version: 1`), but details may change in later releases.
>
> **New after 0.1.0-beta.1** (not in that build): the `action` kind, the Action Context, `api.storage`, `api.builtin`, ten more built-in permission groups, and restoring minimized windows in `app.activate` / `app.launch`. Pages mark these where they appear.

## How a Plugin works

```
 RUN (overlay)                 InterLayer                         Your Plugin                    The app
 ─────────────                 ──────────                         ───────────                    ───────
 Part bound to   ── commit ──▶ Plugin Command   ── action id ──▶  Adapter: actions  ── HTTP/WS ──▶  local API
 plugin.<id>.<feature>         (generated from     + parameters
                               your feature file)
 Data Display    ◀── state ──  polls the Source ◀── source id ──  Adapter: sources  ◀── HTTP/WS ──  local API
```

- **Features** (`features/<feature>.json`) describe what users get: one feature becomes one Command, `plugin.<plugin id>.<feature id>`, in a read-only Command Pack `plugin-<plugin id>`. You never write Command files or choose Command IDs yourself.
- The **Adapter** (`adapter/`) implements the **Sources** (reads) and **Actions** (writes) that features refer to by identifier. It is either:
  - **declarative** — JSON only. InterLayer itself makes the HTTP or WebSocket requests you describe. Use this first.
  - **script** — a JavaScript module (`.mjs`) that InterLayer runs in a separate, restricted Node process. Use it when you need protocol logic (authentication handshakes, translating messages).
- A feature can also use some of InterLayer's **built-in** Sources and Actions (system volume, running apps, the Music app, and after 0.1.0-beta.1 more macOS capabilities) through [permission groups](manifest.md#permissionsbuiltin) your Plugin declares. A script Adapter can call them too, with `api.builtin` (new after 0.1.0-beta.1). See [Built-in Sources and Actions](built-in-api.md).
- The user must **approve** the Adapter and the built-in permissions in Plugin Studio before they run.

## What you need

- InterLayer 0.1.0-beta.1 or later on an Apple Silicon Mac.
- A text editor. There is no SDK, npm package or build step. A Plugin is a folder of JSON files (plus `.mjs` files for a script Adapter).
- An app that exposes a local API (HTTP or WebSocket), or a small bridge that you install into the app (for example an add-on that opens a local HTTP server).

If the app can already be controlled with keyboard shortcuts, you do not need a Plugin: use Keyboard Commands in a Command Pack instead.

## Workflow

1. Plan your features: what to read, what to send, and which [kind](features.md#kinds) each one is.
2. Create the folder: [Package structure](package-structure.md).
3. Write `plugin.json`: [Manifest](manifest.md).
4. Write the Adapter: [Declarative Adapter](declarative-adapter.md) or [Script Adapter](script-adapter.md).
5. Write one file per feature: [Features](features.md).
6. Install it with Plugin Studio ▸ **Import Folder…**, fill in settings, approve, and test: [Testing and distribution](testing-and-distribution.md).
7. Export a `.interlayer-plugin` file and share it.

## Pages

| Page | Contents |
|---|---|
| [Package structure](package-structure.md) | Folder layout, allowed files, size limits |
| [Manifest (`plugin.json`)](manifest.md) | Every key, settings, setup steps, requirements |
| [Features](features.md) | Feature files, Command kinds, mapping, action templates, data shapes |
| [Declarative Adapter](declarative-adapter.md) | `adapter.json` for HTTP and WebSocket without code |
| [Script Adapter](script-adapter.md) | `createAdapter(api)`, the `api` object, Action Context, Plugin Storage, built-in calls, errors, sandbox and lifecycle |
| [Built-in Sources and Actions](built-in-api.md) | Permission groups, ids and data, macOS permissions, activating and opening apps, Shortcuts, what is not available |
| [Security](security.md) | Approval, secrets, sandbox limits, rules for Plugin authors |
| [Icons](icons.md) | Bundling icons and using other Icon Packs |
| [Testing and distribution](testing-and-distribution.md) | Installing, approving, updating, testing, error codes, exporting |
| [Examples](../../examples/) | `acme-lamp` (declarative), `acme-timer` (script) and `press-counter` (script: storage, built-in calls, `action` kind) |

## Quick start: the smallest useful Plugin

The [`acme-lamp`](../../examples/acme-lamp/) example is a complete declarative Plugin with a toggle, a value and a display feature. Copy it, change the IDs, the URL and the paths to match your app, and import the folder with Plugin Studio ▸ **Import Folder…**.
