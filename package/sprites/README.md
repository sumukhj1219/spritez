# claudesprites

React components for interactive, animated pixel-art Claude mascots. A mascot idles on the page, walks to wherever the visitor clicks, and reacts when the cursor comes near or clicks on it.

> This is an independent, unofficial project. It is not affiliated with, sponsored by, or endorsed by Anthropic. "Claude" is a trademark of Anthropic.

## Features

- 20 mascots, each exported as its own component.
- Works with React 18 and 19, including the Next.js App Router. Every component file includes the `"use client"` directive.
- No runtime dependencies other than React.
- TypeScript type definitions are included.
- Tree-shakeable: bundlers include only the mascots you import.

## Installation

```bash
npm install claudesprites
```

The package also works with Yarn (`yarn add claudesprites`) and pnpm (`pnpm add claudesprites`).

## Usage

Import the stylesheet once, near the root of your app, then render a mascot:

```tsx
import { ClaudeMascot1 } from "claudesprites";
import "claudesprites/styles.css";

export default function Page() {
  return <ClaudeMascot1 />;
}
```

The stylesheet is required. Without it the mascot renders at zero size and is not visible.

Where to import the stylesheet:

| Framework | File |
| --- | --- |
| Next.js App Router | `app/layout.tsx` |
| Next.js Pages Router | `pages/_app.tsx` |
| Vite or Create React App | `src/main.tsx` or `src/index.tsx` |

Each mascot is positioned with `position: fixed` and listens for clicks on the whole page, so render it once, typically in a layout component.

## Mascots

All mascots share the same props and behavior and differ only in their artwork.

| Component | Name | Component | Name |
| --- | --- | --- | --- |
| `ClaudeMascot1` | Thinker | `ClaudeMascot11` | Cowboy |
| `ClaudeMascot2` | Sage | `ClaudeMascot12` | Grandpa |
| `ClaudeMascot3` | Magician | `ClaudeMascot13` | Shocked |
| `ClaudeMascot4` | Footballer | `ClaudeMascot14` | Partier |
| `ClaudeMascot5` | Programmer | `ClaudeMascot15` | Dreamer |
| `ClaudeMascot6` | Lazy | `ClaudeMascot16` | Rockstar |
| `ClaudeMascot7` | Fighter | `ClaudeMascot17` | Curious |
| `ClaudeMascot8` | Crazy | `ClaudeMascot18` | Luffy |
| `ClaudeMascot9` | Grump | `ClaudeMascot19` | Excited |
| `ClaudeMascot10` | Boxer | `ClaudeMascot20` | Swimmer |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialX` | `number` | `100` | Starting distance from the left edge of the viewport, in pixels. |
| `initialY` | `number` | `100` | Starting distance from the top edge of the viewport, in pixels. |
| `size` | `number` | `1` | Scale factor. The mascot is 64 by 64 pixels at a size of `1`. |
| `hoverRange` | `number` | `50` | Distance in pixels at which the cursor triggers `onHoverNear`. |
| `damageRange` | `number` | `20` | Reserved for future use. |
| `actions` | `ClaudeMascotActions` | see below | Which animation plays in response to each interaction. |

### Actions

| Action | Default | Triggered when |
| --- | --- | --- |
| `onClickStage` | `"walk"` | The visitor clicks anywhere on the page. With `"walk"`, the mascot walks to the clicked point. |
| `onClickSprite` | `"hit"` | The visitor clicks the mascot. |
| `onHoverNear` | `"touch"` | The cursor comes within `hoverRange` of the mascot. |

Each action accepts one of the animation states `"idle"`, `"walk"`, `"hit"`, `"touch"` or `"exercise"`. The `"exercise"` animation is currently available only for `ClaudeMascot1`.

Unspecified actions keep their defaults:

```tsx
<ClaudeMascot5
  initialX={200}
  initialY={300}
  size={1.5}
  actions={{ onClickSprite: "touch" }}
/>
```

## Types

The package exports the following types and values:

- `ClaudeMascotProps`: the props shared by every mascot component.
- `ClaudeMascotActions`: the shape of the `actions` prop.
- `ClaudeMascotAnimationStates`: the union of animation state names.
- `defaultActions`: the default value of `actions`.
- `SPRITE_SHEET_URLS`: the URL of each mascot's sprite sheet, keyed by mascot number.

## How the sprite sheets are loaded

The sprite sheets are not bundled with the package. Each component loads its sprite sheet from a CDN at runtime, using the URLs in `SPRITE_SHEET_URLS`. Each sheet is a PNG of roughly 9 KB.

## Development

From this directory:

```bash
npm install
npm run build
```

The build writes ES modules, CommonJS modules, type declarations and a single `claudesprites.css` file to `dist/`.

### Updating the sprite sheets

The source sprite sheets live in `public/sprites/` at the repository root. To upload them to Cloudinary and regenerate `src/sprite-urls.ts`, add your credentials to `package/sprites/.env`:

```bash
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

Then run:

```bash
npm run upload-sprites
```

The `.env` file is ignored by Git. `npm publish` refuses to run while `src/sprite-urls.ts` contains placeholder URLs.

## License

Released under the MIT License.
