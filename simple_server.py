#!/usr/bin/env python3
"""
Simple HTTP server to serve the dashboard without complex MIME handling
"""
import http.server
import socketserver
import os
from pathlib import Path

PORT = 8080

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        # Always serve our dashboard
        if self.path == '/' or self.path == '/index.html':
            self.path = '/dashboard.html'
        return super().do_GET()

if __name__ == "__main__":
    print(f"🚀 Starting simple dashboard server on http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    
    with socketserver.TCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
