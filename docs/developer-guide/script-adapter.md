# Script Adapter

Use a script Adapter when a declarative one is not enough: an authentication handshake, a custom protocol, combining several requests, keeping state, or reading InterLayer's built-in Sources from code. Your module runs in a **separate, restricted Node.js process** started by InterLayer.

> **Availability.** `api.storage`, `api.builtin`, the Action Context (the second argument of an Action) and the error `.code` values below are **new after 0.1.0-beta.1 and not in that build**. Everything else on this page is in 0.1.0-beta.1.

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
- `connections` work as in a [declarative Adapter](declarative-adapter.md#connections), including `{{plugin.…}}`, `{{global.…}}` and `{{secret.…}}` templates. InterLayer fills them in before your script starts. A script that needs no other app has `"connections": []`.
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
      "timer.adjust": async (parameters, context) => { /* … */ return { ok: true }; },
    },
    async start() {},   // optional
    stop() {},          // optional
    status() { return {}; }, // optional
  };
}
```

- The default export `createAdapter(api)` may be sync or async. It returns an object with:
  - `sources` — `{ "<source id>": async () => data }`. Return an **object**; the feature's mapping reads fields from it. Return `connected: false` when the app is unreachable (Test Connection treats that as a failure).
  - `actions` — `{ "<action id>": async (parameters, context) => result }`. `parameters` is the feature's `action.parameters` after templates are filled in; **every value is a string**. `context` is the [Action Context](#the-action-context) (new); an Action that ignores it keeps working.
  - `start()` (optional) — awaited before the first call; counts toward the start timeout.
  - `stop()` (optional) — called before the process stops.
  - `status()` (optional) — extra status for Plugin Studio.
- Return values are copied between processes (structured clone): plain data only, no functions, **at most 4 MB**. A larger or uncopyable result fails that one read or Action; the process keeps running.
- To report a failure, `throw new Error("message")`. In an Action, the user sees the Command fail; the error message is kept, custom properties such as `code` are not. In a Source, RUN keeps showing the last good reading. Neither stops RUN or other Plugins.

## The `api` object

| Member | Description |
|---|---|
| `api.pluginId` | Your Plugin id. |
| `api.settings` | Non-secret setting values (stored value, else `default`). |
| `api.secrets.get(key)` | The value of a secret setting listed in `permissions.secrets`. Throws if not granted or not set. |
| `api.secrets.has(key)` | Whether that secret is set. |
| `api.connection(id)` | A connection declared in `adapter.json` (see below). |
| `api.changed(sourceId)` | Tell InterLayer that a Source has new data, so RUN reads it now instead of at the next poll. |
| `api.log(...args)` | Write to the Adapter log. Secret values are masked. At most 100 lines per 10 seconds; extra lines are dropped and counted. |
| `api.storage` | Your Plugin's own key / value store: `get`, `set`, `delete`, `clear`, `keys`. See [Plugin Storage](#plugin-storage-apistorage). **New.** |
| `api.builtin` | InterLayer's built-in Sources and Actions under your declared permissions: `read`, `run`. See [Built-in calls](#built-in-calls-apibuiltin). **New.** |

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

## The Action Context

*New after 0.1.0-beta.1.* An Action receives a second argument that describes this run. It is frozen (read-only), and its `version` is `1`:

```js
{
  version: 1,
  plugin_id: "press-counter",
  feature_id: "press",
  action_id: "counter.press",
  kind: "action",                 // the feature's command kind
  trigger: "command",             // "window" for a button in an outer feature's window
  at: "2026-11-20T09:30:00.000Z", // when the run started
  input: {},                      // what the Interaction delivered: { value } | { delta } | { dx, dy } | { item_id } | { choice_id, element }
  origin: { profile_id, layer_id, binding_id, part_id, zone_id } // the Part it came from; each id is null when unknown
}
```

```js
export default function createAdapter(api) {
  return {
    sources: {},
    actions: {
      async "counter.press"(parameters, context) {
        api.log(`pressed on ${context.origin.part_id ?? "an unknown Part"} at ${context.at}`);
        return { ok: true };
      },
    },
  };
}
```

The context carries only these ids and the input that was delivered. It never includes the front app, window titles or anything typed in other apps. A declarative Adapter does not receive it.

## Plugin Storage: `api.storage`

*New after 0.1.0-beta.1.* A small JSON key / value store of your own. InterLayer keeps it outside your Plugin folder.

```js
const count = (await api.storage.get("count")) ?? 0;    // undefined when the key is not set
await api.storage.set("count", count + 1);
await api.storage.set("last", { at: context.at, part: context.origin.part_id });
await api.storage.delete("last");                       // -> true if the key was there
const keys = await api.storage.keys();                  // sorted
await api.storage.clear();
```

| | |
|---|---|
| Keys | 1–128 characters: letters, digits, `_ . : -`, starting with a letter or digit. |
| Values | JSON data only: `null`, `true` / `false`, finite numbers, strings, arrays and plain objects, nested at most 16 levels. Not `undefined` (use `delete`), `NaN`, dates, maps, class instances or functions. |
| Limits | 256 KB for the whole store, 1024 keys. A write that would exceed either fails and writes nothing. |
| Kept | When the Adapter stops (idle, crash, quit), when InterLayer restarts, and when the Plugin is updated or replaced by an Import with the same id. |
| Removed | Removing the Plugin moves its store to the Plugins folder's `.trash/` (kept, not erased). |
| Never exported | An Export never contains the store; an Import never brings one. |
| Location | `~/Library/Application Support/InterLayer/plugins/.plugin-storage/<plugin id>.json` |

- **Not for secrets.** Values are plain text on disk. Use a `secret` setting (Keychain) for tokens and passwords.
- Every call is a request to InterLayer: `await` it, and do not call it in a tight loop.
- If the file is damaged, reads and writes fail with `storage_unreadable`. `clear()` sets the damaged file aside and starts an empty store.

## Built-in calls: `api.builtin`

*New after 0.1.0-beta.1.* Read InterLayer's built-in Sources and run its built-in Actions from your script, under the permission groups your `plugin.json` declares and the user approved. The ids, parameters and groups are listed in [Built-in Sources and Actions](built-in-api.md).

```js
// plugin.json: "permissions": { "builtin": ["system_volume.read", "apps.control"] }
export default function createAdapter(api) {
  return {
    sources: {
      async "mac.volume"() {
        const { volume, muted } = await api.builtin.read("macos.output_volume");   // read: allowed anywhere
        return { value: Math.round(volume * 100), muted };
      },
    },
    actions: {
      async "notes.open"() {
        return api.builtin.run("app.launch", { bundle_id: "com.apple.Notes" });   // run: inside an Action only
      },
    },
  };
}
```

- `read(sourceId)` works anywhere: in a Source, an Action, `start()`.
- `run(actionId, parameters = {})` works **only while one of your Actions is running**. A change to the Mac follows a person's action; a Source read, a preview or `start()` never changes anything. Elsewhere it fails with `builtin_run_outside_action`.
- `parameters` must be a plain object of JSON data, at most 16 KB. An answer larger than 4 MB is refused. A built-in call has 8 seconds.
- A built-in call never reaches a Plugin's own Adapter, so it cannot call back into your script.
- Declaring a group only for your script is fine: Plugin Studio notes that no feature uses it directly.

## Errors

`api.storage` and `api.builtin` reject with an `Error` whose `.code` says why (new after 0.1.0-beta.1). Handle the ones you expect:

```js
let volume = null;
try {
  volume = (await api.builtin.read("macos.output_volume")).volume;
} catch (error) {
  if (error.code === "builtin_permission_denied") api.log(`needs ${error.permission ?? error.reason}`);
  else throw error;
}
```

| `.code` | Meaning |
|---|---|
| `storage_invalid_key` / `storage_invalid_value` | The key or value breaks the [storage rules](#plugin-storage-apistorage). |
| `storage_quota` | 256 KB or 1024 keys would be exceeded; nothing was written. |
| `storage_unreadable` | The store file is damaged; `clear()` sets it aside and starts empty. |
| `builtin_permission_denied` | `.reason`: `not_declared` (`.permission` names the missing group), `not_approved`, `stale` (approve again), `owner_only`, `unlisted`, `invalid`, `not_installed`. |
| `builtin_unknown` | There is no built-in Source / Action with this id. |
| `builtin_invalid` | A malformed id, or parameters that are not a plain JSON object within 16 KB. |
| `builtin_run_outside_action` | `run` was called while none of your Actions was running. |
| `builtin_timeout` / `builtin_result_too_large` / `builtin_failed` | The built-in did not answer in 8 s / answered more than 4 MB / failed (the message says why, for example a missing macOS permission). |
| `host_timeout` / `host_busy` | InterLayer did not answer in 10 s / more than 16 requests were open at once. |
| `adapter_stopped` | The Adapter was stopping. |

## Complete examples

- [`examples/press-counter`](../../examples/press-counter/) (new after 0.1.0-beta.1): no connections; `api.storage`, `api.builtin.read`, the Action Context and two `action` features.
- [`examples/acme-timer`](../../examples/acme-timer/adapter/adapter.mjs): keeps a cached state, refreshes it every second, calls `api.changed()` when it changes, and answers Source reads from the cache:

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
| File system | Read access to your own `adapter/` files only. **No writing.** Use `api.storage` to keep data. |
| Processes | No child processes, no worker threads. |
| Environment | Only `TMPDIR`. |
| Memory | 256 MB heap. |
| Modules | Only your own files in `adapter/` and Node built-ins. There is no `node_modules`: bundle any dependency into your `.mjs` files. |
| Network | Not restricted by InterLayer. Use only the connections you declared (see [Security](security.md)). |
| Integrity | Only the exact files the user approved are loaded. If any file in `adapter/` changes, is added or is removed, the Adapter does not start until it is approved again. |

## Lifecycle and timing

| Event | Behaviour |
|---|---|
| Start | Only for an enabled, approved Plugin, and only when something needs the Adapter: a State shown in RUN, an Action, Plugin Studio's preview or Test Connection. Never at launch, import or approval. Start timeout **8 s** (including `start()`). |
| Each Source read / Action | Timeout **5 s**. |
| Idle | Stopped after **60 s** without use. Keep nothing important in memory; use `api.storage`. |
| Stop | Also on disable, remove, update, Revoke, a settings change and when InterLayer quits. `stop()` is called, then the process is ended after 1.5 s. |
| Hang | Killed if it stops answering for 15 s, or uses over 90 % of a CPU core for 30 s. |
| Crash or failed start | Started again on the next use after a pause of 2 s, doubling up to 60 s. |
| Log | `api.log` keeps at most 100 lines per 10 s. |

RUN reads Sources every `poll_interval_ms` (600–5000 ms, default 1000) while a Profile that uses them is shown, and stops while RUN is collapsed. Reads that arrive together are shared, and a result is reused for 400 ms. **Keep Source functions fast** — answer from a cache and refresh it in the background, as the acme-timer example does.
