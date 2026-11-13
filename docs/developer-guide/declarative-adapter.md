# Declarative Adapter

A declarative Adapter is a single JSON file, `adapter/adapter.json`. No Plugin code runs: InterLayer itself makes the HTTP or WebSocket requests you describe. Prefer it whenever the app has a JSON API.

## Complete example

```json
{
  "format": "interlayer.adapter",
  "schema_version": 1,
  "type": "declarative",
  "connections": [
    {
      "id": "lamp",
      "driver": "http",
      "label": "Acme Lamp local API",
      "url": "http://127.0.0.1:{{plugin.port}}",
      "auth": { "type": "bearer", "token": "{{plugin.token}}" },
      "timeout_ms": 1500
    }
  ],
  "sources": {
    "lamp.state": {
      "description": "The lamp's state: { power, brightness, name }.",
      "connection": "lamp",
      "mode": "poll",
      "request": { "method": "GET", "path": "/api/state" },
      "data_path": "state",
      "offline": { "status_text": "Acme Lamp is not running" }
    }
  },
  "actions": {
    "lamp.toggle_power": {
      "description": "Turns the lamp on or off.",
      "connection": "lamp",
      "request": { "method": "POST", "path": "/api/power/toggle" },
      "ok_path": "ok",
      "error_path": "error"
    },
    "lamp.set_brightness": {
      "description": "Sets the brightness (0-100).",
      "connection": "lamp",
      "request": { "method": "POST", "path": "/api/brightness", "body": { "value": "{{value|number}}" } },
      "ok_path": "ok",
      "error_path": "error"
    }
  },
  "permissions": { "secrets": ["token"] }
}
```

The full Plugin is in [`examples/acme-lamp`](../../examples/acme-lamp/).

## Top level

| Key | Rule |
|---|---|
| `format` | `"interlayer.adapter"` |
| `schema_version` | `1` |
| `type` | `"declarative"` |
| `connections` | Up to 8 connections. |
| `sources` | Object `{ "<source id>": { … } }`, up to 64. |
| `actions` | Object `{ "<action id>": { … } }`, up to 64. |
| `permissions` | `{ "secrets": [...], "global_secrets": [...] }` — see [Security](security.md). |

Source and Action ids: `^[a-z0-9][a-z0-9_.-]{0,95}$`. Every `source_identifier` and `action_identifier` in your features must exist here.

## Connections

| Key | Rule |
|---|---|
| `id` | `^[a-z][a-z0-9_-]{0,31}$`, unique. |
| `driver` | `http` or `websocket`. |
| `url` | Starts with `http://`, `https://`, `ws://` or `wss://`. |
| `label` | Optional. Shown to the user when approving. |
| `headers` | Optional object of extra headers. |
| `protocols` | WebSocket only: optional list of subprotocols. |
| `auth` | Optional: `{ "type": "none" }`, `{ "type": "basic", "username", "password" }`, `{ "type": "bearer", "token" }`, or `{ "type": "header", "header", "value" }`. |
| `timeout_ms` | 200–30000. Default 1500. |
| `idle_ms` | 1000–600000. Default 15000. A long poll or WebSocket that nobody reads for this long is closed. |

Connect only to the app on the user's own Mac (`127.0.0.1` / `localhost`) unless your Plugin clearly needs otherwise. The import preview marks hosts that are not this Mac.

## Sources (HTTP)

| Key | Rule |
|---|---|
| `connection` | A connection id. |
| `mode` | `poll` (default) or `long_poll`. |
| `request` | `{ "method", "path", "query", "headers", "body" }`. `method`: `GET` (default), `POST`, `PUT`, `PATCH`, `DELETE`. `path` must start with a single `/` and contain no spaces. |
| `data_path` | Optional dotted path to the part of the JSON answer to use, for example `"state"`. |
| `offline` | Optional object returned when the app cannot be reached. |
| `description` | Optional. |

What the feature's mapping receives:

- **Online:** the data at `data_path`. If it is an object, you get its fields plus `connected: true`. Any other value arrives as `{ "value": <data>, "connected": true }`.
- **Offline:** your `offline` object plus `connected: false` and `connection_error`. A Source never throws, so map an offline text if you want to show it.

**Long poll** (`mode: "long_poll"`): after a first normal request, InterLayer repeatedly sends `GET <path>?since=<cursor>&wait=<ms>` and waits for the app to answer when something changes. Configure with:

```json
"long_poll": { "cursor_param": "since", "cursor_path": "rev", "wait_param": "wait", "wait_ms": 10000 }
```

`wait_ms` is 1000–60000 (default 10000); the cursor is read from `cursor_path` in each answer. On errors it retries after 0.5–5 s.

## Sources (WebSocket)

For a `websocket` connection, use `mode: "event"`:

```json
"player.state": {
  "connection": "ws",
  "mode": "event",
  "event": { "match_path": "type", "match_value": "state", "subscribe": { "type": "subscribe", "topic": "state" } },
  "data_path": "payload"
}
```

- Only JSON messages are used. A message whose `match_path` equals `match_value` becomes the Source data (at `data_path`).
- `subscribe` is sent each time the socket opens.
- The socket reconnects automatically (1–10 s) while the Source is in use and closes after `idle_ms` without use.

## Actions

| Key | Rule |
|---|---|
| `connection` | A connection id. |
| `request` | HTTP: as for Sources. WebSocket: `{ "message": <JSON to send> }`. |
| `ok_path` | Optional. If the value at this path in the answer is falsy, the Action fails. |
| `error_path` | Optional. The error text to report when `ok_path` fails. |
| `result_path` | Optional. The part of the answer to return. |
| `update_source` | Optional `{ "source", "data_path", "cursor_path" }`: write (part of) the answer into a Source immediately, so RUN updates without waiting for the next poll. |
| `description` | Optional. |

- HTTP Actions time out after `timeout_ms` (at least 3 s). Bodies are sent as JSON. Non-2xx answers and redirects are errors.
- A WebSocket Action only sends; it succeeds with `{ "sent": true }`.

## Templates

| Where | Available templates |
|---|---|
| **Connections** (`url`, `headers`, `auth`) | `{{plugin.<setting key>}}`, `{{global.<NAME>}}`, `{{secret.<NAME>}}` |
| **Action requests** | The feature's action parameters by name, for example `{{value}}`, `{{delta}}`, `{{dx}}`, `{{id}}` |
| **Source requests** | None. Source requests are sent exactly as written. |

- `{{plugin.<key>}}` must be a setting in `plugin.json`. A `secret` setting must also be listed in `permissions.secrets`.
- `{{secret.<NAME>}}` needs `NAME` in `permissions.global_secrets`.
- In an Action request, every `{{name}}` must be a key of the feature's `action.parameters`; otherwise the Action fails. Settings are not available there — put them in the connection.
- Casts: append `|number`, `|boolean` or `|string`, for example `"{{value|number}}"`. When a string is exactly one template, the cast value keeps its type, so `{ "value": "{{value|number}}" }` sends `{ "value": 40 }`.

Example: the feature sends `"parameters": { "value": "{{value}}" }`; the Adapter action uses `"body": { "value": "{{value|number}}" }`.
