# ClaudeSpritez

ClaudeSpritez is a collection of interactive, animated pixel-art Claude mascots for the web. Each mascot idles on the page, walks to wherever the visitor clicks, and reacts when the cursor comes near or clicks on it.

The project has three parts:

| Part | Location | Description |
| --- | --- | --- |
| Gallery website | repository root | A Next.js site for browsing all 20 mascots and copying the code to use them. |
| npm package | [`package/sprites`](./package/sprites) | `claudesprites`, the React components that render the mascots in your own app. |
| Chrome extension | [`extension`](./extension) | Places a mascot on every page you visit. |

> ClaudeSpritez is an independent, unofficial project. It is not affiliated with, sponsored by, or endorsed by Anthropic. "Claude" is a trademark of Anthropic.

## Using the mascots in your app

Install the package:

```bash
npm install claudesprites
```

Import the stylesheet once, near the root of your app, then render any mascot:

```tsx
import { ClaudeMascot1 } from "claudesprites";
import "claudesprites/styles.css";

export default function Page() {
  return <ClaudeMascot1 />;
}
```

The stylesheet is required. Without it the mascot renders at zero size and is not visible.

In a Next.js App Router project, import the stylesheet in `app/layout.tsx`. The components already include the `"use client"` directive, so they can be rendered from Server Components.

See the [package README](./package/sprites/README.md) for the full list of mascots, the available props, and configuration examples.

## Running the website locally

Requirements: Node.js 20.9 or later and npm.

```bash
git clone https://github.com/sumukhj1219/spritez.git
cd spritez
npm install
npm run dev
```

The site is then available at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | In production | The public URL of the site, for example `https://example.com`. Used for canonical URLs, Open Graph images, and the sitemap. On Vercel, the production URL is used when this is not set. |

## Installing the Chrome extension

The extension is not yet published to the Chrome Web Store. To install it from source:

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked** and choose the `extension` folder from this repository.

Use the extension's popup to turn the mascot on or off and to choose which mascot appears.

## Project structure

```
app/                  Next.js App Router pages, layout, 404 page, robots and sitemap
app/collection/       One folder per mascot component, plus the gallery grid and its config
components/common/    Sprite cards, the detail sheet, code blocks and the 404 page
components/core/      Page heading and the animated cloud background
components/motion/    Animation helpers built on framer-motion
components/ui/        Base UI components (button, badge, sheet)
lib/                  SEO configuration, shared types, fonts and utilities
store/                Zustand store for the mascot shown on the gallery page
public/sprites/       Sprite sheets used by the website and the package
package/sprites/      Source of the claudesprites npm package
extension/            Source of the Chrome extension
```

## Technology

- [Next.js](https://nextjs.org) 16 with the App Router, and React 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [framer-motion](https://motion.dev) for interface animation
- [three.js](https://threejs.org) for the cloud background shader
- [shiki](https://shiki.style) for code highlighting
- [Vite](https://vite.dev) for building the npm package

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository and create a branch for your change.
2. Run `npm run lint` and `npm run build` to make sure the project still builds.
3. Open a pull request that describes what the change does and why.

For larger changes, such as adding new mascots or changing the package API, please open an issue first to discuss the approach.

## License

Released under the MIT License.
