# Features

Each id in `plugin.json` → `features` needs a file `features/<feature-id>.json`. One feature becomes one Command:

- Command id: `plugin.<plugin id>.<feature id>`
- Command Pack: `plugin-<plugin id>` (read-only, shown as "*<Plugin name>* (Plugin)")

InterLayer generates the Command in memory. Do not write Command files.

> **Keep feature ids stable.** Projects refer to Commands by id. If you rename or remove a feature in an update, Bindings that used it show *Missing Plugin Command*.

## Example

```json
{
  "format": "interlayer.aol",
  "schema_version": 1,
  "id": "brightness",
  "name": "Brightness",
  "host_type": "inner",
  "source": { "data_type": "value", "source_identifier": "lamp.state", "poll_interval_ms": 1000 },
  "mapping": { "rules": [ { "source_field": "brightness", "destination_field": "value" } ] },
  "interaction": {
    "compatible_interactions": ["value_slide", "value_dial"],
    "input_kind": "value",
    "input_parameters": { "min": 0, "max": 100, "step": 5 }
  },
  "action": { "action_identifier": "lamp.set_brightness", "parameters": { "value": "{{value}}" } },
  "command": { "kind": "value", "name": "Lamp Brightness", "format": "{value}%" }
}
```

## Fields

| Field | Required | Meaning |
|---|---|---|
| `format` | yes* | `"interlayer.aol"` |
| `schema_version` | yes* | `1` |
| `id` | yes | Same as the file name (without `.json`). Pattern `^[a-z0-9][a-z0-9_-]{0,63}$`. |
| `name` | yes* | Feature name; the default Command name. Must not be an empty string. |
| `description` | no | Free text. |
| `host_type` | yes* | `"inner"` for every kind except `outer` (which uses `"outer"`). |
| `source` | depends on kind | Where the state comes from. See below. |
| `mapping` | yes, when there is a `source` | How Source data becomes what RUN shows. |
| `interaction` | — | `input_parameters` is used for value features. The other keys are informational. |
| `action` | depends on kind | What to run when the user commits. |
| `command` | yes | The Command kind and its options. |

\* Filled in with the default if missing, but write them out.

### `source`

| Key | Meaning |
|---|---|
| `data_type` | `value` or `collection` (as required by the kind). |
| `source_identifier` | A Source id defined in your `adapter/adapter.json` (or a built-in one covered by [`permissions.builtin`](manifest.md#permissionsbuiltin)). |
| `poll_interval_ms` | How often RUN reads the Source while the Profile is shown. Default `1000`; clamped to 600–5000. |
| `items_path` | Collection only: the path to the list in the Source data. Default `"items"`. |

### `mapping`

`mapping.rules` is a list of rules. **Without rules, RUN shows nothing.**

| Rule key | Meaning |
|---|---|
| `source_field` | Dotted path in the Source data (for collections: in each list item), for example `state.level`. |
| `destination_field` | The field RUN reads (see [Data shapes](#data-shapes)). Required. |
| `transform` | Optional: `none`, `percent` (×100, rounded), `round`, `uppercase`, `truncate_40`, `boolean`, `not`. |
| `fallback` | Optional value used when the source field is missing, empty or not a number. `""` means "leave the field out". |

Later rules overwrite earlier ones with the same `destination_field`.

### `interaction`

| Key | Meaning |
|---|---|
| `input_parameters` | Value features: `min`, `max`, `step`, `wrap`. See [Value features](#value-features). |
| `compatible_interactions` | Informational. Values: `single_button`, `grid_buttons`, `slide_buttons`, `value_slide`, `value_dial`, `dial_select`, `area_radial`, `xy_pad`. Studio decides what fits from `command.kind`, not from this list. Display features may leave it empty (Plugin Studio then shows a harmless warning). |
| `input_kind`, `commit` | Informational. |

### `action`

| Key | Meaning |
|---|---|
| `action_identifier` | An Action id defined in your `adapter/adapter.json` (or a built-in one covered by [`permissions.builtin`](manifest.md#permissionsbuiltin)). |
| `parameters` | Object passed to the Action. String values may contain [templates](#action-templates). |
| `relative_parameters` | Value features with a range only. See [Value features](#value-features). |

The keys `trigger`, `state_write`, `update_mode`, `lifecycle` and `target` may appear in existing files but are **not used** by InterLayer at runtime.

## Kinds

`command.kind` decides what the Command is and where it can be bound.

| Kind | Needs | Users bind it to |
|---|---|---|
| `value` | `source.data_type: "value"`, a Source and an Action | Value Slider, Value Dial, XY Pad (Separate), Data Display |
| `toggle` | `source.data_type: "value"`, a Source and an Action | Single Button (shows On/Off), Data Display; one-shot cell in Grid / Slide Buttons, Dial Select, Area Radial |
| `collection` | `source.data_type: "collection"`, a Source and an Action | Grid / Slide Buttons with Content Source **Auto**, Data Display |
| `display` | `source.data_type: "value"` and a Source. No Action. | Data Display |
| `xy` | An Action using `{{dx}}` and `{{dy}}`. No Source. | XY Pad with Output **Combined** |
| `outer` | `host_type: "outer"` and a Source | Single Button (opens a separate window). Not covered in this guide. |
| `action` | — | Reserved. It is validated but **generates no Command** in this version. Do not use it. |

### `command` options

| Key | Kinds | Meaning |
|---|---|---|
| `kind` | all | See above. Required. |
| `name` | all | Command name. Defaults to the feature `name`. |
| `icon_ref` | all | Default icon, `"<icon pack id>:<icon id>"`. See [Icons](icons.md). |
| `states` | toggle | `{ "off": { "label", "icon_ref" }, "on": { "label", "icon_ref" } }`. Labels default to "*name* Off" / "*name* On". |
| `format` | value, display | Label template, up to 64 characters, for example `"{value} %"`. |
| `lines` | value, display | 1–6 line templates (each up to 64 characters, no newline), for example `["{title}", "{artist}"]`. `{field}` names a `destination_field` of your mapping. A line whose fields are all empty is left out. |
| `layout` | value, display | `stacked` or `inline` (for `lines`). |
| `display` | display | `"image"` shows the mapped `image` field as a picture (see below). |
| `default_input_mode` | value | `absolute` or `relative`: the Mode Studio picks when a **new** Binding is made. A recommendation only; the user can change it. |

## Data shapes

What your mapping should produce for each kind:

| Kind | Fields RUN reads |
|---|---|
| `value` | `value` (number; drawn against `min`/`max`), `label` (text), `muted` (`true` shows "Muted") |
| `toggle` | `value`: `true`, `"true"` or `1` means **on**; any other value means off; missing means unknown |
| `collection` | `items[]`, each `{ id, label, icon, selected }`. `id` is what the Action receives as `{{item.id}}` (if you do not map `id`, items get `item-1`, `item-2`, …). `icon` must be a `data:image/…` URL. Items without an icon show a text tile. |
| `display` | `value` (booleans show On/Off, numbers are rounded to one decimal), or the fields named in `lines`. With `display: "image"`: an `image` field matching `data:image/(png\|jpeg\|gif\|webp);base64,…` |

When the Adapter cannot reach the app, a declarative Source returns its `offline` object plus `connected: false` (see [Declarative Adapter](declarative-adapter.md)), so you can map an "offline" text into a display line.

## Action templates

String values in `action.parameters` (top level only) can contain `{{…}}`. They are replaced before the Action runs. **Every value arrives at the Adapter as a string.**

| Template | Available for | Value |
|---|---|---|
| `{{value}}` | `value` (Absolute) | The new value, clamped to `min`/`max` and on the `step` grid |
| `{{delta}}` | `value` (Relative) | The change: `step` × number of steps, signed |
| `{{item.id}}` | `collection` | The `id` of the chosen item |
| `{{dx}}`, `{{dy}}` | `xy` | The change on each axis since the last request (0 if that axis did not move). X is positive to the right, Y upwards. |

- A `toggle` gets no value: your Action must flip the state itself.
- Unknown names become an empty string. `{{plugin.…}}`, `{{secret.…}}` and `{{global.…}}` do **not** work in feature parameters; use them in Adapter connections instead.
- To send a number to an HTTP API, cast it in the Adapter request: `"{{value|number}}"` (see [Declarative Adapter](declarative-adapter.md#templates)). In a script Adapter, convert with `Number(...)`.

## Value features

**With a range** (`min` and `max` in `interaction.input_parameters`, `min < max`):

- The Command is Absolute: the Action must use `{{value}}`.
- `step` and `wrap` are optional.
- Optional `action.relative_parameters` lets the same feature also take changes in Relative Mode. It must use `{{delta}}` (not `{{value}}`). Absolute Mode runs `parameters`; Relative Mode runs `relative_parameters` without clamping. Use it for values that can go outside the range in the app.

```json
"action": {
  "action_identifier": "acme.set_level",
  "parameters": { "value": "{{value}}", "operation": "set" },
  "relative_parameters": { "value": "{{delta}}", "operation": "change" }
}
```

**Without a range** (neither `min` nor `max`):

- The Command is Relative only: the Action must use `{{delta}}` and not `{{value}}`.
- `step` is required and must be greater than 0.
- `wrap` and `default_input_mode: "absolute"` are errors. Giving only one of `min`/`max` is an error.

Choose: a value with natural ends (volume 0–100) → range. A value without ends (a position, scrolling a timeline) → no range.

## A one-shot button

There is no "action" kind yet. For a stateless button (for example *Next Track*), use `toggle`: give both states the same label and icon, and map no `value`. RUN shows a short press highlight and returns on the next read.

```json
"source": { "data_type": "value", "source_identifier": "player.state" },
"mapping": { "rules": [ { "source_field": "connected", "destination_field": "connected" } ] },
"action": { "action_identifier": "player.next", "parameters": {} },
"command": {
  "kind": "toggle",
  "name": "Next Track",
  "states": { "off": { "label": "Next" }, "on": { "label": "Next" } }
}
```

## XY features

```json
"interaction": { "compatible_interactions": ["xy_pad"], "input_kind": "value", "input_parameters": {} },
"action": { "action_identifier": "acme.orbit", "parameters": { "dx": "{{dx}}", "dy": "{{dy}}" } },
"command": { "kind": "xy", "name": "Acme Orbit" }
```

Both `{{dx}}` and `{{dy}}` are required; `{{value}}` and `{{delta}}` are not allowed. An XY feature has no State. Step sizes come from the user's XY Pad settings.

## Validation behaviour

When InterLayer loads or imports a Plugin, an invalid feature does not block the Plugin: that one feature simply generates no Command, and Plugin Studio shows the problem. Check the Plugin's page after importing.

A feature whose `source_identifier` or `action_identifier` is not defined in your `adapter.json` imports fine but fails when used (`PLUGIN_ACTION_UNAVAILABLE`). Double-check the identifiers.
