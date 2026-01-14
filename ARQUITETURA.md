# 📦 Estrutura Completa do Projeto VivaCidade Brasil

## 🌳 Árvore de Diretórios

```
VIVACIDADE BRASIL/
│
├── 📄 index.html                 (Frontend principal - 1321 linhas)
├── 📄 app.js                     (Lógica da aplicação)
├── 📄 results.html               (Página de resultados)
├── 📄 script.js                  (Zerado para novo início)
│
├── 📁 backend/
│   ├── 📄 server.js              (Express server principal)
│   ├── 📄 seed.js                (Popula DB com dados)
│   ├── 📄 package.json           (Dependências)
│   ├── 📄 .env                   (Configuração)
│   ├── 📄 Dockerfile             (Para containerização)
│   │
│   ├── 📁 models/
│   │   ├── 📄 User.js            (Schema de usuários)
│   │   ├── 📄 Business.js        (Schema de empresas)
│   │   ├── 📄 Review.js          (Schema de avaliações)
│   │   └── 📄 Event.js           (Schema de eventos)
│   │
│   ├── 📁 routes/
│   │   ├── 📄 auth.js            (Login, Registro)
│   │   ├── 📄 businesses.js      (CRUD de empresas)
│   │   ├── 📄 payments.js        (Stripe, Assinaturas)
│   │   └── 📄 admin.js           (Gerenciamento admin)
│   │
│   └── 📁 middleware/
│       └── 📄 auth.js            (Verificação JWT)
│
├── 📁 admin/
│   ├── 📄 login.html             (Login para admin)
│   └── 📄 dashboard.html         (Painel administrativo)
│
├── 📄 docker-compose.yml         (Docker + MongoDB)
│
├── 📚 Documentação/
│   ├── 📄 README.md              (Principal)
│   ├── 📄 INSTALACAO_RAPIDA.md   (Setup rápido)
│   ├── 📄 COMECE_AGORA.md        (Primeiros 10 min)
│   ├── 📄 RESUMO_ESTRUTURA.md    (Visão geral)
│   ├── 📄 API_EXEMPLOS.md        (Endpoints com cURL)
│   └── 📄 CHECKLIST_IMPLEMENTACAO.md (Features)
│
└── 📄 .gitignore                 (Git ignore)
```

---

## 🔗 Conexões Entre Componentes

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (index.html)                │
│  - Hero Section                                          │
│  - Busca & Filtros                                       │
│  - Lista de Empresas                                     │
│  - Detalhes de Empresa                                   │
│  - Sistema de Favoritos                                  │
└─────────────────┬───────────────────────────────────────┘
                  │ Fetch API + JWT Token
                  ↓
┌─────────────────────────────────────────────────────────┐
│              BACKEND (server.js - Port 5000)             │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Express Routes                                  │   │
│  ├── /api/auth (login, register)                   │   │
│  ├── /api/businesses (CRUD + filtros)             │   │
│  ├── /api/payments (Stripe)                        │   │
│  └── /api/admin (gerenciamento)                    │   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Middleware                                      │   │
│  └── JWT Verificação + Autenticação                │   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Models (Mongoose)                              │   │
│  └── User | Business | Review | Event             │   │
└─────────────────┬───────────────────────────────────────┘
                  │ Mongoose ODM
                  ↓
┌─────────────────────────────────────────────────────────┐
│          DATABASE (MongoDB - via MongoDB Atlas)          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Collections                                     │   │
│  ├── users (127 usuários)                          │   │
│  ├── businesses (45+ empresas)                     │   │
│  ├── reviews (avaliações)                          │   │
│  └── events (eventos)                              │   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         ADMIN DASHBOARD (admin/dashboard.html)           │
│  - Login Admin                                           │
│  - Estatísticas                                          │
│  - Gerenciar Usuários                                    │
│  - Gerenciar Empresas                                    │
│  - Sistema de Featured                                   │
└─────────────────┬───────────────────────────────────────┘
                  │ Mesma API + Admin Token
                  ↓
          (Backend + Database)
```

---

## 📊 Fluxo de Dados

### 1. Usuário Fazendo Busca
```
Frontend (index.html)
    ↓
Usuário clica "Explorar"
    ↓
app.js: performSearch()
    ↓
Fetch POST /api/businesses
    ↓
Backend: router.get('/businesses')
    ↓
Query MongoDB
    ↓
Retorna Array de Empresas
    ↓
Frontend: displayBusinesses()
    ↓
Renderiza cards com Tailwind CSS
```

### 2. Usuário Fazendo Login
```
Frontend: handleLogin()
    ↓
Fetch POST /api/auth/login
    ↓
Backend: Check email + comparePassword
    ↓
Gera JWT Token
    ↓
Retorna { token, user }
    ↓
localStorage.setItem('token')
    ↓
Frontend: updateAuthUI()
    ↓
Mostra nome do usuário no header
```

### 3. Admin Acessando Dashboard
```
Admin acessa /admin/login.html
    ↓
Verifica se tem token_admin no localStorage
    ↓
Se não, mostra login
    ↓
Admin faz login
    ↓
Fetch GET /api/admin/stats com JWT
    ↓
Backend verifica role === 'admin'
    ↓
Retorna { totalUsers, totalBusinesses, ... }
    ↓
dashboard.html renderiza gráficos
```

---

## 🗄️ Estrutura de Dados

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'business' | 'admin',
  phone: String,
  avatar: String,
  favorites: [ObjectId], // referência a Business
  subscription: {
    plan: 'free' | 'plus' | 'elite',
    status: 'active' | 'canceled',
    stripeCustomerId: String,
    expiresAt: Date
  },
  createdAt: Date
}
```

### Business Schema
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  city: String,
  description: String,
  images: [String],
  address: String,
  phone: String,
  email: String,
  website: String,
  rating: Number,
  plan: 'free' | 'plus' | 'elite',
  owner: ObjectId, // referência a User
  featured: Boolean,
  discount: Number,
  tags: [String],
  openingHours: Object,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Autenticação & Segurança

### JWT Token Flow
```
Login → Generate JWT → Send to Frontend
                              ↓
              localStorage.setItem('token')
                              ↓
         Include in Authorization Header
                              ↓
         Backend verifies with jwt.verify()
                              ↓
         If valid, allows access
         If invalid, returns 401
```

### Roles & Permissões
```
┌─────────────┬─────────────────────────────────────┐
│ Role        │ Permissões                          │
├─────────────┼─────────────────────────────────────┤
│ user        │ Ver empresas, favoritos, profile    │
│ business    │ Criar/editar própria empresa       │
│ admin       │ Tudo - gerenciar tudo              │
└─────────────┴─────────────────────────────────────┘
```

---

## 💾 Banco de Dados - Cidades & Categorias

### Cidades
- 🏘️ Quatis
- 🏭 Porto Real
- 🌆 Resende
- ⛰️ Itatiaia
- 🌉 Barra Mansa

### Categorias
- 🏨 Hospedagem
- 🍽️ Gastronomia
- 🏞️ Turismo e Lazer
- 🎉 Eventos
- 🛒 Comércio e Serviços

### Planos
- **Free** - Básico, sem destaque
- **Plus** - R$ 299/mês, algumas features
- **Elite** - R$ 599/mês, todas features

---

## 🔄 Ciclo de Vida de uma Requisição

```
1. CLIENTE (Browser)
   └─ Usuário clica em algo
   └─ JavaScript captura evento
   └─ Fetch envia requisição HTTP

2. NETWORK
   └─ Requisição vai para localhost:5000
   └─ Headers incluem JWT token
   └─ Body contém dados (JSON)

3. SERVIDOR (Express)
   └─ Router captura rota
   └─ Middleware valida token
   └─ Controller processa lógica
   └─ Model executa query no DB

4. DATABASE (MongoDB)
   └─ Executa query
   └─ Retorna documento(s)
   └─ Mongoose formata resposta

5. SERVIDOR (Express)
   └─ Controller formata resposta
   └─ Retorna JSON com status 200/400/401

6. REDE
   └─ Resposta volta para Cliente

7. CLIENTE (Browser)
   └─ JavaScript recebe resposta
   └─ app.js processa dados
   └─ DOM atualizado com Tailwind CSS
   └─ Usuário vê resultado
```

---

## 📱 Responsividade

### Breakpoints Tailwind
```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  > 1024px
```

### Exemplo (index.html)
```html
<!-- Em Mobile: 2 colunas -->
<!-- Em Desktop: 5 colunas -->
<div class="grid grid-cols-2 lg:grid-cols-5">

<!-- Em Mobile: 100% width -->
<!-- Em Desktop: 400px -->
<input class="w-full sm:w-96">
```

---

## 🧪 Como Testar

### Test 1: Usuário Novo
```
1. Abra http://localhost:3000
2. Clique em "Para Empresas"
3. Clique em "Registre-se"
4. Preencha formulário
5. Sistema deve criar usuário e fazer login
6. Deve aparecer nome no header
```

### Test 2: Busca
```
1. Na página inicial, clique em "Explorar"
2. Deve listar 8 empresas de teste
3. Clique em uma empresa
4. Deve ver detalhes (telefone, email, etc)
```

### Test 3: Admin
```
1. Vá para /admin/login.html
2. Email: admin@vivacidade.com
3. Senha: Admin@123
4. Deve ver dashboard com 4 estatísticas
5. Clique em "Empresas"
6. Deve ver tabela com 8 empresas
```

### Test 4: API direto
```bash
# Terminal - Listar empresas
curl http://localhost:5000/api/businesses

# Terminal - Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vivacidade.com","password":"Admin@123"}'
```

---

## 📈 Escalabilidade

### Quando crescer...

```
Usuários: Cada 10k → Adicione índices MongoDB
Dados: Cada 100MB → Configure backups
Tráfego: Cada 1k req/s → Adicione Redis cache
Performance: Se lento → Use CDN para imagens
```

---

## 🎯 Próximos Passos

1. **Customizar**: Adicione suas empresas reais
2. **Testar**: Valide todos os endpoints
3. **Deploy**: Configure servidor real
4. **Marketing**: Comece a vender planos
5. **Melhorar**: Implemente features adicionais

---

*Documentação técnica do VivaCidade Brasil*
*Criado em: 13 de janeiro de 2026*
