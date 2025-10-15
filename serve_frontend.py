#!/usr/bin/env python3
"""
Simple HTTP server to serve the React frontend files
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

# Change to frontend directory
frontend_dir = Path(__file__).parent / "frontend"
os.chdir(frontend_dir)

PORT = 5173

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def guess_type(self, path):
        # Override MIME type detection for JSX files
        result = super().guess_type(path)
        if isinstance(result, tuple):
            mimetype, encoding = result
        else:
            mimetype, encoding = result, None
            
        if path.endswith('.jsx'):
            return 'application/javascript'
        elif path.endswith('.tsx'):
            return 'application/javascript'
        elif path.endswith('.ts'):
            return 'application/javascript'
        return mimetype

    def do_GET(self):
        # Always serve our working dashboard, ignore React build files
        if self.path == '/' or self.path == '/index.html' or self.path.startswith('/src/'):
            self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    print(f"🚀 Starting frontend server on http://localhost:{PORT}")
    print(f"📁 Serving files from: {frontend_dir}")
    print("Press Ctrl+C to stop the server")
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
            sys.exit(0)
