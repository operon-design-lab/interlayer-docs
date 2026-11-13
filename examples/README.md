# Example Plugins

Minimal, complete Plugins written for the [Developer Guide](../docs/developer-guide/README.md). Both target hypothetical apps ("Acme Lamp", "Acme Timer") with a local HTTP API on `127.0.0.1`; use them as templates.

| Example | Adapter | Shows |
|---|---|---|
| [`acme-lamp`](acme-lamp/) | declarative (JSON only) | toggle, ranged value, multi-line display, settings, a Keychain secret, setup steps |
| [`acme-timer`](acme-timer/) | script (`adapter.mjs`) | relative value (`{{delta}}`), display, cached state with `api.changed()` |

To try one: Plugin Studio ▸ **Import Folder…** and choose the example folder. Without a matching app running, the Commands install but report the app as offline.
