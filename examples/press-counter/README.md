# Press Counter (example Plugin)

> **New after 0.1.0-beta.1.** This example uses the `action` kind, `api.storage`, `api.builtin` and the Action Context, which are **not in InterLayer 0.1.0-beta.1**. It installs in a later beta.

A small **script** Plugin that needs no other app. It shows every Plugin API added after 0.1.0-beta.1:

| Feature | Kind | What it does |
|---|---|---|
| `count` | display | The count and the last press, read from Plugin Storage (`api.storage`) |
| `press` | action | Adds one. Reads the system output volume with `api.builtin.read("macos.output_volume")` and stores the Part the press came from (Action Context) |
| `reset` | action | Clears the count (`api.storage.clear()`) |

- `plugin.json` declares the built-in permission group `system_volume.read`. Plugin Studio lists it under **Built-in Permissions** as used by the script Adapter, not by a feature.
- The Adapter has no connections.

## Try it

1. Plugin Studio ▸ **Import Folder…** and choose this folder. Click **Install**.
2. Select **Press Counter** under **My Plugins**. Read the Adapter and Built-in Permissions sections and click **Review & Approve…**.
3. In Studio, put **Counter Press** on a Single Button, **Counter Reset Count** on another, and **Press Count** on a Data Display. Save and run.
4. Each press adds one. Quit and start InterLayer again: the count is still there.

See [Script Adapter](../../docs/developer-guide/script-adapter.md) for the APIs.
