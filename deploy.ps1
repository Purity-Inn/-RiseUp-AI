Write-Host "🚀 Building RiseUp AI for deployment..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location frontend

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project
Write-Host "🏗️ Building project..." -ForegroundColor Yellow
npm run build:production

Write-Host "✅ Build complete! Deploy the 'frontend/dist' folder to your hosting service." -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Deployment options:" -ForegroundColor Cyan
Write-Host "1. Vercel: vercel --prod (from root directory)"
Write-Host "2. Netlify: netlify deploy --prod --dir=frontend/dist"
Write-Host "3. GitHub Pages: Already configured in .github/workflows/deploy.yml"
Write-Host ""
Write-Host "📁 Built files are in: frontend/dist" -ForegroundColor Blue

# Return to root directory
Set-Location ..
