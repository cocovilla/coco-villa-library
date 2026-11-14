# Coco Villa Guest Library

A responsive, static guest book-lending catalogue for Coco Villa Unawatuna. Books are complimentary for villa guests; this is not a shop.

## Run locally
Open `index.html` in a browser. No build step, package manager, backend, or database is required. For a local web server, use VS Code Live Server or Python's built-in server.

## Add the supplied book covers
Place your actual cover images in `assets/images/` using these filenames:

- `the-da-vinci-code.jpg`
- `goodnight-mister-tom.jpg`
- `chicken-soup-writers-soul.jpg`
- `questions-of-travel.jpg`
- `wild.jpg`
- `the-kite-runner.jpg`
- `eat-pray-love.jpg`
- `one-hundred-years-of-solitude.jpg`

The site uses `object-fit: contain` to preserve cover proportions. If an image is missing or its filename is incorrect, a tasteful text placeholder appears instead. Use JPG, PNG, or WebP if preferred; update the matching `image` value in `js/books.js`.

## Add, edit, or remove books
All catalogue entries are in `js/books.js` in the `window.BOOKS` array. Each object has:
- `id`: unique, URL-safe identifier
- `title`
- `author`
- `category`: use one of the six categories configured in `js/script.js`
- `image`: path relative to the project root
- `description`

To add a book, copy an object, give it a unique `id`, update its details, and add its image file. To remove a book, delete its object. No changes to `index.html` are needed.

## Change the WhatsApp number
Open `js/script.js` and update the `WHATSAPP_NUMBER` constant near the top. Use international format without `+`, spaces, or punctuation. For a Sri Lankan number, use country code `94` and omit the leading local `0` (example format: `94771234567`). Replace the example placeholder before publishing.

The request opens WhatsApp with a pre-filled message. Guests must manually review and send it; the site does not send messages automatically.

## Deploy free with GitHub Pages
1. Create a GitHub repository, for example `coco-villa-library`.
2. Upload the contents of this project folder (not the outer ZIP) to the repository root.
3. Commit and push the files.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)` folder, then save.
7. Wait for GitHub Pages to publish and open the URL shown in the Pages settings.

All internal asset links are relative, so the site works from a GitHub Pages project URL as well as a custom domain.

## Before publishing
- Add and verify all eight real book cover images.
- Confirm titles and author spellings against the physical covers.
- Replace `947XXXXXXXX` with Coco Villa's WhatsApp number.
- Test search, category filters, combined filtering, modal close behavior, and the WhatsApp message on desktop and mobile.

## Project structure
```text
coco-villa-library/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── books.js
│   └── script.js
├── assets/
│   └── images/
└── README.md
```
