# Notes on the World — XU XIN Photography Portfolio

A responsive React + TypeScript + Vite photography portfolio for XU XIN, featuring GSAP scroll reveals, subtle parallax, three independent photo collections, and an immersive image viewer.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). To create a production build:

```bash
npm run build
npm run preview
```

## Add your own photographs

Put image files into one of these folders:

- `public/images/landscapes/`
- `public/images/botanical/`
- `public/images/urban/`

JPEG, PNG, and WebP are recommended. Use web-sized images (roughly 1600–2400 px on the long edge for large photographs) to keep the site responsive.

Then open `src/data/photos.ts`. Each collection contains a `photos` array. Replace a demo `src` URL with the path to your own file. For example, if you copy `mountain-evening.jpg` into `public/images/landscapes/`, set:

```ts
{
  id: 'landscape-evening',
  src: '/images/landscapes/mountain-evening.jpg',
  alt: 'A mountain ridge in the evening light',
  layout: 'panoramic',
}
```

Add another object to the relevant `photos` array to add a photograph. Remove an object to remove a photograph. Reorder objects to change the browsing order. The image viewer's next/previous controls update automatically. You do not need to change the page layout or GSAP code.

### Layout options

- `featured`: large opening image in a series
- `portrait`: portrait-oriented image
- `landscape`: standard landscape image
- `square`: square image
- `panoramic`: wide image

The gallery uses these preferences to arrange images. Keep `alt` descriptive for accessibility; alt text is not displayed as a caption.

## Personalise the site

- The opening cover uses **Notes on the World** as the main title, with **XU XIN** as the secondary signature. The cover uses floating, low-saturation pastel dots and gentle GSAP motion.
- The contact email is `isxuxin10@163.com` and is configured in `src/App.tsx`.
- The visual system uses a fresh, low-saturation light palette. The main title uses Outfit, with Caveat handwriting-style accents and Manrope for readable interface text. System sans-serif fallbacks are included.
- Edit the short About text in `src/App.tsx`.
- Adjust colors, typography, spacing, and responsive layouts in `src/styles.css`.
- The HTML document declares UTF-8 encoding in `index.html`. Keep source files saved as UTF-8 when editing text. Use normal characters rather than pasting HTML-escaped strings such as `&amp;` into visible copy.

## Custom domain and ICP filing considerations

This is a static-friendly front-end site and can be deployed to a static hosting service that supports custom domains. The final domain has not been selected, so no canonical domain or DNS settings have been hardcoded.

If you intend to serve the public website from a server located in mainland China, check the current ICP filing requirements with the hosting provider before launch. The Ministry of Industry and Information Technology explains that non-commercial internet information services must complete the relevant filing before opening the website; the filing is generally handled through the access/hosting provider and the official MIIT filing system: https://beian.miit.gov.cn/ . Hosting outside mainland China may follow a different filing situation, so choose the hosting region based on your intended audience and confirm the requirements with the provider. Domain registration alone does not complete an ICP filing.

For future deployment, the typical sequence is: choose and register a domain, choose a hosting provider and region, complete any required filing before public launch, build the site with `npm run build`, deploy the generated `dist` folder, and configure the domain's DNS/HTTPS through the provider. Do not add a fabricated ICP number or filing badge; only display one after an actual filing has been approved and an official number has been issued.

## Notes

- The included demo photos load from Unsplash URLs and therefore require an internet connection. Replace these URLs with your own local image paths for a self-contained gallery.
- This version uses a simple local-file workflow. It does not include a browser upload dashboard or a server-side content management system.
- The site respects `prefers-reduced-motion`, supports keyboard navigation in the image viewer (Escape and arrow keys), and includes touch-friendly controls on mobile.


## Current visual direction

The cover uses a large “Notes on the World” headline, with “XU XIN” as the smaller photographer signature. The visual palette is monochrome (white, black, and grey), with a large sans-serif display face and restrained GSAP reveal motion. Decorative floating dots and pastel gradients have been removed.
