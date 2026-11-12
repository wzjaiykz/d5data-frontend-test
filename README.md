# Resume Upload — Front-end Test

A pixel-conscious implementation of the "Upload Your Resume" screen from the
provided Figma file: a two-column layout with copy and an illustration on the
left, and an upload card on the right (dashed drop zone, two buttons, step dots).

## Live preview

https://wzjaiykz.github.io/d5data-frontend-test/

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Tech choices

- **Vue 3 + Vite** — the screen owns real state (selected file, drag state,
  validation errors), so a component boundary keeps it readable.
- **No UI library** — the screen is two buttons, one dashed area and a heading.
  Hand-written CSS reproduces the design more faithfully and avoids fighting a
  library's default styles.

## Design fidelity

- Colours, spacing, radii and shadows live in CSS custom properties in
  `src/styles/main.css`, so the whole page can be re-themed from one place.
- Type scale is derived from the 1440-wide frame: heading 28px, body 13px,
  card title 18px.
- Drop zone: 1.5px dashed border, tinted background, cloud icon, and three
  distinct states (idle, dragover, file selected).

## Interactions

| Behaviour | Implementation |
|---|---|
| Click the drop zone | Opens the hidden `input[type=file]` via `label for`, so it also works with the keyboard |
| Drag and drop | Highlights (`--dragging`) while a file is over the zone, reads it on drop |
| Validation | Accepts `.pdf` / `.doc` / `.docx` only, rejects files over 10 MB with an inline message |
| File name | Shown after selection, truncated with ellipsis, removable |
| Button states | `Finish` is disabled until a file is selected; both buttons have hover and active states |

## Responsive behaviour

- `> 900px`: two columns side by side
- `≤ 900px`: stacks vertically, copy and illustration centred

## Known differences

- The illustration in `src/assets/illustration.svg` is a placeholder; the final
  version should use the asset exported from the design file.
- There is no backend upload call — the task only asks for the front-end.
