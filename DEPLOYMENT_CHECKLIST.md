# 🚀 Botanic Defenders - Pre-Deployment Checklist

## Backend Checks ✅

- [ ] **API Key Security**
  - [ ] No hardcoded API keys in code
  - [ ] `.env.example` file created
  - [ ] `GEMINI_API_KEY` will be set as environment variable
  - [ ] Backend gracefully handles missing API key

- [ ] **Backend Configuration**
  - [ ] `vercel.json` properly configured with `api/index.py`
  - [ ] CORS configured for production
  - [ ] `main.py` and `api/index.py` are in sync
  - [ ] All imports in `requirements.txt`
  - [ ] Python 3.8+ compatible

- [ ] **Error Handling**
  - [ ] API returns proper error messages
  - [ ] `/health` endpoint exists
  - [ ] Model loading errors handled gracefully
  - [ ] Gemini API errors have fallback responses

- [ ] **Local Testing**
  - [ ] Backend runs locally on port 8002: `python main.py`
  - [ ] `/` endpoint returns message
  - [ ] `/health` endpoint returns status
  - [ ] `/predict` endpoint accepts image upload
  - [ ] CORS headers present in responses

---

## Frontend Checks ✅

- [ ] **Environment Configuration**
  - [ ] `.env.local` has `BACKEND_URL=http://localhost:8002` for local dev
  - [ ] `.env.example` file created for reference
  - [ ] No hardcoded API keys in frontend code
  - [ ] `BACKEND_URL` can be injected via environment variables

- [ ] **Build Configuration**
  - [ ] `vercel.json` properly configured
  - [ ] `package.json` has all npm scripts (dev, build, start)
  - [ ] `npm run build` works locally
  - [ ] Build output directories correct

- [ ] **API Routes**
  - [ ] `/api/plant-health/predict` route exists
  - [ ] Route uses `BACKEND_URL` environment variable
  - [ ] Proper error handling and logging
  - [ ] Form data properly sent to backend

- [ ] **Local Testing**
  - [ ] Frontend runs locally: `npm run dev`
  - [ ] Frontend accessible at `http://localhost:3000`
  - [ ] Can navigate to Plant Health page
  - [ ] Can upload image (with backend running)
  - [ ] Disease detection works and shows results

---

## Deployment Preparation ✅

- [ ] **GitHub Setup**
  - [ ] Backend code in separate GitHub repo
  - [ ] Frontend code in separate GitHub repo
  - [ ] `.gitignore` files proper (exclude `.env`, `node_modules`, `__pycache__`)
  - [ ] README.md files present in both repos
  - [ ] Latest code pushed to main branch

- [ ] **API Keys Ready**
  - [ ] Google Gemini API key obtained and saved securely
  - [ ] Gemini API key has quota/free tier available
  - [ ] Know where to access API key when needed

- [ ] **Account Setup**
  - [ ] Vercel account created (or Render account)
  - [ ] GitHub connected to Vercel/Render
  - [ ] Can see repositories in deployment dashboard

---

## Deployment Steps ✅

### Option 1: Vercel Deployment

**Backend:**
- [ ] Create Vercel project from backend GitHub repo
- [ ] Framework: "Other"
- [ ] Install Command: `pip install -r requirements.txt`
- [ ] Build Command: (auto-detected)
- [ ] Add env var: `GEMINI_API_KEY=<your_key>`
- [ ] Deploy and note URL: `https://___backend___.vercel.app`

**Frontend:**
- [ ] Create Vercel project from frontend GitHub repo
- [ ] Framework: "Next.js" (auto-detected)
- [ ] Install Command: `npm install --legacy-peer-deps`
- [ ] Add env var: `BACKEND_URL=<backend_url_from_above>`
- [ ] Deploy and note URL: `https://___frontend___.vercel.app`

**Post-Deployment (Optional):**
- [ ] Update backend env var: `FRONTEND_URL=<frontend_url>`
- [ ] Redeploy backend for CORS update

---

### Option 2: Render Deployment

**Backend:**
- [ ] Create Render Web Service from backend GitHub repo
- [ ] Runtime: Python 3
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `uvicorn api.index:app --host 0.0.0.0 --port 8000`
- [ ] Add env var: `GEMINI_API_KEY=<your_key>`
- [ ] Deploy and note URL: `https://__backend__.onrender.com`

**Frontend:**
- [ ] Create Render Static Site from frontend GitHub repo
- [ ] Build Command: `npm install --legacy-peer-deps && npm run build`
- [ ] Publish Directory: `.next`
- [ ] Add env var: `BACKEND_URL=<backend_url_from_above>`
- [ ] Deploy and note URL: `https://__frontend__.onrender.com`

---

## Post-Deployment Testing ✅

- [ ] **Backend is Running**
  - [ ] Visit `https://backend-url/` → Should see API message
  - [ ] Visit `https://backend-url/health` → Should see healthy status
  - [ ] Check deployment logs for errors

- [ ] **Frontend is Running**
  - [ ] Visit `https://frontend-url/` → Should load without errors
  - [ ] Check browser console for errors
  - [ ] Check network tab - verify requests to backend

- [ ] **End-to-End Test**
  - [ ] Login to app (any email/password in demo mode)
  - [ ] Navigate to Plant Health page
  - [ ] Upload a plant image
  - [ ] Should see disease predictions
  - [ ] Should see treatment recommendations (if API key configured)
  - [ ] Check backend logs for API calls

- [ ] **Error Testing**
  - [ ] Try uploading non-image file → Should get error
  - [ ] Turn off backend → Frontend should show error gracefully
  - [ ] Monitor for any console errors

---

## Troubleshooting During Deployment

| Issue | Solution |
|-------|----------|
| "Module not found" | Check requirements.txt has all dependencies |
| "Port already in use" | Vercel/Render assigns ports automatically |
| "Backend connection failed" | Check BACKEND_URL env var is correct |
| "Build timeout" | Increase timeout in platform settings or optimize build |
| "Out of memory" | Increase RAM in deployment settings |
| "CORS error" | Verify frontend URL in backend CORS settings |

---

## Maintenance & Updates

After deployment:

- [ ] Monitor platform dashboards for errors
- [ ] Check deployment logs regularly
- [ ] Update dependencies monthly for security
- [ ] Test new code locally before pushing
- [ ] Keep API key secure

---

✅ **Ready to Deploy!**

Follow the deployment guide: [DEPLOYMENT_COMPLETE_GUIDE.md](./DEPLOYMENT_COMPLETE_GUIDE.md)

---
