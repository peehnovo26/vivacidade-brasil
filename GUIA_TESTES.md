# ✅ Guia de Testes - VivaCidade Brasil

## Pré-requisitos

- Node.js 16+
- MongoDB Atlas (conta free)
- Stripe Account (free tier)
- Um navegador moderno

## 1️⃣ Configuração Inicial

### MongoDB Atlas

1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster (M0 é grátis)
4. Crie um usuário com senha
5. Copie a string de conexão
6. Substitua em `backend/.env`:
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/vivacidade
```

### Stripe

1. Acesse https://dashboard.stripe.com
2. Copie as chaves de teste (Test mode)
3. Adicione ao `backend/.env`:
```env
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

### Variáveis de Ambiente

Edite `backend/.env`:
```env
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/vivacidade
JWT_SECRET=sua_chave_secreta_de_32_caracteres_ou_mais
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_START=price_xxxxx
STRIPE_PRICE_PLUS=price_xxxxx
STRIPE_PRICE_ELITE=price_xxxxx
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 2️⃣ Iniciar Backend

```bash
cd backend
npm install
npm start
```

Você deve ver:
```
✓ MongoDB connected
✓ Server running on port 5000
✓ API health check: http://localhost:5000/api/health
```

## 3️⃣ Iniciar Frontend

Abra um novo terminal na raiz do projeto:

### Opção A: Python (recomendado)
```bash
python -m http.server 3000
```

### Opção B: Node.js (http-server)
```bash
npm install -g http-server
http-server -p 3000
```

Acesse: http://localhost:3000

## 4️⃣ Testes Funcionais

### ✅ Teste 1: Login Admin

1. Acesse http://localhost:3000
2. Clique em "Para Empresas"
3. Acesse http://localhost:3000/admin/login.html
4. Digite:
   - Email: `admin@vivacidade.com`
   - Senha: `Admin@123`
5. Clique em "Entrar"
6. ✅ Deve aparecer o dashboard admin

### ✅ Teste 2: Buscar Empresas

1. Acesse http://localhost:3000
2. Escolha uma cidade (ex: Resende)
3. Escolha uma categoria (ex: Gastronomia)
4. Clique em "Explorar Agora"
5. ✅ Deve exibir as empresas da seed

### ✅ Teste 3: Ver Planos

1. Acesse http://localhost:3000/plans.html
2. Visualize os 4 planos
3. Clique em "Escolher Plano" em qualquer um
4. ✅ Deve ir para página de checkout

### ✅ Teste 4: Cadastrar Empresa

1. Acesse http://localhost:3000/register-business.html
2. Faça login (email: `user@example.com`, senha: `User@123`)
3. Preencha o formulário:
   - Nome: "Meu Restaurante"
   - Categoria: "Gastronomia"
   - Cidade: "Resende"
   - Descrição: "Um ótimo lugar"
   - Email: seu-email@com.br
   - Telefone: (24) 99999-9999
4. Arraste algumas imagens para upload
5. Clique em "Cadastrar Empresa"
6. ✅ Deve aparecer mensagem de sucesso

### ✅ Teste 5: Pagamento Stripe

1. Acesse http://localhost:3000/plans.html
2. Clique em "Escolher Plano" no Plus (R$ 49,90)
3. Preencha o formulário de checkout:
   - Nome: "Seu Nome"
   - Email: "seu-email@teste.com"
   - CPF: "000.000.000-00"
4. Preencha o cartão:
   - Número: `4242 4242 4242 4242`
   - MM/AA: `12/25` (ou data futura)
   - CVC: `123`
5. Clique em "Confirmar Pagamento"
6. ✅ Deve exibir "Pagamento realizado com sucesso!"

### ✅ Teste 6: Favoritos

1. Acesse http://localhost:3000
2. Clique no coração em qualquer empresa
3. Acesse a seção "Favoritos"
4. ✅ Deve aparecer a empresa marcada

## 5️⃣ Testes de API (via Postman ou cURL)

### Verificar Saúde da API

```bash
curl http://localhost:5000/api/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "timestamp": "2026-01-13T10:00:00Z"
}
```

### Registrar Usuário

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste User",
    "email": "teste@example.com",
    "password": "Teste@123",
    "role": "user"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vivacidade.com",
    "password": "Admin@123"
  }'
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiI...",
  "user": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@vivacidade.com",
    "role": "admin"
  }
}
```

### Listar Empresas

```bash
curl "http://localhost:5000/api/businesses?city=Resende&category=Gastronomia"
```

### Criar Empresa (requer token)

```bash
curl -X POST http://localhost:5000/api/businesses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Novo Restaurante",
    "category": "Gastronomia",
    "city": "Resende",
    "description": "Melhor restaurante da região",
    "email": "contato@restaurante.com",
    "phone": "(24) 99999-9999"
  }'
```

## 6️⃣ Dados de Seed (Já Carregados)

### Usuários de Teste

| Email | Senha | Role |
|-------|-------|------|
| admin@vivacidade.com | Admin@123 | admin |
| user@example.com | User@123 | user |
| business@example.com | Business@123 | business |

### Empresas de Teste

- Hotel Fazenda Serra Verde (Itatiaia, Hospedagem)
- Sabor da Serra (Resende, Gastronomia)
- Parque Nacional do Itatiaia (Itatiaia, Turismo)
- Pousada Vista Linda (Quatis, Hospedagem)
- Café Colonial da Serra (Itatiaia, Gastronomia)
- Cachoeira Escondida (Resende, Turismo)
- Academia Corpo e Mente (Barra Mansa, Serviços)
- Eventos e Festas (Resende, Eventos)

## 7️⃣ Troubleshooting

### MongoDB não conecta

```
❌ MongoDB connection error
```

**Solução:**
- Verificar string MONGODB_URI no .env
- Adicionar seu IP à whitelist em MongoDB Atlas
- Criar um usuário com permissões

### Stripe não funciona

```
❌ Chave Stripe não configurada
```

**Solução:**
- Verificar STRIPE_PUBLIC_KEY e STRIPE_SECRET_KEY no .env
- Usar chaves de teste (começam com pk_test_ e sk_test_)
- Obter em https://dashboard.stripe.com

### CORS error

```
❌ Access to XMLHttpRequest blocked by CORS policy
```

**Solução:**
- Backend está rodando? (http://localhost:5000)
- Frontend está em http://localhost:3000?
- Verificar CORS em server.js

## 8️⃣ Próximas Etapas

1. ✅ Testes locais completos
2. 🚀 Deploy em produção
3. 📊 Monitoramento e analytics
4. 🔄 Melhorias contínuas

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique o arquivo de erro: `backend/logs/error.log`
- Consulte a documentação: `README.md`
- Abra uma issue no repositório

