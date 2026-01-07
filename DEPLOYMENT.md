# Deployment Guide

## Deploying to Vercel

This project is configured to deploy both the frontend (Next.js) and backend (Python serverless functions) to Vercel in a single deployment.

### Quick Deploy

1. From the project root, run:
   ```bash
   vercel
   ```

2. Follow the prompts. Vercel will:
   - Detect and build the Next.js frontend from `frontend/`
   - Deploy Python serverless functions from `api/`

### Environment Variables

**IMPORTANT**: You must set the OpenAI API key in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add: `OPENAI_API_KEY` with your OpenAI API key value
4. Redeploy after adding the variable

### Project Structure

- `frontend/` - Next.js frontend application
- `api/chat.py` - Serverless function for chat endpoint
- `api/health.py` - Serverless function for health check
- `vercel.json` - Vercel configuration (routes frontend and API)

### How It Works

- Frontend routes (`/`) → Served by Next.js
- API routes (`/api/chat`, `/api/health`) → Served by Python serverless functions
- All on the same domain, no CORS issues

### Local Development

For local development:

1. Start the backend:
   ```bash
   uv run uvicorn api.index:app --reload
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

The frontend will automatically proxy API calls to `localhost:8000` in development.

### Troubleshooting

**If you see "status: ok" after deployment:**
- The deployment is working, but you're hitting the wrong endpoint
- Make sure you're accessing the root URL, not `/api/`
- Check Vercel build logs for any errors

**If API calls fail:**
- Verify `OPENAI_API_KEY` is set in Vercel environment variables
- Check the function logs in Vercel dashboard
- Ensure the API routes are correctly configured in `vercel.json`
