# Setting Environment Variables in Vercel

## Method 1: Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-...`)
   - **Environment**: Select all three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
6. Click **Save**
7. **Important**: Redeploy your project after adding the variable
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**

## Method 2: Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Set the environment variable
vercel env add OPENAI_API_KEY

# When prompted:
# - Enter your OpenAI API key value
# - Select environments: Production, Preview, Development (select all)

# Then redeploy
vercel --prod
```

## Method 3: Using vercel.json (Not Recommended for Secrets)

⚠️ **Don't put API keys directly in vercel.json** - it will be committed to git!

## Local Development vs Vercel

### Local Development (Terminal)
```bash
# This only works in your local terminal session
export OPENAI_API_KEY=sk-your-key-here

# Or use .env file (recommended)
echo "OPENAI_API_KEY=sk-your-key-here" > .env
```

### Vercel Deployment
- **Must** set via Vercel dashboard or CLI
- `export` commands in your terminal don't affect Vercel
- Environment variables are set per-project in Vercel

## Verify It's Set

After setting in Vercel:
1. Go to **Settings** → **Environment Variables**
2. You should see `OPENAI_API_KEY` listed
3. Test your `/api/health` endpoint - it should show `"api_key_configured": true`

## Troubleshooting

**If the API key still doesn't work:**
1. Make sure you **redeployed** after adding the variable
2. Check that it's set for the correct environment (Production/Preview/Development)
3. Check function logs in Vercel dashboard for errors
4. Verify the key value is correct (no extra spaces, complete key)
