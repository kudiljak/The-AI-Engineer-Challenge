# Deployment Guide

## Deploying Frontend to Vercel

The frontend is a Next.js application that needs to be deployed from the `frontend` directory.

### Option 1: Deploy from Frontend Directory (Recommended)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts. Vercel will automatically detect Next.js.

### Option 2: Deploy from Root Directory

If deploying from the root directory, you need to configure Vercel to use the frontend:

1. From the root directory, run:
   ```bash
   vercel
   ```

2. When prompted, set:
   - **Root Directory**: `frontend`
   - Or use: `vercel --cwd frontend`

### Backend Configuration

The frontend expects the backend to be available. You have two options:

#### Option A: Deploy Backend Separately

1. Deploy your FastAPI backend to a service like:
   - Railway
   - Render
   - Fly.io
   - Or another Vercel deployment (separate project)

2. Set the `BACKEND_URL` environment variable in Vercel:
   - Go to your Vercel project settings
   - Add environment variable: `BACKEND_URL=https://your-backend-url.com`

#### Option B: Use Local Backend (Development Only)

For local development, the frontend will connect to `http://localhost:8000` by default.

### Environment Variables

In Vercel project settings, you may want to set:
- `BACKEND_URL`: URL of your deployed backend (if different from localhost)

### Troubleshooting

If you see "status: ok" after deployment:
- Make sure you're deploying from the `frontend` directory
- Check that Vercel detected Next.js framework
- Verify the build completed successfully in Vercel dashboard
