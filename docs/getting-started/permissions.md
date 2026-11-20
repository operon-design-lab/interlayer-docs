# macOS permissions

InterLayer asks for a permission only when a feature needs it, not at startup.

| Permission | When it is needed | When macOS asks |
|---|---|---|
| **Accessibility** | Sending keyboard shortcuts, mouse clicks and scrolls, media keys and text from Commands. Window controls of the macOS System Plugin. After 0.1.0-beta.1: bringing back a minimized window from Running Apps / Launch App. | The first time such a Command runs. |
| **Automation** (Apple Events) | Controlling the Music app with the Apple Music Plugin. | The first time a Music feature is used. |
| **Notifications** | The "new version available" notice. | Optional. If you refuse, InterLayer simply does not show the notice. |
| **Keychain** | Storing secrets that Plugins use (for example a password for a local app). | Used by Plugins that declare secrets. |

InterLayer does not use the camera, microphone, screen recording, location or Bluetooth.

## Accessibility

1. Run a Command that sends a key (for example a button from the **Keyboard** or **macOS Shortcuts** Pack).
2. macOS shows its Accessibility prompt. RUN collapses so you can see it.
3. Click **Open System Settings**, then turn on **InterLayer** under **Privacy & Security ▸ Accessibility**.
4. Tap the collapsed RUN icon to show the overlay again.

You do not need to restart InterLayer. The next key Command works.

If you refuse, the Command does not run. Later attempts show a notice in RUN:

> "*Command*" did not run. InterLayer is not allowed to send keys. Allow it in System Settings > Privacy & Security > Accessibility.

**Tip:** if you only used mouse Commands after allowing access, run one key Command (or restart InterLayer) so the permission is picked up.

**Tip:** if InterLayer is already listed and turned on but keys still do not work (for example after replacing the app with a different build), select InterLayer in the list, remove it with **−**, and add it again with **+**.

## Automation (Music)

The Apple Music Plugin controls the Music app. The first time you use one of its features, macOS asks whether InterLayer may control **Music**. Click **Allow**.

If you refused, InterLayer reports:

> InterLayer is not allowed to control Music. Allow it in System Settings › Privacy & Security › Automation.

Turn on **Music** under **InterLayer** in that settings pane.

Next: [Basic operation](basic-operation.md)
