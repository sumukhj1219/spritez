# claudesprites 🐾

Interactive, animated pixel-art Claude mascot sprites for React and Next.js apps. Drop one (or several) onto a page and it idles, walks to wherever you click, and reacts when you hover or click on it.

## Features

- 🚀 **Next.js Ready:** bundled with `"use client"` directive preservation.
- ⚡ **Lightweight:** built with Vite/Rollup, no runtime dependencies beyond React.
- 🎭 **19 mascots:** every variant from the Claude Sprites gallery is exported as its own component.
- 🛠️ **TypeScript Powered:** full type definitions included out of the box.

## Installation

```bash
npm install claudesprites
# or
yarn add claudesprites
# or
pnpm add claudesprites
```

## Usage

```tsx
import { ClaudeMascot1 } from "claudesprites";
import "claudesprites/styles.css";

export default function Page() {
  return <ClaudeMascot1 />;
}
```

Each mascot is a fixed-position element that follows its own animation loop, so you generally render it once near the root of your app (e.g. in a layout).

## Mascots

Every mascot shares the same props and animation states, they only differ in art style. Import whichever ones you want by name:

| Component        | Label      | Component         | Label     |
| ----------------- | ---------- | ------------------ | --------- |
| `ClaudeMascot1`   | Thinker    | `ClaudeMascot11`   | Cowboy    |
| `ClaudeMascot2`   | Sage       | `ClaudeMascot12`   | Grandpa   |
| `ClaudeMascot3`   | Magician   | `ClaudeMascot13`   | Shocked   |
| `ClaudeMascot4`   | Footballer | `ClaudeMascot14`   | Partier   |
| `ClaudeMascot5`   | Programmer | `ClaudeMascot15`   | Dreamer   |
| `ClaudeMascot6`   | Lazy       | `ClaudeMascot16`   | Rockstar  |
| `ClaudeMascot7`   | Fighter    | `ClaudeMascot17`   | Curious   |
| `ClaudeMascot8`   | Crazy      | `ClaudeMascot18`   | Luffy     |
| `ClaudeMascot9`   | Grump      | `ClaudeMascot19`   | Excited   |
| `ClaudeMascot10`  | Boxer      |                     |           |

## Props

```ts
interface ClaudeMascotProps {
  initialX?: number;      // default 100
  initialY?: number;      // default 100
  size?: number;          // scale factor, default 1
  hoverRange?: number;    // px radius that triggers onHoverNear, default 50
  damageRange?: number;   // reserved for future hit-detection, default 20
  actions?: {
    onClickStage?: "idle" | "walk" | "hit" | "touch" | "exercise";
    onClickSprite?: "idle" | "walk" | "hit" | "touch" | "exercise";
    onHoverNear?: "idle" | "walk" | "hit" | "touch" | "exercise";
  };
}
```

By default, clicking anywhere on the page makes the mascot walk there, clicking the mascot itself triggers its "hit" animation, and moving the cursor near it triggers "touch".

```tsx
<ClaudeMascot5
  initialX={200}
  initialY={300}
  size={1.5}
  actions={{ onClickStage: "walk", onClickSprite: "touch" }}
/>
```

## Development

```bash
npm install
npm run build
```

Builds `src/index.ts` with Vite into `dist/` (ESM + CJS + type declarations + a single `styles.css`).
