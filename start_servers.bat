@echo off
echo 🚀 Starting SaaSquatch Leads Dashboard
echo.

echo 📊 Starting Backend API Server...
start "Backend API" cmd /k "cd /d %~dp0 && .\.venv\Scripts\python backend\app.py"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo 🎨 Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0 && .\.venv\Scripts\python simple_server.py"

echo ⏳ Waiting for frontend to start...
timeout /t 3 /nobreak > nul

echo 🌐 Opening Dashboard...
start http://localhost:8080

echo.
echo ✅ Dashboard is running!
echo 📊 Backend API: http://localhost:5000
echo 🎨 Frontend: http://localhost:8080
echo.
echo Press any key to exit...
pause > nul
