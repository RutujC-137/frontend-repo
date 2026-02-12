# Frontend (React)

## Port: 3000

## How to Run Locally

```bash
npm install
npm start
```

## Features

- Displays backend health status
- Shows list of users from backend API
- Connects to backend on port 4000

## Important Note

Make sure backend is running on port 4000 before starting frontend.

## Deployment Files

- `appspec.yml` - For AWS CodeDeploy
- `buildspec.yml` - For AWS CodeBuild
- `scripts/install.sh` - Post-deployment script

## EC2 Deployment Path
`/var/www/frontend`

## Build Command
`npm run build` - Creates optimized production build
