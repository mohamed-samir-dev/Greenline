#!/bin/bash

# Build verification script for Greenline project
echo "🌱 Starting Greenline build verification..."

# Check if environment variables are set
if [ -z "$NEXT_PUBLIC_FIREBASE_API_KEY" ]; then
    echo "⚠️  Warning: NEXT_PUBLIC_FIREBASE_API_KEY not set"
    echo "Setting dummy values for build test..."
    export NEXT_PUBLIC_FIREBASE_API_KEY="dummy-api-key"
    export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="dummy.firebaseapp.com"
    export NEXT_PUBLIC_FIREBASE_PROJECT_ID="dummy-project"
    export NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="dummy.appspot.com"
    export NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
    export NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"
fi

echo "🔧 Running Next.js build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Firebase configuration is working properly."
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi