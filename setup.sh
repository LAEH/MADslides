#!/bin/bash

# setup.sh - Setup script for MADslides

set -e

echo "🚀 Starting MADslides setup..."

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v18+) and try again."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js found: $NODE_VERSION"

# 2. Install Dependencies
echo "📦 Installing dependencies..."
if npm install; then
    echo "✅ Dependencies installed successfully."
else
    echo "❌ Failed to install dependencies."
    exit 1
fi

# 3. Make scripts executable
echo "🔧 Setting permissions..."
chmod +x setup.sh verify.sh 2>/dev/null || true
echo "✅ Scripts are now executable."

echo "🎉 Setup complete! You can now run 'npm run dev' to start the application."
