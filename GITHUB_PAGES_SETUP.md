# GitHub Pages Deployment Guide

Your Sponsiwise project is now configured for GitHub Pages deployment using the branch method. Here's how to set it up and deploy:

## Prerequisites
- GitHub account
- Git installed locally
- Node.js 18+ installed

## Step 1: Initialize Git Repository (if not already done)
```bash
cd /Users/sudhanshukumar/Desktop/sponsiwise
git init
git add .
git commit -m "Initial commit: Configure for GitHub Pages deployment"
```

## Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `sponsiwise`
3. Do NOT initialize with README, .gitignore, or license (you already have them locally)

## Step 3: Add Remote and Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/sponsiwise.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Configure GitHub Pages Settings
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions" 
   - The workflow will automatically deploy to gh-pages branch

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)
The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Triggers on push to `main` or `master` branch
- Installs dependencies
- Builds your project
- Deploys to `gh-pages` branch
- Makes it live at `https://YOUR_USERNAME.github.io/sponsiwise/`

Just push your code:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Method 2: Manual Deployment (Local)
```bash
npm install gh-pages --save-dev
npm run deploy
```

This will:
1. Build your project
2. Push the `dist` folder to the `gh-pages` branch
3. GitHub Pages automatically serves it

## Project Configuration
- **Base path**: Set to `/sponsiwise/` in `vite.config.js`
  - Change this if your repository name is different
- **Build output**: `dist/` folder (automatically created on build)

## Verify Deployment
After deployment:
1. Go to your repository Settings → Pages
2. You'll see your site URL (e.g., `https://YOUR_USERNAME.github.io/sponsiwise/`)
3. Click the link to view your live site

## Troubleshooting

### Build fails on GitHub Actions
- Check the Actions tab in your repository for error logs
- Ensure Node modules are properly installed
- Run `npm run build` locally to verify it works

### Site not appearing
- Wait 5-10 minutes after pushing
- Go to Settings → Pages and verify GitHub Pages is enabled
- Check that `gh-pages` branch exists in repository

### Incorrect styling/assets
- This is usually due to incorrect base path
- Update `base: '/sponsiwise/'` in `vite.config.js` to match your repo name
- Rebuild and redeploy

## Future Updates
Every time you push to `main`:
1. GitHub Actions triggers automatically
2. Project builds and deploys to `gh-pages` branch
3. Changes go live within minutes

## Useful Commands
```bash
npm run dev          # Local development
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run deploy       # Manual deploy to gh-pages
npm run lint         # Check code style
npm run test         # Run tests
```

---
**Your site is ready to go!** Push your code and watch it deploy automatically.
