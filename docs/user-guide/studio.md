# Studio

Studio (window title *Overlay Studio*) is the editor. Open it from the RUN Menu ▸ **Open Studio**. It opens the Project RUN is running.

## Layout of the window

| Area | Contents |
|---|---|
| **Header** | **Open in Design Studio**, **New**, **Open**, **Settings** (Workspace name and the defaults new Profiles start from), the Project folder name, **Save**, **Run**. |
| **Left column** | **Profiles** (↑ ↓ to reorder, **＋** for *New Profile…* / *Import Profile…*) and **Layers** (↑ ↓, **＋**). The gear on the selected row opens its properties. |
| **Center** | **Workspace** view: **Preview** (the Surface with its Parts), **Commands** (the Command Browser), or **Split** (both). |
| **Right column (Inspector)** | Edit mode: **Binding**, **Layout** or **Command**. |

## Saving

- **Save** (header) saves the Project: Profiles, Layers, Layouts and Bindings.
- **Save Command** (Command Editor) saves a Command into its Pack. It is separate from Project Save.
- Pack Manager changes are saved immediately.
- Studio asks before discarding unsaved changes.
- **Run** shows the saved Project in RUN. Save first.

## Create or open a Project

- **New**: enter a **Name**, choose a **Default Size** (5:3 · 800 × 480, 16:9 · 1280 × 720, 16:10 · 1280 × 800, 4:3 · 1024 × 768, 3:2 · 1080 × 720, 1:1 · 800 × 800), choose a **Default Design**, click **Choose Folder…**, then **Create**.
- **Open**: choose an existing Project folder.

A Project is a folder. There is no single-file export of a whole Project, but you can export single Profiles (see [Import and Export](import-export.md)).

## Edit modes

- **Edit: Layout** — add, move, resize and delete Parts. See [Profiles, Layers and Layout](profiles-layers-layout.md).
- **Edit: Binding** — choose what a Part does. See [Parts and Interactions](parts-and-interactions.md).
- **Edit: Command** — create and edit Commands. See [Commands](commands.md).
