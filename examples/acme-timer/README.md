# Acme Timer (example Plugin)

A minimal **script** Plugin for the InterLayer Developer Guide. Its Adapter (`adapter/adapter.mjs`) talks to a hypothetical "Acme Timer" app with a local HTTP API on `127.0.0.1`. There is no real Acme Timer app: use this folder as a template.

| Feature | Kind | What it does |
|---|---|---|
| `adjust` | value (relative) | Each step of a Value Slider / Value Dial adds or removes `step_seconds` |
| `remaining` | display | Shows the remaining time as `m:ss` |

The API this example expects:

| Request | Answer |
|---|---|
| `GET /timer` | `{ "remaining_s": 90, "running": true }` |
| `POST /timer/adjust` with `{ "seconds": -30 }` | any JSON |
