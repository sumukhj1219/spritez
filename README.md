# Claude Spritez

A gallery of 19 interactive, animated pixel-art Claude mascots for the web. Pick a mascot in the gallery, grab the install/import snippet, and drop it into your own React or Next.js app.

The npm package that ships these mascots (`claudesprites`) lives in [`package/sprites`](./package/sprites).

## Project structure

```
app/collection/    Gallery pages, one folder per mascot (ClaudeMascot1 … ClaudeMascot19)
components/        Shared UI: sprite cards, the detail sheet, code blocks, etc.
lib/                Shared types (ClaudeMascotProps, animation states) and utils
store/              Zustand store tracking sprites added to the "active" stage
public/sprites/     Sprite sheets used by the gallery site itself
package/sprites/    The publishable `claudesprites` npm package
```

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the gallery.

## Scripts

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the app

## The `claudesprites` package

Each mascot in the gallery corresponds to a named export (`ClaudeMascot1` … `ClaudeMascot19`) in the `claudesprites` package:

```bash
npm install claudesprites
```

```tsx
import { ClaudeMascot1 } from "claudesprites";
import "claudesprites/styles.css";

<ClaudeMascot1 />;
```

See [`package/sprites/README.md`](./package/sprites/README.md) for the full component list, props, and build instructions.
