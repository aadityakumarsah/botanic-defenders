# 🌱 Botanic Defenders - Quick Deployment Reference

## 60-Second Quick Start

### 1️⃣ Prepare Code
```bash
# Backend: Make sure no API keys are hardcoded
grep -r "AIzaSy" backend/  # Should return nothing

# Frontend: Make sure BACKEND_URL uses environment variables
grep -r "localhost:8002" frontend/app  # Should only be in comments/examples
```

### 2️⃣ Push to GitHub
```bash
# Backend repo
cd backend
git init
git add .
git commit -m "Botanic Defenders Backend"
git remote add origin https://github.com/YOUR_USERNAME/botanic-defenders-backend
git push -u origin main

# Frontend repo
cd ../frontend
git init
git add .
git commit -m "Botanic Defenders Frontend"
git remote add origin https://github.com/YOUR_USERNAME/botanic-defenders-frontend
git push -u origin main
```

### 3️⃣ Deploy Backend
- Go to [vercel.com](https://vercel.com) → New Project
- Import backend repo
- Framework: Other
- Install Command: `pip install -r requirements.txt`
- Add env var: `GEMINI_API_KEY` = [your key from https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- Click Deploy
- **Copy backend URL** (e.g., `https://botanic-defenders-backend.vercel.app`)

### 4️⃣ Deploy Frontend
- Go to [vercel.com](https://vercel.com) → New Project
- Import frontend repo
- Framework: Next.js
- Install Command: `npm install --legacy-peer-deps`
- Add env var: `BACKEND_URL` = [backend URL from step 3]
- Click Deploy
- **Visit your frontend URL!** 🎉

---

## Environment Variables Cheat Sheet

### Backend (Vercel/Render)
```
GEMINI_API_KEY=your_api_key_from_google
FRONTEND_URL=https://your-frontend.vercel.app (optional, for CORS)
```

### Frontend (Vercel/Render)
```
BACKEND_URL=https://your-backend.vercel.app
```

### Local Development
```bash
# backend/.env.local
GEMINI_API_KEY=your_key_here

# frontend/.env.local
BACKEND_URL=http://localhost:8002
```

---

## Verify It Works

```bash
# Test backend health
curl https://your-backend.vercel.app/health

# Test frontend
# 1. Open https://your-frontend.vercel.app
# 2. Login (any email/password)
# 3. Go to Plant Health
# 4. Upload a plant image
# 5. See disease prediction!
```

---

## One Command Local Test

```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Visit http://localhost:3000
```

---

## Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| "Module not found" | Check `requirements.txt` has all dependencies |
| "Backend connection failed" | Verify `BACKEND_URL` env var matches backend URL |
| "Build timeout" | Increase timeout in Vercel/Render settings |
| "Out of memory on build" | Increase RAM allocation for build environment |
| "CORS error in browser" | Ensure backend has frontend URL in CORS settings |
| "No predictions showing" | Check `GEMINI_API_KEY` is set in backend |

---

## File Structure Required

```
botanic-defenders-backend/
├── api/
│   └── index.py          ← This is deployed
├── main.py               ← For local testing
├── requirements.txt
├── vercel.json           ← For Vercel deployment
├── .env.local            ← Local API key (DON'T commit)
└── .env.example          ← Template for others

botanic-defenders-frontend/
├── app/
│   ├── api/
│   │   └── plant-health/
│   │       └── predict/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── vercel.json           ← For Vercel deployment
├── .env.local            ← BACKEND_URL setting
├── .env.example          ← Template for others
└── tsconfig.json
```

---

## Security Checklist

- ✅ No API keys in code (use environment variables)
- ✅ No secrets in `.env` files (only `.env.local` which is gitignored)
- ✅ `.gitignore` excludes `.env`, `.env.local`, `node_modules`, `__pycache__`
- ✅ `GEMINI_API_KEY` only set in deployment platform
- ✅ CORS configured for production frontend URL
- ✅ Use HTTPS only (Vercel/Render provide free HTTPS)

---

## Deployment Platforms

### Vercel (Recommended)
- ✅ Free tier: 100GB/month bandwidth, unlimited deployments
- ✅ Auto-deploys on GitHub push
- ✅ Easy environment variables
- ✅ Preview URLs for branches
- ❌ Python builds limited to 3008MB

### Render
- ✅ Free tier available
- ✅ Good Python support
- ✅ Auto-deploys on GitHub push
- ❌ Free tier has sleep/wake cycles

### Both
- ✅ Custom domains
- ✅ SSL/HTTPS included
- ✅ Monitoring & logs
- ✅ Easy scaling

---

## Next Steps After Deployment

1. ✅ Test the application works
2. ✅ Share your deployed URL
3. ✅ Add custom domain (optional)
4. ✅ Set up monitoring/alerts
5. ✅ Plan future features

---

## Get Help

- Stuck? Check [DEPLOYMENT_COMPLETE_GUIDE.md](./DEPLOYMENT_COMPLETE_GUIDE.md)
- Pre-deployment check: `./check-deployment-ready.sh`
- Backend docs: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- Frontend docs: [nextjs.org](https://nextjs.org)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)

---

## Deployment Status Board

Track your deployment progress:

- [ ] Code prepared (no hardcoded secrets)
- [ ] Backend repo created on GitHub
- [ ] Frontend repo created on GitHub
- [ ] Gemini API key obtained
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set
- [ ] Application tested and working
- [ ] URL shared with team/users

✨ **Congratulations on deploying Botanic Defenders!** ✨
