# GRT@YMSC static website

This is a dependency-free, bilingual static website. It contains only ordinary HTML, CSS, JavaScript, and SVG files. There is no Jekyll, Ruby, package manager, database, or build step.

## Preview locally

Double-click `index.html`. The site works directly from the extracted folder.

For a more deployment-like preview, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>. Stop the server with `Ctrl+C`.

## Publish on GitHub Pages

1. Create the repository `ymsc-grt/ymsc-grt.github.io`.
2. Upload the **contents** of this folder to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/ (root)`.

No further configuration is needed.

## Edit the site

- `index.html` contains the homepage and short upcoming schedule.
- `seminars.html` contains the complete schedule and abstracts.
- `about.html` contains the group description and organizers.
- `assets/css/style.css` controls appearance.
- `assets/js/language.js` controls the English/中文 selector.
- `assets/js/seminars.js` contains every seminar entry and generates both seminar lists.

Each English block is marked `data-lang-content="en"`; the matching Chinese block is marked `data-lang-content="zh"`. When changing text, update both versions.

## Add or remove a seminar

You only need to edit `assets/js/seminars.js`; the homepage and full schedule update from the same list.

To add a seminar, copy one complete entry inside the `seminars` list, including its opening `{` and closing `},`, and replace its contents. Each entry has short comments and uses ordinary quoted text. Keep these points in mind:

- Give every entry a unique `id` using lowercase letters, numbers, and hyphens. The homepage uses this ID to link directly to the talk on the seminar page.
- Set `homepage: true` to include the entry in the homepage digest. Omit that line to show it only on the full schedule.
- Set `cancelled: true` for a week without a talk.
- `abstractEn` and `abstractZh` are optional. If omitted, no abstract section appears.

To remove a seminar, delete its complete `{ ... },` entry from `assets/js/seminars.js`. To change the order, move the complete entry up or down in the list.

### No-JavaScript fallback

If JavaScript is disabled or fails to load, the site still shows all ordinary page content and a bilingual text-only schedule on `seminars.html`. The nonfunctional language buttons are hidden automatically. The homepage provides a bilingual link to that fallback schedule.

The interactive schedules are maintained in `assets/js/seminars.js`. After changing them, also update the blocks inside `<noscript>...</noscript>` in `seminars.html` so visitors without JavaScript see the current schedule. This fallback is ordinary HTML and can be edited by copying or deleting a complete `<article class="seminar-item">...</article>` block.

The selector remembers the visitor's choice. A link ending in `?lang=zh` opens in Chinese, for example <https://ymsc-grt.github.io/seminars.html?lang=zh>.
