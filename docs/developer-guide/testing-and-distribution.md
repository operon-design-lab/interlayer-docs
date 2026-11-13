# Testing and distribution

## Install your Plugin while developing

1. Open Plugin Studio: RUN Menu (or the **InterLayer** menu) ▸ **Developer ▸ Open Plugin Studio**.
2. Click **Import Folder…** and choose your Plugin folder (or **Import…** for a `.interlayer-plugin` / `.zip` file).
3. Read the preview: features and Command ids, Adapter type and files, connections, settings, secrets and warnings. Errors are listed here.
4. Click **Install**. To update a Plugin you already installed, tick *Replace the installed Plugin* and click **Replace**. The old copy is kept in the Plugins folder's `.trash/`.
5. Select the Plugin under **My Plugins**:
   - Check that it is **Enabled** and that every feature is listed without errors. (An invalid feature does not block the Plugin; it just generates no Command.)
   - Fill in **Settings** and save secrets to the Keychain.
   - Check **Built-in Permissions**: no missing groups, and no features listed as not running.
   - Click **Review & Approve…** (in the **Adapter** section, or in **Built-in Permissions** for a Plugin without an Adapter).
   - Use **Test Connection** (in the setup steps, if you defined a `test` step).
6. In Studio, bind your Commands (Pack "*<Plugin name>* (Plugin)") to Parts, **Save** and **Run**, and try them with the real app.

Every re-import clears the approval, so approve again after each change.

> Installed Plugins live in `~/Library/Application Support/InterLayer/plugins/`. Always install through **Import**, which runs all package checks; do not copy folders there by hand.

## Checklist

- [ ] `plugin.json` id is unique and matches the folder name.
- [ ] Every feature in `features` has a file, and every file is listed.
- [ ] Every `source_identifier` / `action_identifier` exists in `adapter.json`, or is a built-in one whose group is in `permissions.builtin`.
- [ ] Every feature with a Source has `mapping.rules`.
- [ ] Value features: range → `{{value}}`; no range → `step` and `{{delta}}`.
- [ ] Action request templates name only keys of the feature's `action.parameters`.
- [ ] Sources return `connected: false` (or have an `offline` object) when the app is not running.
- [ ] No hidden files, symlinks or archives in the folder.
- [ ] Tested with the app running, not running, and restarted.

## When something fails

In RUN, any failed Plugin Command shows the notice *"\<Command\>" did not run. It could not be run.* Look at Plugin Studio for details (the Adapter section shows the state and the last error).

Common causes:

| Error code | Cause |
|---|---|
| `PLUGIN_NOT_INSTALLED` | The Plugin is not installed, disabled, or that feature is invalid. |
| `PLUGIN_ADAPTER_NOT_APPROVED` / `PLUGIN_ADAPTER_STALE` | The Adapter is not approved, or its files changed since approval. |
| `PLUGIN_ADAPTER_MISSING_SETTINGS` | A setting used in a connection is empty. |
| `PLUGIN_ADAPTER_START_FAILED` / `PLUGIN_ADAPTER_CRASHED` | The script failed to start or crashed (InterLayer waits before retrying). |
| `PLUGIN_ADAPTER_ERROR` | A script Action threw an error. |
| `PLUGIN_ACTION_UNAVAILABLE` | The feature's `action_identifier` is not defined. |
| `PLUGIN_PERMISSION_DENIED` | The feature uses a built-in Source / Action whose permission group is not declared or not approved, or that is not available to Plugins. RUN says: *Its Plugin does not have the permission it needs.* |
| `PLUGIN_ACTION_FAILED` | The request failed (app not running, timeout, non-2xx status, `ok_path` false, unknown template). |
| `PLUGIN_DISPLAY_ONLY` | A display feature has no Action. |
| `PLUGIN_VALUE_MODE` | Relative input on a ranged feature without `relative_parameters`. |

A failed Source read keeps the last value on screen.

## Distribute

1. In Plugin Studio, select your Plugin and click **Export…**. This writes a `.interlayer-plugin` file (a ZIP with `plugin.json` at its root). Setting values, secrets and approval are never included.
2. Publish the file with a README that says which app and version it supports, what it connects to, and how to set it up.
3. Users install it with Plugin Studio ▸ **Import…** and approve it themselves.

Versioning:

- Raise `version` in `plugin.json` for each release.
- Do not remove or rename published feature ids or icon ids. The update preview warns users about removed features and icons that their Projects use.

Plugins are never bundled in exported Profiles (`.olprofile`); a Profile that uses your Plugin lists it under *Plugins required*.
