# 🌱 Botanic Defenders - Complete Deployment Guide

## Overview
This guide walks you through deploying Botanic Defenders to **Vercel** (recommended for both frontend and backend) or **Render.com**.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Get Your API Keys](#get-your-api-keys)
3. [Option 1: Deploy to Vercel (Recommended)](#option-1-deploy-to-vercel-recommended)
4. [Option 2: Deploy to Render.com](#option-2-deploy-to-rendercom)
5. [Testing Your Deployment](#testing-your-deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, you'll need:

1. **GitHub Account** - [Sign up free at github.com](https://github.com)
2. **Vercel Account** - [Sign up free at vercel.com](https://vercel.com) (or [render.com](https://render.com) for Render)
3. **Google Gemini API Key** - [Get free key at makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---

## Get Your API Keys

### 1. Google Gemini API Key

1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key
4. Save it somewhere safe (you'll need it for backend deployment)

⚠️ **IMPORTANT**: Never share your API key publicly or commit it to GitHub!

---

# Option 1: Deploy to Vercel (Recommended)

## Step 1: Push Your Code to GitHub

### For Backend:

```bash
# In your local machine, create a new directory for the backend
cd ~/Desktop
mkdir botanic-defenders-backend
cd botanic-defenders-backend

# Initialize git
git init

# Copy backend files (from your project)
# You should have these files:
# - api/index.py (main backend code)
# - main.py (alternative entry point)
# - requirements.txt
# - vercel.json

# Adding a .gitignore
cat > .gitignore << 'EOF'
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
ENV/
env/
.venv
*.egg-info/
dist/
build/
.env
.env.local
nodes_modules/
EOF

git add .
git commit -m "Initial commit: Botanic Defenders Backend"
git remote add origin https://github.com/YOUR_USERNAME/botanic-defenders-backend
git branch -M main
git push -u origin main
```

### For Frontend:

```bash
# In your local machine, create a new directory for the frontend
cd ~/Desktop
mkdir botanic-defenders-frontend
cd botanic-defenders-frontend

# Initialize git
git init

# Copy frontend files (all files from frontend folder in your project)

# Add .gitignore (already exists in frontend, but add these if not present)
cat >> .gitignore << 'EOF'
.next/
node_modules/
.env.local
.env*.local
EOF

git add .
git commit -m "Initial commit: Botanic Defenders Frontend"
git remote add origin https://github.com/YOUR_USERNAME/botanic-defenders-frontend
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste your backend GitHub repo URL and click **"Continue"**
5. Configure the project:
   - **Project Name**: `botanic-defenders-backend`
   - **Framework**: Select **"Other"** (Vercel auto-detects Python)
   - **Root Directory**: `./` (default)
   - **Build Command**: (leave empty, auto-detected)
   - **Install Command**: `pip install -r requirements.txt`

6. **IMPORTANT**: Add Environment Variables:
   - Click **"Environment Variables"**
   - Add: `GEMINI_API_KEY` = `your_api_key_from_step_1`
   - Add: `FRONTEND_URL` = (leave for now, update after frontend deployment)

7. Click **"Deploy"** and wait for completion

8. **Save your backend URL** (looks like `https://botanic-defenders-backend.vercel.app`)

## Step 3: Deploy Frontend to Vercel

1. In Vercel Dashboard: Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Paste your frontend GitHub repo URL and click **"Continue"**
4. Configure the project:
   - **Project Name**: `botanic-defenders-frontend`
   - **Framework**: Select **"Next.js"** (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install --legacy-peer-deps`

5. **IMPORTANT**: Add Environment Variables:
   - Click **"Environment Variables"**
   - Add: `BACKEND_URL` = `https://botanic-defenders-backend.vercel.app` (from Step 2)

6. Click **"Deploy"** and wait for completion

7. **Your frontend is now live!** (URL will be provided, e.g., `https://botanic-defenders-frontend.vercel.app`)

## Step 4: Update Backend with Frontend URL (Optional)

If you want CORS protection (recommended for production):

1. Go to your backend project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Add/Update: `FRONTEND_URL` = `https://botanic-defenders-frontend.vercel.app`
4. Click **"Save"** → **"Redeploy"**

---

# Option 2: Deploy to Render.com

## Step 1: Push Code to GitHub
(Same as Option 1 steps above)

## Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy an existing Git repository"**
4. Paste your backend GitHub repo URL
5. Configure:
   - **Name**: `botanic-defenders-backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api.index:app --host 0.0.0.0 --port 8000`

6. **Add Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `FRONTEND_URL`: (update after frontend deployment)

7. Choose plan (Free tier available) and create service
8. **Save your backend URL** (provided by Render, e.g., `https://botanic-defenders-backend.onrender.com`)

## Step 3: Deploy Frontend to Render

1. Click **"New +"** → **"Static Site"** (or Web Service for Next.js)
2. Select your frontend GitHub repo
3. Configure:
   - **Name**: `botanic-defenders-frontend`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `.next` (for Next.js)

4. **Add Environment Variables**:
   - `BACKEND_URL`: `https://botanic-defenders-backend.onrender.com` (from Step 2)

5. Choose plan and deploy
6. **Your frontend is now live!**

---

## Testing Your Deployment

### Test Backend Health Check
```bash
curl https://botanic-defenders-backend.vercel.app/health
# Should return: {"status":"healthy","model_loaded":true/false}

curl https://botanic-defenders-backend.vercel.app/
# Should return: {"message":"Plant Disease Identification API","status":"running"}
```

### Test Full Application
1. Open your frontend URL in browser
2. Login with any email/password (demo mode)
3. Navigate to **Plant Health** page
4. Try uploading a plant image
5. Verify you get disease predictions and treatment recommendations

---

## Troubleshooting

### "Backend connection failed" error
- ✅ Check that `BACKEND_URL` environment variable is set in frontend
- ✅ Ensure backend deployment is complete and healthy
- ✅ Verify CORS settings in backend (should allow frontend URL)
- ✅ Check browser console for actual error message

### "Model not loaded" or "No module named 'torch'"
- ✅ Verify all dependencies in `requirements.txt`
- ✅ Check Python version compatibility (3.8+)
- ✅ For Vercel: May need to increase RAM limit in build settings
- ⚠️ Large ML models may need extended deployment timeout

### "GEMINI_API_KEY not set"
- ✅ Go to backend deployment settings in Vercel/Render
- ✅ Add/verify `GEMINI_API_KEY` environment variable
- ✅ Redeploy the backend
- ✅ Check your API key is valid at [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### Build fails with "pip install" errors
- ✅ Ensure `requirements.txt` exists in backend root
- ✅ Try increasing memory allocation in Vercel settings
- ✅ Check for incompatible package versions for your Python version
- ✅ May need to use `--legacy-peer-deps` flag

### "Port already in use" errors
- ✅ Vercel/Render automatically assign ports
- ✅ Never hardcode port numbers in production code
- ✅ Use `PORT` environment variable: `int(os.getenv("PORT", 8000))`

### Frontend shows blank page or 404
- ✅ Check build logs in Vercel/Render dashboard
- ✅ Ensure `package.json` exists with all required scripts
- ✅ Try clearing browser cache and hard refresh (Ctrl+Shift+R)
- ✅ Check that `npm run build` completes successfully locally

---

## Production Best Practices

### Security
- ✅ Never commit API keys to GitHub (use environment variables)
- ✅ Use `.gitignore` to exclude `.env` files
- ✅ Rotate API keys regularly
- ✅ Enable Vercel/Render's security features

### Performance
- ✅ Enable caching on frontend images and assets
- ✅ Use CDN for static files (Vercel/Render do this automatically)
- ✅ Monitor backend API response times
- ✅ Consider adding rate limiting for API endpoints

### Monitoring
- ✅ Check deployment logs regularly
- ✅ Set up error notifications
- ✅ Monitor API health checks
- ✅ Keep dependencies up to date (security patches)

---

## Quick Reference

| Component | Vercel | Render |
|-----------|--------|--------|
| Frontend | Next.js | Static Site / Web Service |
| Backend | Python (FastAPI) | Python (Gunicorn/Uvicorn) |
| Free Tier | Yes | Yes |
| Preview URLs | Yes | Yes |
| Auto Deploy | On push | On push |
| Custom Domain | Yes | Yes |

---

## Next Steps

1. ✅ Deploy both backend and frontend
2. ✅ Test the application
3. ✅ Add custom domain (optional)
4. ✅ Set up monitoring/alerts
5. ✅ Share your deployed app!

---

For more help:
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **FastAPI Docs**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **Next.js Docs**: [nextjs.org](https://nextjs.org)
