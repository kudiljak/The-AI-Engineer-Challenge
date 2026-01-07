# Vercel Deployment Troubleshooting

## If API routes return 404

### Check 1: Verify Function Detection
1. Go to your Vercel project dashboard
2. Click on the "Functions" tab
3. You should see `api/chat.py` and `api/health.py` listed
4. If they're not there, Vercel isn't detecting them

### Check 2: Check Function Logs
1. In Vercel dashboard, go to "Functions" → Click on `api/chat.py`
2. Check the "Logs" tab for any errors
3. Common errors:
   - Missing dependencies (check requirements.txt)
   - Environment variable not set (OPENAI_API_KEY)
   - Syntax errors

### Check 3: Test the Health Endpoint
Try accessing: `https://your-app.vercel.app/api/health`
- Should return: `{"status": "ok", "api_key_configured": true, ...}`
- If 404: Functions aren't being detected
- If 500: Check logs for errors

### Check 4: Verify File Structure
```
project-root/
├── api/
│   ├── chat.py       ← Must be here
│   ├── health.py     ← Must be here
│   └── vercel.json   ← Runtime config
├── frontend/
│   └── ...
├── requirements.txt  ← Must be in root
└── vercel.json       ← Main config
```

### Check 5: Environment Variables
1. Go to Vercel project → Settings → Environment Variables
2. Verify `OPENAI_API_KEY` is set
3. Make sure it's set for **Production**, **Preview**, and **Development**
4. Redeploy after adding/changing variables

### Alternative Solution: Separate Deployments

If the unified deployment doesn't work, you can:

1. **Deploy Frontend Only to Vercel:**
   ```bash
   cd frontend
   vercel
   ```

2. **Deploy Backend Separately:**
   - Use Railway, Render, or Fly.io for the backend
   - Update `frontend/next.config.js` to point to the backend URL
   - Set `BACKEND_URL` environment variable in Vercel

### Manual Test

Test the function directly:
```bash
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

If this works but the frontend doesn't, the issue is in the frontend configuration.
