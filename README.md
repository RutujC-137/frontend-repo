# Frontend (React)

## Port: 3000

## 🔐 Environment Variables Setup

### Local Development

1. Copy the example file:
```bash
cp .env.example .env.development
```

2. Edit `.env.development`:
```bash
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_ENV=development
```

3. Install and run:
```bash
npm install
npm start
```

**Important:** Start backend first on port 4000!

### Production (AWS)

Add these as environment variables in AWS CodeBuild:
- `REACT_APP_API_URL` = `http://54.84.37.142/api`
- `REACT_APP_ENV` = `production`

See `../AWS_CODEBUILD_ENV_SETUP.md` for detailed instructions.

---

## Features

- Displays backend health status
- Shows list of users from backend API
- Shows current environment info
- Automatic API connection testing

---

## Files Explained

- `src/App.js` - Main React component
- `src/index.js` - React entry point
- `public/index.html` - HTML template
- `package.json` - Dependencies
- `appspec.yml` - AWS CodeDeploy configuration
- `buildspec.yml` - AWS CodeBuild configuration (creates .env.production)
- `scripts/install.sh` - Deployment script
- `.env.example` - Template for environment variables
- `.env.development` - Local development config (not committed)
- `.env.production` - Production config (not committed)
- `.gitignore` - Prevents committing .env files

---

## EC2 Deployment Path

`/var/www/frontend`

---

## How React Environment Variables Work

1. Variables must start with `REACT_APP_`
2. They are baked into the build at compile time
3. They become part of the JavaScript bundle
4. Available via `process.env.REACT_APP_VARIABLE_NAME`

**Security Note:** Never put secrets in React env variables - they're visible in the browser!

---

## Deployment Flow

1. Push to GitHub
2. CodePipeline triggers
3. CodeBuild creates `.env.production` from environment variables
4. CodeBuild runs `npm run build` (includes env vars in build)
5. CodeDeploy copies build folder to `/var/www/frontend`
6. `install.sh` runs `pm2 serve build 3000`
7. Frontend is live!

---

## Troubleshooting

**API URL is still localhost:**
```bash
# Check if environment variable is set in CodeBuild
# Rebuild the project
# Clear browser cache
```

**"Cannot connect to backend":**
```bash
# Check if backend is running
curl http://localhost:4000/api/health

# Check browser console for CORS errors
# Verify REACT_APP_API_URL is correct
```

**Environment variable not showing:**
```bash
# Variable must start with REACT_APP_
# Restart dev server after adding variables
# In production, rebuild the project
```
