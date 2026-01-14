# 🚀 DEPLOY VIVACIDADE BRASIL - RENDER.COM

## PASSO 1: PREPARAR PROJETO PARA DEPLOY

### 1.1 Verificar package.json
```json
{
  "name": "vivacidade-brasil-api",
  "version": "1.0.0",
  "description": "Platform for tourism businesses in southern Rio cities",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### 1.2 Criar arquivo .env.example (NÃO adicionar secrets reais)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=sua_chave_jwt_segura
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_PRICE_START=price_xxx
STRIPE_PRICE_PLUS=price_xxx
STRIPE_PRICE_ELITE=price_xxx
NODE_ENV=production
PORT=3000
CLOUDINARY_CLOUD_NAME=seu_cloud
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_secret
```

---

## PASSO 2: CRIAR CONTA NO RENDER.COM

1. Acesse: https://render.com
2. Clique em "Get Started"
3. Registre com GitHub (recomendado)
4. Autorize Render acessar seus repositórios

---

## PASSO 3: DEPLOY DO BACKEND

### 3.1 Criar novo Web Service
```
1. Dashboard → New +
2. Selecione "Web Service"
3. Conecte seu repositório GitHub
4. Autorize se necessário
```

### 3.2 Configurar Deploy
```
Name: vivacidade-brasil-api
Environment: Node
Region: Ohio ou São Paulo
Branch: main
Build Command: npm install
Start Command: npm start
```

### 3.3 Adicionar Environment Variables

Clique em "Environment" e adicione:

```
MONGODB_URI = mongodb+srv://peehbrasil_db_user:HotjKqHapxybLEjc@cluster0.aa4mi8f.mongodb.net/vivacidade?retryWrites=true&w=majority

JWT_SECRET = sua_chave_jwt_super_secreta_aqui

STRIPE_SECRET_KEY = sk_test_51SpIStQqMMPl7UaNa9LfKOwt4leWJNv6xnB0hBETNiaByHlNrViAN72eArp6UXFcyloqg62SZfCgYwRJ7JITpY3n00GhWTq003

STRIPE_PUBLIC_KEY = pk_test_51SpIStQqMMPl7UaNm4FRrPE4LA3MMHjDhVdh4IRHMLvVes1yhayP6PqytBLwGk0I13ZuMJoziXUjR9Z0S4F1TRF800JJpblrM1

STRIPE_PRICE_START = price_1SpIyhQqMMPl7UaN2qOY7fMv

STRIPE_PRICE_PLUS = price_1SpIzsQqMMPl7UaNyq3OUXvw

STRIPE_PRICE_ELITE = price_1SpJ0nQqMMPl7UaNKFUPuDL3

CLOUDINARY_CLOUD_NAME = dxfgvwgre

CLOUDINARY_API_KEY = 411857641626289

CLOUDINARY_API_SECRET = pSs802Nc4fIha3ukhORDz6BwfJQ

NODE_ENV = production

PORT = 3000
```

### 3.4 Deploy
```
Clique em "Create Web Service"
Aguarde build (2-5 minutos)
Copie a URL que aparece: https://vivacidade-brasil-api.onrender.com
```

---

## PASSO 4: DEPLOY DO FRONTEND

### 4.1 Atualizar URLs da API

Vá no arquivo index.html e altere:

```javascript
// Encontre:
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://vivacidade-backend.onrender.com/api';

// Para:
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://vivacidade-brasil-api.onrender.com/api'; // URL do seu backend no Render
```

### 4.2 Fazer Commit e Push

```bash
git add .
git commit -m "🚀 Atualizar URLs para Render deploy"
git push origin main
```

### 4.3 Deploy Frontend (Static Site)

```
1. Dashboard → New +
2. Selecione "Static Site"
3. Conecte GitHub
4. Autorize
```

### 4.4 Configurar Static Site
```
Name: vivacidade-brasil-web
Environment: (deixar em branco)
Region: Ohio
Branch: main
Build Command: (deixar vazio)
Publish Directory: ./
```

### 4.5 Deploy
```
Clique em "Create Static Site"
Aguarde deploy (1-2 minutos)
Copie a URL: https://vivacidade-brasil-web.onrender.com
```

---

## PASSO 5: TESTAR DEPLOY

### 5.1 Verificar Backend
```
Acesse: https://vivacidade-brasil-api.onrender.com/api/health
Deve retornar: { "status": "Server is running" }
```

### 5.2 Verificar Frontend
```
Acesse: https://vivacidade-brasil-web.onrender.com/
Deve carregar a página inicial
```

### 5.3 Testar Fluxo Completo
```
1. Acesse a URL do frontend
2. Registre um usuário
3. Faça login
4. Registre um negócio
5. Upload de fotos
6. Verifique no Cloudinary
```

---

## PASSO 6: CONFIGURAR DOMÍNIO CUSTOMIZADO

### 6.1 (Opcional) Comprar Domínio
```
Recomendado: Namecheap, GoDaddy, Google Domains
Ex: vivacidade-brasil.com.br
Custo: ~R$ 30-50/ano
```

### 6.2 Adicionar Domínio no Render
```
Backend:
1. Vá em Settings
2. Clique em "Custom Domain"
3. Adicione: api.vivacidade-brasil.com.br
4. Copie os registros DNS

Frontend:
1. Vá em Settings
2. Clique em "Custom Domain"
3. Adicione: vivacidade-brasil.com.br
4. Copie os registros DNS
```

### 6.3 Apontar DNS (no Namecheap/GoDaddy)
```
1. Vá em Advanced DNS
2. Adicione os registros CNAME fornecidos pelo Render
3. Aguarde propagação (até 24h)
```

---

## PASSO 7: MONITORAR LOGS

### No Render Dashboard:
```
1. Clique no Web Service
2. Vá em "Logs"
3. Veja erros em tempo real
4. Monitore performance
```

---

## ⚠️ PROBLEMAS COMUNS

### "Cannot GET /"
- Certifique-se que o frontend URL aponta para Render
- Limpe cache do navegador (Ctrl+Shift+Delete)

### "Connection refused"
- Verifique variáveis de ambiente
- MongoDB URI deve estar correta
- Cloudinary credentials corretos

### "CORS Error"
- Adicione origem no backend (já configurado)
- Se ainda tiver erro, adicione no server.js:
```javascript
app.use(cors({
  origin: ['https://vivacidade-brasil-web.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
```

### Servidor desliga após 15 minutos (free tier)
- Upgrade para plano pago (recomendado)
- Ou adicione Health Check a cada 10 minutos
- Render fornece 750 horas gratuitas/mês

---

## 📊 CHECKLIST DE DEPLOY

- [ ] GitHub repository criado e sincronizado
- [ ] package.json com "start" script
- [ ] Variáveis de ambiente preparadas
- [ ] MongoDB URI testada
- [ ] Cloudinary credenciais verificadas
- [ ] Stripe keys adicionadas
- [ ] Backend deployado no Render
- [ ] Frontend URLs atualizadas
- [ ] Frontend deployado no Render
- [ ] URLs da API testadas
- [ ] Fluxo completo (registrar → login → negócio → upload) testado
- [ ] Logs monitorados
- [ ] Domínio configurado (opcional)

---

## 🎉 SUCESSO!

Seu projeto está no ar! 🚀

**URLs em Produção:**
```
Backend: https://vivacidade-brasil-api.onrender.com
Frontend: https://vivacidade-brasil-web.onrender.com
```

**Próximas etapas:**
1. Testar com usuários
2. Coletar feedback
3. Iterar e melhorar
4. Comprar domínio customizado
5. Escalar para mais cidades

---

**Criado em:** 14 de janeiro de 2026
**Plataforma:** VivaCidade Brasil - Tourism Platform
