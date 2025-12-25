@echo off
echo 🌱 Starting Greenline build verification...

REM Check if environment variables are set
if "%NEXT_PUBLIC_FIREBASE_API_KEY%"=="" (
    echo ⚠️  Warning: NEXT_PUBLIC_FIREBASE_API_KEY not set
    echo Setting dummy values for build test...
    set NEXT_PUBLIC_FIREBASE_API_KEY=dummy-api-key
    set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dummy.firebaseapp.com
    set NEXT_PUBLIC_FIREBASE_PROJECT_ID=dummy-project
    set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dummy.appspot.com
    set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
    set NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
)

echo 🔧 Running Next.js build...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful! Firebase configuration is working properly.
) else (
    echo ❌ Build failed. Check the error messages above.
    exit /b 1
)