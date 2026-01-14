# 📚 Exemplos de Uso da API

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Autenticação

### 1. Registrar Novo Usuário

**Request:**
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "Senha@123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "user"
  }
}
```

### 2. Login

**Request:**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "password": "Senha@123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "user",
    "subscription": {
      "plan": "free",
      "status": "active"
    }
  }
}
```

### 3. Obter Dados do Usuário Autenticado

**Request:**
```bash
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "user",
  "phone": "(24) 98765-4321",
  "favorites": [],
  "subscription": {
    "plan": "free",
    "status": "active"
  }
}
```

---

## 🏢 Empresas

### 1. Listar Empresas

**Request (Sem Filtros):**
```bash
GET /businesses
```

**Request (Com Filtros):**
```bash
GET /businesses?city=Resende&category=Gastronomia&search=pizza
```

**Query Parameters:**
- `city` - Filtrar por cidade
- `category` - Filtrar por categoria
- `search` - Buscar por nome/descrição
- `plan` - Filtrar por plano (free, plus, elite)

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Sabor da Serra",
    "category": "Gastronomia",
    "city": "Resende",
    "description": "Culinária regional com ingredientes orgânicos da fazenda própria.",
    "address": "Rua Principal, 123 - Resende",
    "phone": "(24) 3354-5678",
    "email": "contato@sabordaserra.com.br",
    "website": "https://www.sabordaserra.com.br",
    "rating": 4.8,
    "plan": "plus",
    "featured": true,
    "discount": 0,
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Maria Empresária",
      "email": "maria@sabordaserra.com.br"
    }
  }
]
```

### 2. Obter Detalhes de Uma Empresa

**Request:**
```bash
GET /businesses/507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Sabor da Serra",
  "category": "Gastronomia",
  "city": "Resende",
  "description": "Culinária regional com ingredientes orgânicos da fazenda própria.",
  "address": "Rua Principal, 123 - Resende",
  "phone": "(24) 3354-5678",
  "email": "contato@sabordaserra.com.br",
  "website": "https://www.sabordaserra.com.br",
  "rating": 4.8,
  "plan": "plus",
  "featured": true,
  "reviews": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "rating": 5,
      "comment": "Ótimo atendimento!",
      "user": {
        "name": "João Silva"
      }
    }
  ],
  "owner": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Maria Empresária",
    "email": "maria@sabordaserra.com.br",
    "phone": "(24) 3354-5678"
  }
}
```

### 3. Criar Nova Empresa

**Request:**
```bash
POST /businesses
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Meu Restaurante",
  "category": "Gastronomia",
  "city": "Itatiaia",
  "description": "Um ótimo lugar para comer",
  "address": "Avenida Principal, 456",
  "phone": "(24) 3352-9999",
  "email": "contato@restaurante.com.br",
  "website": "https://www.restaurante.com.br"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Meu Restaurante",
  "category": "Gastronomia",
  "city": "Itatiaia",
  "description": "Um ótimo lugar para comer",
  "address": "Avenida Principal, 456",
  "phone": "(24) 3352-9999",
  "email": "contato@restaurante.com.br",
  "website": "https://www.restaurante.com.br",
  "rating": 0,
  "plan": "free",
  "featured": false,
  "owner": "507f1f77bcf86cd799439011"
}
```

### 4. Editar Empresa

**Request:**
```bash
PUT /businesses/507f1f77bcf86cd799439020
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "description": "Um lugar excelente para comer e relaxar",
  "discount": 15
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Meu Restaurante",
  "description": "Um lugar excelente para comer e relaxar",
  "discount": 15,
  "..."
}
```

### 5. Deletar Empresa

**Request:**
```bash
DELETE /businesses/507f1f77bcf86cd799439020
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "msg": "Business removed"
}
```

---

## 💳 Pagamentos (Stripe)

### 1. Criar Assinatura

**Request:**
```bash
POST /payments/subscribe
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "plan": "plus"
}
```

**Options de Plano:**
- `plus` - R$ 299/mês
- `elite` - R$ 599/mês

**Response (200):**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### 2. Obter Status da Assinatura

**Request:**
```bash
GET /payments/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "plan": "plus",
  "status": "active",
  "stripeCustomerId": "cus_...",
  "stripeSubscriptionId": "sub_...",
  "expiresAt": "2025-02-13T10:30:00.000Z"
}
```

### 3. Cancelar Assinatura

**Request:**
```bash
POST /payments/cancel
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "msg": "Subscription canceled"
}
```

---

## 👨‍💼 Admin

### 1. Obter Estatísticas

**Request:**
```bash
GET /admin/stats
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "totalUsers": 127,
  "totalBusinesses": 45,
  "totalEvents": 12,
  "premiumUsers": 18
}
```

### 2. Listar Todos os Usuários

**Request:**
```bash
GET /admin/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "user",
    "subscription": {
      "plan": "free",
      "status": "active"
    }
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Maria Empresária",
    "email": "maria@empresa.com",
    "role": "business",
    "subscription": {
      "plan": "plus",
      "status": "active"
    }
  }
]
```

### 3. Listar Todas as Empresas

**Request:**
```bash
GET /admin/businesses
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Sabor da Serra",
    "category": "Gastronomia",
    "city": "Resende",
    "plan": "plus",
    "rating": 4.8,
    "featured": true,
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Maria Empresária",
      "email": "maria@sabordaserra.com.br"
    }
  }
]
```

### 4. Destacar/Desdestacar Empresa

**Request:**
```bash
PUT /admin/businesses/507f1f77bcf86cd799439011/feature
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Sabor da Serra",
  "featured": false
}
```

### 5. Deletar Usuário

**Request:**
```bash
DELETE /admin/users/507f1f77bcf86cd799439011
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "msg": "User deleted"
}
```

---

## 🧪 Testes com cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vivacidade.com","password":"Admin@123"}'
```

### Listar Empresas
```bash
curl http://localhost:5000/api/businesses?city=Resende
```

### Criar Empresa (requer token)
```bash
curl -X POST http://localhost:5000/api/businesses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Meu Negócio",
    "category": "Gastronomia",
    "city": "Resende",
    "description": "Descrição"
  }'
```

---

## 🔄 Fluxo Típico de Uso

### 1. Usuário Regular
```
1. Registrar em /auth/register
2. Fazer login em /auth/login
3. Buscar empresas em GET /businesses
4. Ver detalhes em GET /businesses/:id
5. Adicionar favoritos (localStorage)
```

### 2. Proprietário de Empresa
```
1. Registrar com role="business" em /auth/register
2. Fazer login em /auth/login
3. Criar empresa em POST /businesses
4. Escolher plano em POST /payments/subscribe
5. Editar empresa em PUT /businesses/:id
6. Ver avaliações em GET /businesses/:id
```

### 3. Admin
```
1. Fazer login com admin@vivacidade.com
2. Ver stats em GET /admin/stats
3. Gerenciar usuários em GET /admin/users
4. Gerenciar empresas em GET /admin/businesses
5. Destacar empresa em PUT /admin/businesses/:id/feature
6. Deletar usuário em DELETE /admin/users/:id
```

---

## ⚠️ Erros Comuns

### 401 - Token Inválido
```json
{
  "error": "Token is not valid"
}
```
**Solução:** Verifique se o token no header Authorization está correto

### 403 - Não Autorizado
```json
{
  "error": "Access denied"
}
```
**Solução:** Apenas admins podem acessar rotas `/admin`

### 404 - Não Encontrado
```json
{
  "error": "Business not found"
}
```
**Solução:** Verifique se o ID existe

### 400 - Bad Request
```json
{
  "error": "User already exists"
}
```
**Solução:** Verifique os dados enviados

---

## 📝 Dicas Úteis

1. **Guarde seu token** após login para fazer requisições autenticadas
2. **Use variáveis de ambiente** para guardar URLs de API
3. **Trate erros** adequadamente no frontend
4. **Valide dados** antes de enviar
5. **Use filtros** para reduzir dados retornados
6. **Teste com cURL** antes de integrar no código

---

*Desenvolvido para facilitar a integração com a API VivaCidade Brasil*
