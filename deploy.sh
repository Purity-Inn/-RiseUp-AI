#!/bin/bash

echo "🚀 Building RiseUp AI for deployment..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building project..."
npm run build:production

echo "✅ Build complete! Deploy the 'frontend/dist' folder to your hosting service."
echo ""
echo "🌐 Deployment options:"
echo "1. Vercel: vercel --prod (from root directory)"
echo "2. Netlify: netlify deploy --prod --dir=frontend/dist"
echo "3. GitHub Pages: Already configured in .github/workflows/deploy.yml"
echo ""
echo "📁 Built files are in: frontend/dist"
