# Installation

InterLayer is distributed as a disk image (`.dmg`) for macOS.

## System requirements

- A Mac with Apple Silicon (M1 or later). There is no Intel build.
- macOS 26 or later.
- Optional: an iPad that supports Sidecar, if you want to use the iPad as a touch panel.

InterLayer works with a mouse or trackpad alone. An iPad is not required.

## Download

Download the beta from the official site: <https://inter-layer.app/#download>

The file is named like `InterLayer-<version>-arm64.dmg`, for example `InterLayer-0.1.0-beta.1-arm64.dmg`.

## Install

1. Open the downloaded `.dmg` file.
2. Drag **InterLayer** onto the **Applications** folder shown in the window.
3. Eject the disk image.
4. Open InterLayer from your Applications folder.

The first time you open it, macOS asks: *"InterLayer" is an app downloaded from the Internet. Are you sure you want to open it?* Click **Open**.

## Update

InterLayer checks for a new version a few seconds after it starts. If one is available, you see a macOS notification once. You can also check at any time with **InterLayer ▸ Check for Updates…** in the menu bar.

InterLayer never downloads or installs updates by itself. To update:

1. Quit InterLayer.
2. Download the new `.dmg` from the official site.
3. Drag the new InterLayer onto the Applications folder and choose **Replace**.

Your Projects, Packs, Designs, Plugins and settings are kept. They are stored outside the app (see [Data locations](../user-guide/data-locations.md)).

## Uninstall

1. Quit InterLayer.
2. Move `/Applications/InterLayer.app` to the Trash.
3. Optional: to remove your Library and settings too, move `~/Library/Application Support/InterLayer` to the Trash. Your Project folders are wherever you saved them; they are not removed.

Next: [First launch](first-launch.md)
