@echo off
set "PATH=C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd;C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\mingw64\bin;%PATH%"
cd /d "c:\Users\admin\.gemini\antigravity-ide\scratch\66_Songs"

echo ===================================================================
echo   DocuEase AI - Pushing project to https://github.com/JanushaJ/Docuease.git
echo ===================================================================
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ===================================================================
    echo   SUCCESS! Your project has been pushed to GitHub!
    echo   View repository: https://github.com/JanushaJ/Docuease
    echo ===================================================================
) else (
    echo.
    echo Push failed. Please check your GitHub authorization.
)

echo.
pause
