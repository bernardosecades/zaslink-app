ssh root@bernardosecades.com "cd zaslink-app && git pull origin main && npm install && REACT_APP_API_BASE_URL=https://api.zaslink.com npm start" || echo "API Deployment failed" &
