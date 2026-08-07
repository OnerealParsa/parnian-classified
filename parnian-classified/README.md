# PARNIAN // CLASSIFIED

A static, cinematic birthday microsite for Parnian's 19th birthday.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Static output is generated in `out/`.

## GitHub Pages

This project is configured for GitHub Pages and a repository named `parnian-classified`.

Expected URL:

`https://USERNAME.github.io/parnian-classified/`

The app uses a dynamic `basePath` so assets work correctly under the repository subpath.

## Image Replacement

Replace these files with Parnian's actual images:

- `public/images/photo1.jpg`
- `public/images/photo2.jpg`
- `public/images/photo3.jpg`

No React code changes are required.

## Deployment

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.
It builds the static export and deploys the `out/` directory to GitHub Pages on pushes to `main`.

## Custom Domain

If you want to use a custom domain, configure it in GitHub Pages settings and update the repository Pages settings as needed. The site is still safe to run under the repository subpath when no custom domain is configured.
