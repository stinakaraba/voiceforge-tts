# 🚂 Deploying VoiceForge to Railway - Step by Step

This guide assumes you're brand new to deployment. We'll go slow!

---

## What is Railway?

Railway is a platform that runs your app on the internet so anyone can use it (not just on your computer). Think of it as renting a computer in the cloud that runs your server 24/7.

---

## Prerequisites

Before starting, make sure you have:
- ✅ A GitHub account (you have this - your repo is there!)
- ✅ Your app pushed to GitHub (done!)
- ⬜ A Railway account (we'll create this)

---

## Step 1: Create a Railway Account

1. Go to **[railway.app](https://railway.app)**
2. Click **"Login"** (top right)
3. Choose **"Login with GitHub"** (easiest option)
4. Authorize Railway to access your GitHub
5. You're in! 🎉

---

## Step 2: Create a New Project

1. Once logged in, click **"New Project"** (big button, can't miss it)
2. You'll see several options. Click **"Deploy from GitHub repo"**
3. If this is your first time, Railway will ask to connect to GitHub:
   - Click **"Configure GitHub App"**
   - Choose your GitHub account
   - Select **"Only select repositories"**
   - Find and select **"voiceforge-tts"**
   - Click **"Install & Authorize"**

4. Back in Railway, you should now see your **voiceforge-tts** repo
5. Click on it to select it

---

## Step 3: Configure the Build Settings

Railway needs to know WHERE your server code is (it's in the `server/` folder).

1. After selecting your repo, Railway will start deploying (it might fail - that's okay!)
2. Click on your **service** (the purple box that appeared)
3. Go to the **"Settings"** tab
4. Scroll down to **"Build"** section
5. Find **"Root Directory"** and set it to: `server`
6. Find **"Build Command"** - leave it as `npm install` (or blank)
7. Find **"Start Command"** - set it to: `npm start`

---

## Step 4: Add Environment Variables (IMPORTANT!)

Your app needs those secret API keys to work. Railway keeps them safe.

1. Still in your service, click the **"Variables"** tab
2. Click **"+ New Variable"** for each of these:

| Variable Name | Value |
|--------------|-------|
| `SUPABASE_URL` | `https://lysljrhorceixwxjrzjx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c2xqcmhvcmNlaXh3eGpyemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MjAyODMsImV4cCI6MjA4MDk5NjI4M30.C7NfZhmJQM_lRBvcDnL9vN6NtDM6Jfi6wcnJgJfm5no` |
| `SUPABASE_SERVICE_KEY` | (same as ANON_KEY for now) |
| `INWORLD_API_KEY` | `QUUzd051NXoyZXJabHZWMGphRU85QU55NjgxY2RxTWw6Zk56TW5Yb21kSVVaejc1a0U2d1Z1aUlxWkc4YjlZUUZXdGlkMm5MOHcxMHl6dUhkSnF6em9GR0ZlY1BUbEdhQg==` |
| `PORT` | `3000` |

**Pro tip:** You can also click "Raw Editor" and paste this:
```
SUPABASE_URL=https://lysljrhorceixwxjrzjx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c2xqcmhvcmNlaXh3eGpyemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MjAyODMsImV4cCI6MjA4MDk5NjI4M30.C7NfZhmJQM_lRBvcDnL9vN6NtDM6Jfi6wcnJgJfm5no
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c2xqcmhvcmNlaXh3eGpyemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MjAyODMsImV4cCI6MjA4MDk5NjI4M30.C7NfZhmJQM_lRBvcDnL9vN6NtDM6Jfi6wcnJgJfm5no
INWORLD_API_KEY=QUUzd051NXoyZXJabHZWMGphRU85QU55NjgxY2RxTWw6Zk56TW5Yb21kSVVaejc1a0U2d1Z1aUlxWkc4YjlZUUZXdGlkMm5MOHcxMHl6dUhkSnF6em9GR0ZlY1BUbEdhQg==
PORT=3000
```

---

## Step 5: Redeploy

After adding variables, Railway should automatically redeploy. If not:

1. Go to the **"Deployments"** tab
2. Click the **three dots** on the latest deployment
3. Click **"Redeploy"**

---

## Step 6: Generate a Public URL

1. Go to the **"Settings"** tab
2. Scroll down to **"Networking"**
3. Click **"Generate Domain"**
4. Railway will create a URL like: `voiceforge-tts-production.up.railway.app`

🎉 **That's your live app URL!**

---

## Step 7: Test Your Live App

1. Open the Railway-generated URL in your browser
2. Sign up for an account
3. Try generating some audio!

---

## Troubleshooting

### "Build failed"
- Check the **"Deployments"** tab and click on the failed deployment
- Read the logs to see what went wrong
- Common fix: Make sure "Root Directory" is set to `server`

### "Application error" or blank page
- Check that all environment variables are set correctly
- Look at the **"Logs"** tab for error messages

### App works but audio generation fails
- Double-check your `INWORLD_API_KEY` is correct
- Make sure there are no extra spaces in your variables

---

## Updating Your App

Whenever you push changes to GitHub:
1. Railway automatically detects the change
2. It rebuilds and redeploys your app
3. No manual work needed! 🎉

---

## Cost

Railway's free tier includes:
- $5 of free credits per month
- More than enough for a small project
- No credit card required to start

---

## Quick Reference

| What | Where |
|------|-------|
| Railway Dashboard | [railway.app/dashboard](https://railway.app/dashboard) |
| Your GitHub Repo | [github.com/stinakaraba/voiceforge-tts](https://github.com/stinakaraba/voiceforge-tts) |
| Environment Variables | Railway → Your Project → Service → Variables tab |
| Deployment Logs | Railway → Your Project → Service → Deployments tab |

---

## You Did It! 🎉

Your VoiceForge app is now live on the internet. Share the URL with friends and let them generate AI audio!
