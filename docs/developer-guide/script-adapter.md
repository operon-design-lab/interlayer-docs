# Script Adapter

Use a script Adapter when a declarative one is not enough: an authentication handshake, a custom protocol, combining several requests, or keeping a cache. Your module runs in a **separate, restricted Node.js process** started by InterLayer.

## Files

```
adapter/
├── adapter.json
└── adapter.mjs        (any name matching [A-Za-z0-9_-]+.mjs; more .mjs files are allowed)
```

`adapter.json`:

```json
{
  "format": "interlayer.adapter",
  "schema_version": 1,
  "type": "script",
  "entry": "adapter.mjs",
  "connections": [
    { "id": "timer", "driver": "http", "label": "Acme Timer local API", "url": "http://127.0.0.1:{{plugin.port}}", "timeout_ms": 1500 }
  ],
  "sources": { "timer.state": { "description": "remaining_s, running, text, connected." } },
  "actions": { "timer.adjust": { "description": "Adds parameters.delta (steps) x step_seconds to the countdown." } }
}
```

- `entry` is the module to load (`^[A-Za-z0-9_-]+\.mjs$`, in `adapter/`).
- `connections` work as in a [declarative Adapter](declarative-adapter.md#connections), including `{{plugin.…}}`, `{{global.…}}` and `{{secret.…}}` templates. InterLayer fills them in before your script starts.
- `sources` and `actions` only list ids (with an optional `description`). Only ids listed here are ever called.
- `permissions.secrets` / `permissions.global_secrets` as in [Security](security.md).

## The module

```js
export default function createAdapter(api) {
  return {
    sources: {
      "timer.state": async () => ({ connected: true, text: "1:30" }),
    },
    actions: {
      "timer.adjust": async (parameters) => { /* … */ return { ok: true }; },
    },
    async start() {},   // optional
    stop() {},          // optional
    status() { return {}; }, // optional
  };
}
```

- The default export `createAdapter(api)` may be sync or async. It returns an object with:
  - `sources` — `{ "<source id>": async () => data }`. Return an **object**; the feature's mapping reads fields from it. Return `connected: false` when the app is unreachable (Test Connection treats that as a failure).
  - `actions` — `{ "<action id>": async (parameters) => result }`. `parameters` is the feature's `action.parameters` after templates are filled in; **every value is a string**.
  - `start()` (optional) — awaited before the first call; counts toward the start timeout.
  - `stop()` (optional) — called before the process stops.
  - `status()` (optional) — extra status for Plugin Studio.
- Return values are copied between processes (structured clone): plain data only, no functions.
- To report a failure, `throw new Error("message")`. In an Action, the user sees the Command fail; the error message is kept, custom properties such as `code` are not. In a Source, RUN keeps showing the last good reading.

## The `api` object

| Member | Description |
|---|---|
| `api.pluginId` | Your Plugin id. |
| `api.settings` | Non-secret setting values (stored value, else `default`). |
| `api.secrets.get(key)` | The value of a secret setting listed in `permissions.secrets`. Throws if not granted or not set. |
| `api.secrets.has(key)` | Whether that secret is set. |
| `api.connection(id)` | A connection declared in `adapter.json` (see below). |
| `api.changed(sourceId)` | Tell InterLayer that a Source has new data, so RUN reads it now instead of at the next poll. |
| `api.log(...args)` | Write to the Adapter log. Secret values are masked. |

### HTTP connection

```js
const http = api.connection("timer");
const answer = await http.request({ method: "GET", path: "/timer", query: {}, headers: {}, body: undefined, timeoutMs: 1500 });
```

`request()` returns the parsed JSON answer (or text if the answer is not JSON) and throws on network errors, timeouts and non-2xx statuses. The connection's base URL, `headers` and `auth` are applied for you. `signal` (an `AbortSignal`) is also accepted.

### WebSocket connection

| Method | Description |
|---|---|
| `on("open" \| "message" \| "close", fn)` | Listen; returns an unsubscribe function. |
| `send(objectOrString)` | Send (objects are sent as JSON). Throws `not_connected` when closed. |
| `whenOpen(ms = 1500)` | Resolves `true` when the socket is open within `ms`. |
| `isOpen()`, `status()`, `close()` | State and control. |
| `touch()` | Mark the socket as in use. A socket you only listen on closes after the connection's `idle_ms` unless you call `touch()` or `whenOpen()`. |

## Complete example

[`examples/acme-timer/adapter/adapter.mjs`](../../examples/acme-timer/adapter/adapter.mjs) keeps a cached state, refreshes it every second, calls `api.changed()` when it changes, and answers Source reads from the cache:

```js
export default function createAdapter(api) {
  const http = api.connection("timer");
  const stepSeconds = Number(api.settings.step_seconds) || 10;
  let state = { connected: false, text: "Not connected" };
  let timer = null;
  // … refresh() reads GET /timer, updates `state`, calls api.changed("timer.state") …
  return {
    async start() { await refresh(); timer = setInterval(() => void refresh(), 1000); },
    stop() { clearInterval(timer); },
    sources: { "timer.state": async () => state },
    actions: {
      "timer.adjust": async (parameters) => {
        const steps = Number(parameters.delta); // parameters arrive as text
        if (!Number.isFinite(steps)) throw new Error("No change given.");
        const answer = await http.request({ method: "POST", path: "/timer/adjust", body: { seconds: steps * stepSeconds } });
        await refresh();
        return answer;
      },
    },
  };
}
```

## The sandbox

| | |
|---|---|
| Runtime | Node.js (the Node built into InterLayer), as a child process, with the Node permission model on. |
| File system | Read access to your own `adapter/` files only. **No writing.** |
| Processes | No child processes, no worker threads. |
| Environment | Only `TMPDIR`. |
| Memory | 256 MB heap. |
| Modules | Only your own files in `adapter/` and Node built-ins. There is no `node_modules`: bundle any dependency into your `.mjs` files. |
| Network | Not restricted by InterLayer. Use only the connections you declared (see [Security](security.md)). |
| Integrity | Only the exact files the user approved are loaded. If any file in `adapter/` changes, is added or is removed, the Adapter does not start until it is approved again. |

## Lifecycle and timing

| Event | Behaviour |
|---|---|
| Start | Only when a Command or Data Display first needs the Adapter (never at launch, import or approval). Start timeout **8 s** (including `start()`). |
| Each Source read / Action | Timeout **5 s**. |
| Idle | Stopped after **60 s** without use. |
| Stop | `stop()`, then the process is ended after 1.5 s. |
| Hang | Killed if it stops answering for 15 s, or uses over 90 % of a CPU core for 30 s. |
| Crash | Restarted on the next use after a pause of 2 s, doubling up to 60 s. |

RUN reads Sources every `poll_interval_ms` (600–5000 ms, default 1000) while a Profile that uses them is shown, and stops while RUN is collapsed. Reads that arrive together are shared, and a result is reused for 400 ms. **Keep Source functions fast** — answer from a cache and refresh it in the background, as the example does.
