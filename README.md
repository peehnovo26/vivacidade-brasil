# VivaCidade Brasil - Plataforma Profissional

Uma plataforma completa de guia comercial para as 5 cidades do Sul Fluminense com sistema de planos pagos, autenticação e painel administrativo funcional.

## 🚀 Características

✅ **Sistema de Autenticação** - Login/Registro com JWT  
✅ **Painel Admin** - Gerenciamento total da plataforma  
✅ **Planos Pagos** - Free, Plus e Elite com integração Stripe  
✅ **Listagem de Empresas** - Com filtros por cidade e categoria  
✅ **Sistema de Favoritos** - Salve seus locais preferidos  
✅ **Avaliações** - Classifique e comente sobre empresas  
✅ **Responsive Design** - Funciona em mobile e desktop  

## 📁 Estrutura do Projeto

```
VIVACIDADE BRASIL/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Business.js
│   │   ├── Review.js
│   │   └── Event.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── businesses.js
│   │   ├── payments.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── admin/
│   ├── login.html
│   └── dashboard.html
├── index.html
├── app.js
└── README.md
```

## 🛠️ Instalação e Configuração

### 1. Configurar MongoDB

Você precisa de um banco de dados MongoDB. Opções:
- **MongoDB Atlas** (recomendado - gratuito): https://www.mongodb.com/cloud/atlas
- **MongoDB Local**: Instale em seu computador

### 2. Instalar Backend

```bash
cd backend
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend/`:

```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/vivacidade
JWT_SECRET=sua_chave_jwt_super_secreta_aqui_min_32_caracteres
STRIPE_SECRET_KEY=sk_test_seu_valor_aqui
STRIPE_PUBLIC_KEY=pk_test_seu_valor_aqui
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Iniciar Servidor

```bash
npm start
# ou em desenvolvimento com auto-reload:
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

### 5. Servir o Frontend

Use um servidor local (recomendado: Live Server do VS Code):
- Abra o arquivo `index.html` com Live Server
- Ou use: `python -m http.server 3000` (Python 3)

## 🔑 Credenciais de Teste

### Admin
- Email: `admin@vivacidade.com`
- Senha: `Admin@123`

### Usuário Regular
- Email: `user@vivacidade.com`
- Senha: `User@123`

## 📝 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter usuário atual

### Empresas
- `GET /api/businesses` - Listar empresas (com filtros)
- `GET /api/businesses/:id` - Detalhes de uma empresa
- `POST /api/businesses` - Criar empresa (requer autenticação)
- `PUT /api/businesses/:id` - Atualizar empresa
- `DELETE /api/businesses/:id` - Deletar empresa

### Pagamentos
- `POST /api/payments/subscribe` - Criar assinatura Stripe
- `POST /api/payments/webhook` - Webhook do Stripe
- `GET /api/payments/status` - Status da assinatura
- `POST /api/payments/cancel` - Cancelar assinatura

### Admin
- `GET /api/admin/stats` - Estatísticas do dashboard
- `GET /api/admin/users` - Listar usuários
- `GET /api/admin/businesses` - Listar empresas
- `PUT /api/admin/businesses/:id/feature` - Destacar empresa
- `DELETE /api/admin/users/:id` - Deletar usuário
- `DELETE /api/admin/businesses/:id` - Deletar empresa

## 🎯 Próximas Melhorias

- [ ] Integração completa com Stripe
- [ ] Upload de imagens para empresas
- [ ] Sistema de eventos
- [ ] Chat em tempo real
- [ ] Dashboard de vendas mais detalhado
- [ ] Exportar relatórios em PDF
- [ ] Push notifications
- [ ] App mobile com React Native

## 🚨 Importante - Segurança

⚠️ **Antes de colocar em produção:**

1. Altere a `JWT_SECRET` para uma chave aleatória forte
2. Configure variáveis de ambiente REAIS (não use os valores de teste)
3. Implante o certificado SSL/HTTPS
4. Configure CORS corretamente para seus domínios
5. Valide todos os inputs no backend
6. Configure rate limiting
7. Adicione logs e monitoramento

## 📦 Dependências Principais

### Backend
- **Express** - Framework web
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Stripe** - Processamento de pagamentos
- **BCrypt** - Hash de senhas

### Frontend
- **Tailwind CSS** - Estilização
- **Fetch API** - Requisições HTTP

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Sinta-se livre para sugerir melhorias!

## 📞 Suporte

Para questões técnicas ou sugestões, entre em contato.

---

**Desenvolvido com ❤️ para VivaCidade Brasil**
