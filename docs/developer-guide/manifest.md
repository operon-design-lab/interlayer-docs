# Manifest (`plugin.json`)

There is no JSON Schema file; InterLayer validates the manifest when it loads or imports the Plugin. Unknown keys are kept and ignored.

```json
{
  "format": "interlayer.plugin",
  "schema_version": 1,
  "id": "acme-lamp",
  "name": "Acme Lamp",
  "version": "0.1.0",
  "description": "Power, brightness and status of the Acme Lamp app's local HTTP API.",
  "requires": { "interlayer": ">=0.1.0", "application": "Acme Lamp 2.x with its local API enabled" },
  "features": ["power", "brightness", "status"],
  "settings": [
    { "key": "port", "type": "number", "label": "Port", "default": 8765 },
    { "key": "token", "type": "secret", "label": "API token" }
  ],
  "setup": [
    { "type": "instructions", "title": "Turn on the local API", "text": "In Acme Lamp: Settings > Local API > Enable." },
    { "type": "settings", "title": "Enter the port and the token" },
    { "type": "approve", "title": "Review the Adapter" },
    { "type": "test", "title": "Test the connection", "source": "lamp.state" }
  ]
}
```

## Keys

| Key | Required | Rule |
|---|---|---|
| `format` | yes | Exactly `"interlayer.plugin"`. |
| `schema_version` | yes | `1`. A higher number is refused as "newer". |
| `id` | yes | `^[a-z0-9][a-z0-9_-]{0,63}$`. Must not be the id of a built-in Plugin (`macos-system`, `sample-apple-music`). The folder name should match it. |
| `name` | yes | Non-empty string. Shown to users. |
| `version` | yes | Non-empty string. Use semantic versioning (`1.2.0`); the format is not checked. |
| `features` | yes | Array of 1–64 unique feature ids (same pattern as `id`). Each needs `features/<id>.json`. |
| `description` | no | Free text. |
| `settings` | no | Up to 32 settings. See below. |
| `setup` | no | Up to 16 setup steps. See below. |
| `requires` | no | Object. See below. |
| `permissions` | no | Object with `builtin`: the built-in permission groups your features use. See below. |

## `settings`

Settings are values the user fills in on the Plugin's page in Plugin Studio. Your Adapter's connections can use them (see [Templates](declarative-adapter.md#templates)).

| Field | Rule |
|---|---|
| `key` | `^[a-z][a-z0-9_]{0,63}$`, unique. |
| `type` | `string`, `number`, `boolean` or `secret`. |
| `label` | Shown to the user. Defaults to `key`. |
| `description` | Optional help text. |
| `default` | Optional. Must be a finite number for `number`, `true`/`false` for `boolean`. **Not allowed for `secret`.** |

- There are no "required", choice-list or placeholder fields.
- An unset setting reads as its `default`, else `false` (boolean), `null` (number) or `""` (string).
- If a connection uses a non-secret setting that is empty, the Adapter does not start (`missing_settings`).
- `secret` values are stored in the macOS Keychain. To use one, the Adapter must list it in `permissions.secrets` (see [Security](security.md)).
- Do not put `{{…}}` templates inside `settings` or `setup`; they are not resolved there.

## `setup`

Optional steps shown in order on the Plugin's page, to guide the user through installation.

| Field | Rule |
|---|---|
| `type` | `instructions`, `settings`, `approve` or `test`. |
| `title` | Short heading. |
| `text` | Body text (up to 4000 characters). |
| `files` | Optional list of files in your package to show (paths under `bridge/` or `assets/`, for example `bridge/acme_addon.py`). The user gets **Show in Finder** for them. |
| `source` | `test` steps only: the Source id to read. Empty means the first Source. |

What each type shows:

- `instructions` — your text (and files).
- `settings` — a reminder to fill in the settings.
- `approve` — the current approval status.
- `test` — a **Test Connection** button that reads the Source. A Source result with `connected: false` counts as a failure.

## `requires`

| Key | Rule |
|---|---|
| `interlayer` | String, for example `">=0.1.0"`. **Informational only** — it is not enforced in this version. |
| `icon_packs` | Array (up to 64) of Icon Pack ids your features use that are *not* bundled in your `icons/` folder. A missing Pack is a warning, not an error. Do not list your own `plugin-<id>`. See [Icons](icons.md). |
| `application` | Free text by convention, for example `"Acme Lamp 2.x"`. Not read by InterLayer; useful for users. |

There is no way to declare a dependency on another Plugin or on a Command Pack.

## `permissions.builtin`

Besides your own Adapter, a feature can use a few of InterLayer's **built-in** Sources and Actions on the user's Mac. It can do so only when your Plugin declares the matching **permission group** and the user approves it.

```json
"permissions": { "builtin": ["system_volume.read", "system_volume.control"] }
```

| Group | Access | Lets a feature use |
|---|---|---|
| `system_volume.read` | read | Source `macos.output_volume`: the system output volume and mute state |
| `system_volume.control` | control | Actions `volume.set` (parameter `value`, 0–100) and `volume.toggle_mute` |
| `running_apps.read` | read | Source `macos.running_apps`: the running apps (names, icons, which one is in front) |
| `app.activate` | control | Action `app.activate` (parameter `bundle_id`): bring a running app to the front |
| `music.read` | read | Source `music.player`: the Music app's player state and current track |
| `music.control` | control | Actions `music.play_pause`, `music.next_track`, `music.previous_track`, `music.set_position`, `music.toggle_shuffle`, `music.set_repeat`, `music.set_volume` |

- **Read** groups only show information on the overlay. **Control** groups change something on the Mac when the user uses one of your Parts. A feature that shows a state and changes it needs both (for example `system_volume.read` and `system_volume.control`).
- Declare only what your features use. Unknown group names, duplicates and any other key under `permissions` are errors; an invalid declaration grants nothing.
- The declaration is part of the approved content: users approve it in Plugin Studio (also when your Plugin has no `adapter/`), and any change to it requires a new approval. See [Security](security.md#built-in-permissions).
- A feature whose built-in Source or Action is not covered by a declared and approved group does not run (`PLUGIN_PERMISSION_DENIED`). Your other features keep working.
- Built-in Sources and Actions that are not in this table cannot be used by your Plugin, even if you know their names.
- The `music.*` groups make macOS ask the user for Automation permission for the Music app on first use.
