# Quick Start: GitHub Pages Deployment

## What Changed
✅ Added `base: '/sponsiwise/'` to `vite.config.js`
✅ Added `deploy` script to `package.json`
✅ Installed `gh-pages` package
✅ Created GitHub Actions workflow (`.github/workflows/deploy.yml`)
✅ Project builds successfully

## Next Steps (3 commands)

### 1️⃣ Initialize Git
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2️⃣ Create & Push to GitHub
```bash
# Create repo at https://github.com/new
git remote add origin https://github.com/YOUR_USERNAME/sponsiwise.git
git branch -M main
git push -u origin main
```

### 3️⃣ Enable GitHub Pages
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as source
3. Done! 🎉

## Live Site URL
`https://YOUR_USERNAME.github.io/sponsiwise/`

Your site will deploy automatically every time you push!

---
See `GITHUB_PAGES_SETUP.md` for detailed instructions
