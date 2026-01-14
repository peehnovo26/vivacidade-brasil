# 🚀 Guia de Instalação Rápida - VivaCidade Brasil

## Opção 1: Instalação Local (Recomendado para Desenvolvimento)

### Pré-requisitos
- **Node.js** 16+ (https://nodejs.org)
- **MongoDB** (Conta gratuita em https://www.mongodb.com/cloud/atlas)
- **Git** (opcional)

### Passos

#### 1. Preparar MongoDB Atlas

1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster (M0 é grátis)
4. Crie um usuário com permissões de leitura/escrita
5. Copie a string de conexão (será algo como: `mongodb+srv://usuario:senha@cluster.mongodb.net/vivacidade`)

#### 2. Configurar Backend

```bash
# 1. Abra terminal na pasta backend
cd backend

# 2. Instale dependências
npm install

# 3. Crie arquivo .env com suas credenciais
# Edite o arquivo .env que já existe e adicione:
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/vivacidade
JWT_SECRET=sua_chave_super_secreta_aqui_pelo_menos_32_caracteres
STRIPE_SECRET_KEY=sk_test_seu_valor
STRIPE_PUBLIC_KEY=pk_test_seu_valor
PORT=5000
NODE_ENV=development
```

#### 3. Iniciar Backend

```bash
# Em desenvolvimento (com auto-reload)
npm run dev

# Ou em produção
npm start
```

Você verá: `Server running on port 5000` ✅

#### 4. Servir Frontend

**Opção A: Com Live Server (VS Code)**
1. Abra a extensão Live Server no VS Code
2. Clique direito em `index.html`
3. Selecione "Open with Live Server"

**Opção B: Com Python**
```bash
python -m http.server 3000
# Acesse em http://localhost:3000
```

**Opção C: Com Node.js (http-server)**
```bash
npm install -g http-server
http-server -p 3000
```

### Testar

1. Abra http://localhost:3000 no navegador
2. Clique em "Para Empresas" ou realize uma busca
3. Vá para http://localhost:3000/admin/login.html para acessar o admin

**Credenciais Admin:**
- Email: `admin@vivacidade.com`
- Senha: `Admin@123`

---

## Opção 2: Com Docker (Recomendado para Produção)

### Pré-requisitos
- **Docker** (https://www.docker.com/products/docker-desktop)

### Passos

```bash
# 1. Na raiz do projeto
docker-compose up

# 2. O MongoDB será iniciado automaticamente
# 3. A API estará em http://localhost:5000
```

---

## Opção 3: Deploy em Produção (Heroku/Render)

### Deploy no Render.com (Gratuito)

1. Faça fork do repositório no GitHub
2. Acesse https://render.com
3. Crie novo "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Build command:** `cd backend && npm install`
   - **Start command:** `npm start`
6. Adicione variáveis de ambiente
7. Deploy!

### Deploy no MongoDB Atlas (Banco de Dados)

Já está configurado se você seguir a Opção 1.

---

## Estrutura de Endpoints Disponíveis

```
API Base: http://localhost:5000/api

AUTENTICAÇÃO
POST   /auth/register         - Registrar usuário
POST   /auth/login            - Fazer login
GET    /auth/me               - Dados do usuário autenticado

EMPRESAS
GET    /businesses            - Listar empresas (com filtros)
GET    /businesses/:id        - Detalhes de uma empresa
POST   /businesses            - Criar empresa
PUT    /businesses/:id        - Editar empresa
DELETE /businesses/:id        - Deletar empresa

ADMIN
GET    /admin/stats           - Estatísticas
GET    /admin/users           - Listar usuários
GET    /admin/businesses      - Listar empresas
PUT    /admin/businesses/:id/feature - Destacar empresa
DELETE /admin/users/:id       - Deletar usuário
```

---

## Troubleshooting

### "Cannot find module 'express'"
```bash
cd backend
npm install
```

### "MongoDB connection error"
- Verifique a string de conexão no `.env`
- Confira se a IP whitelist está configurada em MongoDB Atlas
- Teste a conexão: `mongostat`

### "Port 5000 is already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID XXXX /F

# Mac/Linux
lsof -i :5000
kill -9 XXXX
```

### CORS Error
- Verifique se `frontend.js` está usando `http://localhost:5000` como base URL
- Edite `server.js` se necessário alterar as origens CORS permitidas

---

## Próximos Passos

1. **Customize o conteúdo** - Adicione empresas reais ao banco de dados
2. **Integre Stripe** - Configure chaves reais de pagamento
3. **Configure email** - Adicione envio de confirmações
4. **Deploy** - Coloque em um servidor real
5. **SEO** - Otimize para buscas

---

## Suporte

Para dúvidas, consulte o `README.md` ou abra uma issue no repositório.

**Desenvolvido com ❤️**
