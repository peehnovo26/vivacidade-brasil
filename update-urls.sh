#!/bin/bash
# Script para atualizar URLs para Render deploy

echo "🔄 Atualizando URLs para Render..."
echo ""

# Variável com a URL do Render (ajuste conforme necessário)
RENDER_API_URL="https://vivacidade-brasil-api.onrender.com/api"
LOCALHOST_API_URL="http://localhost:5000/api"

# Arquivos HTML que precisam ser atualizados
FILES=(
  "index.html"
  "login.html"
  "register.html"
  "checkout.html"
  "register-business.html"
  "admin/login.html"
  "admin/register.html"
  "admin/dashboard.html"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Substituir a URL do backend Render (se houver)
    sed -i "s|https://vivacidade-backend.onrender.com/api|$RENDER_API_URL|g" "$file"
    echo "✅ Atualizado: $file"
  fi
done

echo ""
echo "✨ URLs atualizadas com sucesso!"
echo "API URL configurada para: $RENDER_API_URL"
echo ""
echo "Para usar localmente, execute:"
echo "npm start  (no backend)"
echo ""
echo "Para deploy, faça commit e push:"
echo "git add ."
echo "git commit -m '🚀 Atualizar URLs para Render'"
echo "git push origin main"
