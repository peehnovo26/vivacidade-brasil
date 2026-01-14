# Script para atualizar URLs para Render deploy (PowerShell)

Write-Host "🔄 Atualizando URLs para Render..." -ForegroundColor Cyan
Write-Host ""

# URL do Render (atualize conforme necessário)
$RENDER_API_URL = "https://vivacidade-brasil-api.onrender.com/api"

# Arquivos HTML que precisam ser atualizados
$files = @(
    "index.html",
    "login.html",
    "register.html",
    "checkout.html",
    "register-business.html",
    "admin/login.html",
    "admin/register.html",
    "admin/dashboard.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Substituir URLs do Render anterior (se houver)
        $content = $content -replace "https://vivacidade-backend\.onrender\.com/api", $RENDER_API_URL
        
        # Escrever arquivo atualizado
        Set-Content $file $content -Encoding UTF8
        Write-Host "✅ Atualizado: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Arquivo não encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "✨ URLs atualizadas com sucesso!" -ForegroundColor Green
Write-Host "API URL configurada para: $RENDER_API_URL" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Próximas etapas:" -ForegroundColor Blue
Write-Host "1. git add ." 
Write-Host "2. git commit -m '🚀 Atualizar URLs para Render'"
Write-Host "3. git push origin main"
Write-Host ""
Write-Host "✅ Deploy será acionado automaticamente no Render!" -ForegroundColor Green
