@echo off
echo GIFTPAL App Sync Utility
echo ========================

if "%1"=="" (
    echo Syncing mr-gift-app to giftpal-app...
    node sync-apps.js
    goto end
)

if "%1"=="to-giftpal" (
    echo Syncing mr-gift-app to giftpal-app...
    node sync-apps.js to-giftpal
    goto end
)

if "%1"=="from-giftpal" (
    echo Syncing giftpal-app to mr-gift-app...
    node sync-apps.js from-giftpal
    goto end
)

if "%1"=="bidirectional" (
    echo Syncing both ways...
    node sync-apps.js bidirectional
    goto end
)

if "%1"=="watch" (
    echo Starting watch mode...
    node sync-apps.js watch
    goto end
)

echo Usage: sync.bat [command]
echo.
echo Commands:
echo   (no args)       Sync mr-gift-app to giftpal-app
echo   to-giftpal      Sync mr-gift-app to giftpal-app
echo   from-giftpal    Sync giftpal-app to mr-gift-app
echo   bidirectional   Sync both ways
echo   watch           Watch for changes and sync automatically

:end
pause
