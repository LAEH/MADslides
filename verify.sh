#!/bin/bash

# verify.sh - Verification script for MADslides

set -e

echo "🔍 Starting verification..."

# 1. Type Check & Build
echo "🏗  Running Type Check and Build..."
if npm run build; then
    echo "✅ Build passed."
else
    echo "❌ Build failed. Please fix the errors above."
    exit 1
fi

echo "🎉 Verification successful! You are ready to push."
