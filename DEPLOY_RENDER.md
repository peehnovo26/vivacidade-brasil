# 🚀 Deploy em Produção - VivaCidade Brasil

## Opção Recomendada: Render.com

Render.com oferece hospedagem gratuita com:
- ✅ Backend Node.js gratuito
- ✅ MongoDB Atlas (gratuito)
- ✅ Domínio grátis (opcional)
- ✅ SSL automático
- ✅ Variáveis de ambiente

---

## 📋 Pré-requisitos

1. **GitHub Account**
   - Conta em https://github.com
   - Repositório do projeto (público ou privado)

2. **MongoDB Atlas**
   - Conta criada
   - Cluster M0 criado
   - String de conexão pronta

3. **Stripe Production**
   - Upgrade para Production (não apenas teste)
   - Chaves de produção (começam com `pk_live_` e `sk_live_`)

4. **Render.com Account**
   - Conta em https://render.com
   - Conectado com GitHub

---

## ✅ Passo 1: Preparar o Repositório GitHub

### 1.1 Criar arquivo `.gitignore`

```bash
# Já deve existir, mas verifique se contém:
node_modules/
.env
.env.local
dist/
build/
uploads/
*.log
```

### 1.2 Committar e fazer Push

```bash
cd VIVACIDADE\ BRASIL
git init
git add .
git commit -m "Initial commit - VivaCidade Brasil"
git branch -M main
git remote add origin https://github.com/seu-usuario/vivacidade-brasil.git
git push -u origin main
```

---

## ✅ Passo 2: Deploy do Backend no Render

### 2.1 Criar novo Web Service

1. Acesse https://render.com
2. Clique em "New +" → "Web Service"
3. Selecione seu repositório GitHub
4. Preencha as configurações:
   - **Name**: `vivacidade-backend`
   - **Environment**: `Node`
   - **Region**: Escolha a mais próxima (ex: Ohio)
   - **Branch**: `main`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

### 2.2 Configurar Variáveis de Ambiente

Na seção "Environment" do Render, adicione todas as variáveis:

```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/vivacidade
JWT_SECRET=sua_chave_super_secreta_bem_longa_32_caracteres_ou_mais
STRIPE_PUBLIC_KEY=pk_live_sua_chave_de_producao
STRIPE_SECRET_KEY=sk_live_sua_chave_de_producao
STRIPE_PRICE_START=price_xxxxx
STRIPE_PRICE_PLUS=price_xxxxx
STRIPE_PRICE_ELITE=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://seu-dominio.com
```

### 2.3 Deploy

Clique em "Create Web Service" e aguarde o deploy. Você receberá uma URL:
```
https://vivacidade-backend.onrender.com
```

Salve essa URL! Você precisará dela no frontend.

---

## ✅ Passo 3: Deploy do Frontend no Render (Static Site)

### 3.1 Preparar Build Script

Crie um arquivo `build.sh` na raiz:

```bash
#!/bin/bash
# Nenhum build necessário para HTML/CSS/JS puro
echo "Frontend pronto para servir"
```

### 3.2 Criar Static Site

1. Acesse https://render.com
2. Clique em "New +" → "Static Site"
3. Selecione seu repositório GitHub
4. Preencha as configurações:
   - **Name**: `vivacidade-frontend`
   - **Environment**: deixar em branco (não precisa)
   - **Root Directory**: `.` (raiz do projeto)
   - **Build Command**: `echo "Build completo"`
   - **Publish Directory**: `.`

### 3.3 Deploy

Clique em "Create Static Site" e aguarde. Você receberá uma URL:
```
https://vivacidade-frontend.onrender.com
```

---

## ✅ Passo 4: Atualizar Frontend com URL do Backend

### 4.1 Criar arquivo de configuração

Crie `config.js` na raiz:

```javascript
// Em desenvolvimento
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://vivacidade-backend.onrender.com/api';

// Usar em todos os fetch:
// fetch(`${API_URL}/endpoint`)
```

### 4.2 Atualizar app.js

No início do `app.js`, substitua:

```javascript
// Antes:
const API_URL = 'http://localhost:5000/api';

// Depois:
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://vivacidade-backend.onrender.com/api';
```

Repita para:
- `checkout.html`
- `plans.html`
- `register-business.html`
- `results.html`
- `admin/login.html`
- `admin/dashboard.html`

### 4.3 Git Push

```bash
git add .
git commit -m "Update API URLs for production"
git push
```

O Render.com detectará a mudança e refazer o deploy automaticamente.

---

## ✅ Passo 5: Configurar Webhook Stripe

1. Acesse https://dashboard.stripe.com/webhooks
2. Clique em "Add endpoint"
3. URL: `https://vivacidade-backend.onrender.com/api/payments/webhook`
4. Eventos:
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
5. Copie o "Signing secret" (`whsec_...`)
6. Atualize no Render:
   - Vá em Settings do Web Service backend
   - Edite `STRIPE_WEBHOOK_SECRET`

---

## ✅ Passo 6: Domínio Personalizado (Opcional)

### 6.1 Comprar Domínio

- Namecheap
- GoDaddy
- Google Domains
- Registro.br

### 6.2 Configurar no Render

**Para Frontend:**
1. Vá em Settings → Custom Domain
2. Adicione seu domínio (ex: vivacidade.com.br)
3. Siga as instruções de DNS

**Para Backend:**
1. Vá em Settings → Custom Domain
2. Adicione subdomínio (ex: api.vivacidade.com.br)
3. Configure DNS

---

## ✅ Teste de Produção

### 7.1 Testar Backend

```bash
curl https://vivacidade-backend.onrender.com/api/health
```

Deve retornar:
```json
{"status":"OK","timestamp":"2026-01-13T..."}
```

### 7.2 Testar Frontend

1. Abra https://vivacidade-frontend.onrender.com
2. Procure por empresas
3. Clique em "Para Empresas"
4. Teste o fluxo completo

### 7.3 Testar Pagamento

1. Acesse https://vivacidade-frontend.onrender.com/plans.html
2. Clique em "Escolher Plano"
3. Use cartão de teste Stripe: `4242 4242 4242 4242`
4. Verifique se o pagamento é processado

---

## 🔧 Monitoramento

### Logs do Backend

No Render dashboard:
- Clique em "vivacidade-backend"
- Abra a aba "Logs"
- Veja erros e eventos em tempo real

### Alertas

1. Acesse Settings → Notifications
2. Configure alertas de erro
3. Receba notificações por email

---

## 🆘 Troubleshooting

### Backend não inicia

```
Build failed
```

**Solução:**
- Verificar Build Command: `cd backend && npm install`
- Verificar Start Command: `npm start` (em `backend/`)
- Ver logs em "Build Logs"

### Frontend não carrega

```
404 Not Found
```

**Solução:**
- Verificar Root Directory está em `.`
- Verificar Publish Directory está em `.`
- Arquivos HTML estão no root?

### API não responde

```
CORS error ou 502 Bad Gateway
```

**Solução:**
- Backend está rodando? (check Status)
- FRONTEND_URL está correto em backend?
- Verificar CORS em server.js

### Pagamento não funciona

```
Erro ao processar pagamento
```

**Solução:**
- Verificar STRIPE_SECRET_KEY é de produção (começa com `sk_live_`)
- Webhook está configurado?
- Certificado SSL válido?

---

## 📊 URLs Finais

```
Frontend: https://vivacidade-frontend.onrender.com
Backend: https://vivacidade-backend.onrender.com
API: https://vivacidade-backend.onrender.com/api
Admin: https://vivacidade-frontend.onrender.com/admin/login.html
Planos: https://vivacidade-frontend.onrender.com/plans.html
```

---

## ✅ Checklist Pré-Deploy

- [ ] `.env` tem todas as variáveis
- [ ] MongoDB Atlas conectando
- [ ] Stripe em modo Production
- [ ] GitHub repositório pronto
- [ ] Arquivo `.gitignore` existe
- [ ] Sem arquivos sensíveis no git
- [ ] Testes locais passando
- [ ] URL de webhook Stripe configurada

---

## Próximas Etapas

1. ✅ Deploy concluído
2. 📧 Configurar email (SendGrid)
3. 📊 Adicionar analytics (Google Analytics)
4. 🔍 Otimizar SEO
5. 📱 Testar em mobile

