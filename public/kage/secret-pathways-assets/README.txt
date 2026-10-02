# secret-pathways-assets

This folder is referenced by `../index.html` (the "Kage" page, served at `/kage`).

The page currently loads a **black screen** because the two files below are missing:

| File | Referenced at | What it provides |
| --- | --- | --- |
| `three.min.js` | line ~1207 | Three.js — the page calls `THREE.*` 291 times |
| `fonts.css` | line ~5 | `@font-face` rules for `Onest`, `NotoJP`, `Wordmark` |

## How to fix

Copy these two files from the original export of this page into this folder:

```
secret-pathways-assets/three.min.js
secret-pathways-assets/fonts.css
```

Nothing else is needed. The ten WebP scene textures load from the public Supabase
CDN and are already resolving correctly.

## Notes

- Do not swap in a different Three.js version from a CDN without testing. The page
  was authored against a specific build, and a version mismatch can cause subtle
  WebGL failures that look like an unrelated bug.
- Verify it works by opening `/kage` and checking the browser console for
  `THREE is not defined` or a 404 on `three.min.js`.