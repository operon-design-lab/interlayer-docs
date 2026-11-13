# Acme Lamp (example Plugin)

A minimal **declarative** Plugin for the InterLayer Developer Guide. It talks to a hypothetical "Acme Lamp" app that serves a local HTTP API on `127.0.0.1`. There is no real Acme Lamp app: use this folder as a template.

| Feature | Kind | What it does |
|---|---|---|
| `power` | toggle | Shows On / Off and toggles the lamp |
| `brightness` | value | Sets the brightness (0–100) from a Value Slider / Value Dial |
| `status` | display | Shows the lamp name, brightness and an offline message |

The API this example expects:

| Request | Answer |
|---|---|
| `GET /api/state` | `{ "state": { "power": true, "brightness": 40, "name": "Desk" } }` |
| `POST /api/power/toggle` | `{ "ok": true }` or `{ "ok": false, "error": "…" }` |
| `POST /api/brightness` with `{ "value": 40 }` | `{ "ok": true }` |

All requests carry `Authorization: Bearer <token>`.
