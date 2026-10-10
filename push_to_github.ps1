$env:PATH = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd;C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\mingw64\bin;' + $env:PATH
Set-Location 'c:\Users\admin\.gemini\antigravity-ide\scratch\66_Songs'
Write-Host '=====================================================' -ForegroundColor Cyan
Write-Host '  DocuEase AI -> Pushing to GitHub (JanushaJ/Docuease)' -ForegroundColor Green
Write-Host '=====================================================' -ForegroundColor Cyan
Write-Host 'Starting GitHub 1-click authorization...' -ForegroundColor Yellow
Write-Host ''
& 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' push -u origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host ''
    Write-Host '=====================================================' -ForegroundColor Green
    Write-Host '🎉 SUCCESS: Project pushed to https://github.com/JanushaJ/Docuease.git' -ForegroundColor Green
    Write-Host '=====================================================' -ForegroundColor Green
} else {
    Write-Host ''
    Write-Host 'Push failed or cancelled.' -ForegroundColor Red
}
Write-Host ''
Read-Host 'Press Enter to close this window'