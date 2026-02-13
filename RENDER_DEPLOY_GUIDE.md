# 🚀 New Deployment Step: Deploy Node.js Backend to Render

Since Koyeb is asking for payment, we will use **Render**. Render has a great free tier for web services.

## Step 1: Push latest code to GitHub
Make sure your latest changes are on GitHub:
```bash
git add .
git commit -m "Preparing for Render deployment"
git push
```

## Step 2: Create a Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository: `prajwal-kadam12/ReqGen-Vercel`.
4. **Name**: `reqgen-backend`
5. **Region**: Select any (e.g., Singapore or US East).
6. **Branch**: `main`
7. **Root Directory**: (Keep empty/root)
8. **Runtime**: **Docker** (Render will use our root `Dockerfile`).
9. **Instance Type**: Select **Free**.

## Step 3: Add Environment Variables
Click **Advanced** or find **Environment Variables**:
- `NODE_ENV` = `production`
- `PYTHON_BACKEND_URL` = `https://prajwalk12-reqgen-api.hf.space` (Your Hugging Face URL)

## Step 4: Click "Create Web Service"
Wait for the build to finish. It will give you a URL like `https://reqgen-backend-XXXX.onrender.com`.

## Step 5: Connect Vercel to Render
1. Open `vercel.json` in your local code.
2. Replace the destination URL with your **new Render URL**:
   ```json
   "destination": "https://reqgen-backend-XXXX.onrender.com/api/:path*"
   ```
3. **Save and Push**:
   ```bash
   git add vercel.json
   git commit -m "Linked Vercel to Render backend"
   git push
   ```

## Why Render?
- No "Organizations" payment wall for individuals.
- Simple Docker support.
- Automatically handles SSL (HTTPS).
