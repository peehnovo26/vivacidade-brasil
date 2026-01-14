# 📋 CHECKLIST - DEPLOY RENDER.COM

## ✅ PRÉ-REQUISITOS
- [ ] Criar conta em GitHub
- [ ] Criar conta em Render.com (com GitHub)
- [ ] Criar conta em Cloudinary
- [ ] Criar conta em MongoDB Atlas
- [ ] Criar conta em Stripe
- [ ] Ter Node.js 18+ instalado

## ✅ PREPARAÇÃO LOCAL (JÁ CONCLUÍDO)
- [x] Projeto criado com Express.js
- [x] MongoDB configurado e conectado
- [x] Stripe integrado com 3 planos
- [x] Cloudinary integrado para upload
- [x] Autenticação JWT implementada
- [x] Admin panel criado
- [x] Frontend com 5 cidades
- [x] Testes locais feitos

## ✅ GITHUB
- [ ] `git add .` - Adicionar todos os arquivos
- [ ] `git commit -m "🚀 Preparar para deploy no Render"` - Fazer commit
- [ ] `git push origin main` - Enviar para GitHub

## ✅ RENDER.COM - BACKEND

### Criar Web Service
- [ ] Acesse: https://render.com/dashboard
- [ ] Clique em "New +"
- [ ] Selecione "Web Service"
- [ ] Conecte repositório GitHub
- [ ] Selecione branch: main
- [ ] Nome: vivacidade-brasil-api
- [ ] Environment: Node
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Region: Ohio (recomendado)

### Adicionar Environment Variables
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_PUBLIC_KEY
- [ ] STRIPE_PRICE_START
- [ ] STRIPE_PRICE_PLUS
- [ ] STRIPE_PRICE_ELITE
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] NODE_ENV = production
- [ ] PORT = 3000

### Deploy
- [ ] Clique em "Create Web Service"
- [ ] Aguarde build (2-5 minutos)
- [ ] Copie a URL: https://vivacidade-brasil-api.onrender.com
- [ ] Teste: /api/health retorna status OK

## ✅ ATUALIZAR FRONTEND

### Atualizar URLs
- [ ] Abra: update-urls.ps1
- [ ] Modifique: $RENDER_API_URL com sua URL do Render
- [ ] Execute: `powershell -ExecutionPolicy Bypass -File update-urls.ps1`
- [ ] Verifique se as URLs foram atualizadas

### Validar Alterações
- [ ] Verifique que todos os HTML apontam para Render
- [ ] Procure por "vivacidade-brasil-api.onrender.com" nos arquivos
- [ ] Confirme que localStorage funciona corretamente

### Commit e Push
- [ ] `git add .`
- [ ] `git commit -m "🌐 Atualizar URLs para Render"`
- [ ] `git push origin main`

## ✅ RENDER.COM - FRONTEND

### Criar Static Site
- [ ] Clique em "New +"
- [ ] Selecione "Static Site"
- [ ] Conecte repositório GitHub
- [ ] Selecione branch: main
- [ ] Nome: vivacidade-brasil-web
- [ ] Build Command: (deixar vazio)
- [ ] Publish Directory: ./
- [ ] Clique em "Create Static Site"

### Deploy Frontend
- [ ] Aguarde deploy (1-2 minutos)
- [ ] Copie a URL: https://vivacidade-brasil-web.onrender.com

## ✅ TESTES EM PRODUÇÃO

### Teste 1: Endpoints Básicos
- [ ] GET /api/health retorna sucesso
- [ ] Frontend carrega sem erros
- [ ] Console do navegador sem erros 404

### Teste 2: Autenticação
- [ ] Acesse frontend
- [ ] Clique em "Registrar"
- [ ] Preencha formulário
- [ ] Clique em "Criar Conta"
- [ ] Sistema cria usuário no MongoDB
- [ ] Token é armazenado em localStorage

### Teste 3: Login
- [ ] Clique em "Login"
- [ ] Digite credenciais criadas
- [ ] Sistema autentica contra MongoDB
- [ ] Usuário é logado com sucesso

### Teste 4: Registro de Negócio
- [ ] Clique em "Para Empresas"
- [ ] Preencha formulário de negócio
- [ ] Selecione fotos (até 5)
- [ ] **Importante**: Aguarde 2-3 segundos após seleção
- [ ] Fotos devem fazer upload para Cloudinary automaticamente
- [ ] Clique em "Registrar Negócio"
- [ ] Negócio é salvo com URLs de fotos do Cloudinary

### Teste 5: Verificar Dados
- [ ] MongoDB Atlas: Verifique collection "businesses" tem registros
- [ ] Cloudinary: Vá em Media Library e veja fotos em "vivacidade-brasil/"
- [ ] Stripe (opcional): Verifique logs de tentativas de pagamento

### Teste 6: Admin Panel
- [ ] Pressione Shift + Alt + A
- [ ] Vá para /admin/login.html
- [ ] Registre novo admin em /admin/register.html
- [ ] Faça login no admin
- [ ] Acesse dashboard
- [ ] Veja estatísticas, negócios, usuários

## ✅ PROBLEMAS E SOLUÇÕES

### Servidor desliga após inatividade (Free Tier)
```
Solução: Upgrade para plano pago
Custo: ~$7-12/mês
```

### "Cannot GET /"
```
Solução: 
1. Verifique se URLs foram atualizadas
2. Limpe cache (Ctrl+Shift+Delete)
3. Aguarde propagação de DNS
```

### Erro de CORS
```
Solução já implementada no backend:
app.use(cors());
Deve funcionar sem problemas
```

### MongoDB não conecta
```
Solução:
1. Verifique MONGODB_URI no Render
2. Copie exatamente do MongoDB Atlas
3. Inclua usuário e senha corretos
```

### Cloudinary não faz upload
```
Solução:
1. Verifique credenciais em Render
2. Teste em console do navegador
3. Veja logs de erro em Network (F12)
```

## ✅ MONITORAMENTO

### Logs do Backend
- [ ] Acesse Render Dashboard
- [ ] Clique no Web Service
- [ ] Vá em "Logs"
- [ ] Monitore erros em tempo real

### Alertas
- [ ] Configure email alerts em Render
- [ ] Receba notificações de crashes
- [ ] Configure uptime monitoring

## ✅ PRÓXIMAS ETAPAS

### Domínio Customizado (Opcional)
- [ ] Comprar domínio em Namecheap/GoDaddy
- [ ] Adicionar CNAME records do Render
- [ ] Aguardar propagação DNS (até 24h)
- [ ] Testar com domínio customizado

### Melhorias Futuras
- [ ] Adicionar mais cidades
- [ ] Integrar busca avançada
- [ ] Criar app mobile
- [ ] Implementar notificações
- [ ] Analytics de negócios
- [ ] Sistema de reviews
- [ ] Filtros e categorias avançadas

### Escalabilidade
- [ ] Upgrade do plano Render conforme crescer
- [ ] Monitorar performance
- [ ] Otimizar queries MongoDB
- [ ] Cache com Redis (futuro)

## 🎉 SUCESSO!

Seu projeto está em produção! Parabéns! 🚀

---

**Data de Deploy:** 14 de janeiro de 2026
**Plataforma:** VivaCidade Brasil
**Status:** ✅ Pronto para Produção
