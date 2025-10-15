# 🚀 Deployment Guide

This guide covers different deployment strategies for the SaaSquatch Leads application, from local development to production environments.

## 📋 Prerequisites

Before deploying, ensure you have:
- Python 3.8+ installed
- Node.js 16+ installed (for frontend builds)
- Git installed
- Access to deployment platforms (Vercel, Netlify, Render, Heroku)

## 🏠 Local Development

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tejaswini6jk/Saasquatch-leads.git
   cd Saasquatch-leads
   ```

2. **Start backend server**:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate  # Windows
   # source .venv/bin/activate  # macOS/Linux
   pip install -r backend/requirements.txt
   python backend/app.py
   ```

3. **Start frontend** (Option 1 - React):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Start frontend** (Option 2 - Standalone):
   ```bash
   python simple_server.py
   ```

## 🌐 Frontend Deployment

### Vercel Deployment

1. **Build the application**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard:
   ```
   VITE_API_BASE=https://your-backend-url.com/api
   ```

### Netlify Deployment

1. **Build the application**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist/` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

3. **Create `netlify.toml`**:
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"
   
   [build.environment]
     VITE_API_BASE = "https://your-backend-url.com/api"
   ```

### GitHub Pages Deployment

1. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'
             
         - name: Install dependencies
           run: |
             cd frontend
             npm install
             
         - name: Build
           run: |
             cd frontend
             npm run build
             
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/dist
   ```

## 🐍 Backend Deployment

### Render Deployment

1. **Create `render.yaml`**:
   ```yaml
   services:
     - type: web
       name: saasquatch-leads-api
       env: python
       buildCommand: pip install -r backend/requirements.txt
       startCommand: python backend/app.py
       envVars:
         - key: PYTHON_VERSION
           value: 3.9.0
   ```

2. **Connect repository** to Render and deploy

### Heroku Deployment

1. **Create `Procfile`**:
   ```
   web: python backend/app.py
   ```

2. **Create `runtime.txt`**:
   ```
   python-3.9.0
   ```

3. **Deploy to Heroku**:
   ```bash
   heroku create saasquatch-leads-api
   git push heroku main
   ```

### Railway Deployment

1. **Create `railway.json`**:
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "python backend/app.py",
       "healthcheckPath": "/api/leads"
     }
   }
   ```

2. **Connect repository** to Railway and deploy

## 🐳 Docker Deployment

### Single Container Setup

1. **Create `Dockerfile`**:
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   
   # Install system dependencies
   RUN apt-get update && apt-get install -y \
       gcc \
       && rm -rf /var/lib/apt/lists/*
   
   # Copy requirements and install Python dependencies
   COPY backend/requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   # Copy application code
   COPY backend/ .
   
   # Expose port
   EXPOSE 5000
   
   # Health check
   HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
     CMD curl -f http://localhost:5000/api/leads || exit 1
   
   # Start application
   CMD ["python", "app.py"]
   ```

2. **Create `docker-compose.yml`**:
   ```yaml
   version: '3.8'
   
   services:
     api:
       build: .
       ports:
         - "5000:5000"
       environment:
         - FLASK_ENV=production
       restart: unless-stopped
       
     frontend:
       image: nginx:alpine
       ports:
         - "80:80"
       volumes:
         - ./frontend/dist:/usr/share/nginx/html
       depends_on:
         - api
       restart: unless-stopped
   ```

3. **Build and run**:
   ```bash
   docker-compose up -d
   ```

### Multi-Container Setup

1. **Backend Dockerfile** (`backend/Dockerfile`):
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   COPY . .
   
   EXPOSE 5000
   
   CMD ["python", "app.py"]
   ```

2. **Frontend Dockerfile** (`frontend/Dockerfile`):
   ```dockerfile
   FROM node:16-alpine AS build
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

## ☁️ Cloud Platform Deployment

### AWS Deployment

#### Using Elastic Beanstalk

1. **Create `application.py`**:
   ```python
   from backend.app import app as application
   
   if __name__ == "__main__":
       application.run()
   ```

2. **Create `.ebextensions/01_python.config`**:
   ```yaml
   option_settings:
     aws:elasticbeanstalk:container:python:
       WSGIPath: application.py
   ```

3. **Deploy**:
   ```bash
   eb init
   eb create production
   eb deploy
   ```

#### Using ECS with Fargate

1. **Create task definition** with the Docker image
2. **Set up load balancer** and target groups
3. **Configure auto-scaling** based on CPU/memory usage

### Google Cloud Platform

#### Using Cloud Run

1. **Build and push image**:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT-ID/saasquatch-leads
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy --image gcr.io/PROJECT-ID/saasquatch-leads --platform managed
   ```

### Azure Deployment

#### Using App Service

1. **Create `web.config`**:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <handlers>
         <add name="PythonHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified"/>
       </handlers>
       <httpPlatform processPath="D:\home\Python39\python.exe"
                     arguments="D:\home\site\wwwroot\backend\app.py"
                     stdoutLogEnabled="true"
                     stdoutLogFile="D:\home\LogFiles\python.log">
       </httpPlatform>
     </system.webServer>
   </configuration>
   ```

2. **Deploy via Azure CLI**:
   ```bash
   az webapp up --name saasquatch-leads --resource-group myResourceGroup --runtime "PYTHON|3.9"
   ```

## 🔧 Environment Configuration

### Production Environment Variables

Create a `.env` file for production:

```env
# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-secret-key-here

# Database (if using)
DATABASE_URL=postgresql://user:password@localhost/saasquatch_leads

# API Configuration
API_BASE_URL=https://your-api-domain.com
CORS_ORIGINS=https://your-frontend-domain.com

# Security
JWT_SECRET_KEY=your-jwt-secret
API_RATE_LIMIT=1000/hour
```

### Frontend Environment Variables

```env
# API Configuration
VITE_API_BASE=https://your-api-domain.com/api

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPORT=true
```

## 📊 Monitoring and Logging

### Application Monitoring

1. **Add logging configuration**:
   ```python
   import logging
   from logging.handlers import RotatingFileHandler
   
   if not app.debug:
       file_handler = RotatingFileHandler('logs/saasquatch-leads.log', maxBytes=10240, backupCount=10)
       file_handler.setFormatter(logging.Formatter(
           '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
       ))
       file_handler.setLevel(logging.INFO)
       app.logger.addHandler(file_handler)
   ```

2. **Health check endpoint**:
   ```python
   @app.route('/health')
   def health_check():
       return {'status': 'healthy', 'timestamp': datetime.utcnow()}, 200
   ```

### Error Tracking

Consider integrating with services like:
- **Sentry** for error tracking
- **DataDog** for application monitoring
- **New Relic** for performance monitoring

## 🔒 Security Considerations

### SSL/TLS Configuration

1. **Obtain SSL certificates** from Let's Encrypt or your certificate provider
2. **Configure HTTPS** redirects
3. **Set security headers**:
   ```python
   @app.after_request
   def after_request(response):
       response.headers['X-Content-Type-Options'] = 'nosniff'
       response.headers['X-Frame-Options'] = 'DENY'
       response.headers['X-XSS-Protection'] = '1; mode=block'
       return response
   ```

### API Security

1. **Implement rate limiting**
2. **Add input validation and sanitization**
3. **Use environment variables** for sensitive data
4. **Regular security updates** for dependencies

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations (if applicable)
- [ ] SSL certificates ready
- [ ] Monitoring setup configured
- [ ] Backup strategy in place

### Post-deployment

- [ ] Health checks passing
- [ ] SSL certificate working
- [ ] API endpoints responding
- [ ] Frontend loading correctly
- [ ] Monitoring alerts configured
- [ ] Performance benchmarks met

## 📞 Troubleshooting

### Common Issues

1. **CORS errors**: Ensure CORS is properly configured for your frontend domain
2. **Environment variables**: Check that all required environment variables are set
3. **Port conflicts**: Ensure the specified ports are available
4. **Dependencies**: Verify all dependencies are installed correctly

### Debug Mode

Enable debug mode for troubleshooting:
```python
app.config['DEBUG'] = True
```

### Logs

Check application logs for errors:
```bash
# Docker
docker logs container-name

# Systemd
journalctl -u your-service-name

# Heroku
heroku logs --tail
```

This deployment guide should help you successfully deploy the SaaSquatch Leads application to various platforms and environments.
