#!/bin/bash

echo "🚀 Starting TabX full-stack deployment..."

# Step 1: Railway Backend Deployment
echo "📦 Deploying backend to Railway..."
cd ../backend
if ! command -v railway &> /dev/null
then
    echo "❌ Railway CLI not found. Install from https://railway.app/cli"
    exit
fi
railway init --yes
railway up

# Step 2: Vercel Frontend Deployment
echo "🌐 Deploying frontend to Vercel..."
cd ../frontend
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Install from https://vercel.com/cli"
    exit
fi
vercel --prod

echo "✅ Deployment complete. Visit Railway and Vercel dashboards to confirm."
