# Security

## The approval model

- A Plugin's **Adapter does not run until the user approves it** in Plugin Studio (**Review & Approve…**). The approval dialog shows the connections (URLs), the secrets the Adapter receives, and a content hash.
- The approval covers a hash of every file in `adapter/` and `bridge/`, plus the `settings`, `requires` and `permissions` of `plugin.json`. Changing any of these requires a new approval. Importing a Plugin (including an update) always clears its approval.
- Before every start and every use, InterLayer checks: the Plugin is installed, valid and enabled; `adapter.json` is valid; the approval matches the current files; required settings are filled in.
- Without approval, the Plugin's Commands still appear in the Library, but they fail when used.

## Built-in permissions

A Plugin can use some of InterLayer's own macOS capabilities (system volume, running apps, the Music app) only through the permission groups it declares in [`permissions.builtin`](manifest.md#permissionsbuiltin).

- The user sees the requested groups, split into **Read** and **Control**, in the Import preview and in the approval dialog, and approves them in Plugin Studio's **Built-in Permissions** section (together with the Adapter, if there is one).
- A Plugin with no `adapter/` that declares built-in permissions must be approved too.
- InterLayer checks the declaration and the approval every time a feature reads or runs a built-in Source or Action — for overlay states, Commands, Plugin windows and previews. Anything not declared, not approved, or not available to Plugins is refused, and only the affected feature stops.
- Changing the declaration (for example in an update) requires a new approval. Editing a feature cannot reach anything beyond the approved groups.
- Built-in capabilities that belong to InterLayer's own Plugins (for example quitting apps, window control, audio devices) are not available to other Plugins.

## Secrets

- Settings of type `secret` and Global Secrets are stored in the **macOS Keychain**, never in plain-text files. Exported Plugins never contain them.
- An Adapter receives only the secrets it declares:
  - `permissions.secrets`: your own `secret` settings (by `key`).
  - `permissions.global_secrets`: Global Secrets set by the user in **Variables & Secrets…** (by `NAME`, pattern `^[A-Za-z][A-Za-z0-9_]{0,63}$`).
- `api.log()` masks secret values.

## What the script sandbox does and does not do

A script Adapter runs in its own process with the Node permission model: it cannot write files, start processes or read files outside its `adapter/` folder, and it sees only `TMPDIR` in its environment.

It is **not** an operating-system sandbox, and **network access is not restricted**. Users must trust the author of a Plugin they approve.

## Rules for Plugin authors

1. Connect only to the app on the user's Mac (`127.0.0.1` / `localhost`) and only through connections declared in `adapter.json`. Do not send data anywhere else.
2. Request only the secrets you need. Never log, return or store secret values.
3. Request only the built-in permission groups your features use, and prefer read groups when you do not need to change anything.
4. Prefer a declarative Adapter. Use a script Adapter only when needed, and keep it small and readable — users may review it before approving.
5. Do not include binaries, installers or archives (archives are refused anyway). Anything the user must install into the target app goes in `bridge/`, with clear `setup` instructions.
6. Keep ids stable across versions (Plugin id, feature ids, icon ids), so users' Projects keep working after an update.
7. Document in your README what the Plugin connects to and why.
