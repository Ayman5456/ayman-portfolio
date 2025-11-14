# ayman-portfolio

Apple-inspired single-page portfolio for Ayman Tripathi. Built with Vite, React 19, Tailwind CSS, and Framer Motion.

## Local development

```bash
npm install
npm run dev         # opens http://localhost:5173
npm run build       # output in dist/
```

## Deploying to GitHub Pages

1. Push `main` to `https://github.com/Ayman5456/ayman-portfolio`.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** and select the **“Deploy Vite”** workflow template (it already respects the custom `base` path).
4. Commit the generated workflow file (it lives in `.github/workflows/`), then every push to `main` will rebuild and publish to `https://ayman5456.github.io/ayman-portfolio/`.

If you prefer building locally, run `npm run build` and upload the `dist/` folder to the Pages deployment manually.
