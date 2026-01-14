# 🎬 COMECE AGORA - Primeiros 10 Minutos

## ⏱️ Passo 1: MongoDB Atlas (2 minutos)

1. Abra https://www.mongodb.com/cloud/atlas
2. Crie conta gratuita (ou faça login)
3. Clique em "Build a Database" → M0 (gratuito)
4. Escolha AWS, região mais próxima
5. Crie usuário com nome: `vivacidade` senha: `sua_senha`
6. Clique em "Connect" → "Drivers" → Copie a URL

**Sua URL terá este formato:**
```
mongodb+srv://vivacidade:sua_senha@cluster0.xxxxx.mongodb.net/vivacidade
```

⏹️ Parou aqui? **Salve a URL com segurança**

---

## ⏱️ Passo 2: Configurar Backend (3 minutos)

1. Abra terminal na pasta `backend`
2. Rode: `npm install`
3. Edite `.env` e cole sua URL MongoDB
4. Também adicione:
   ```
   JWT_SECRET=sua_chave_super_secreta_aqui_min_32_caracteres
   PORT=5000
   ```

✅ **Pronto!**

---

## ⏱️ Passo 3: Popular Banco de Dados (1 minuto)

```bash
cd backend
npm run seed
```

Você verá:
```
✓ Admin user created
✓ Test user created
✓ 8 businesses created
✅ Database seeding completed successfully!
```

✅ **Banco populado!**

---

## ⏱️ Passo 4: Iniciar Backend (1 minuto)

```bash
npm run dev
```

Você verá:
```
MongoDB connected
Server running on port 5000
```

✅ **Backend rodando!**

---

## ⏱️ Passo 5: Frontend (2 minutos)

Abra outra aba do terminal (deixe backend rodando):

**Opção A - Live Server (VS Code)**
- Clique direito em `index.html`
- "Open with Live Server"
- Browser abre em http://localhost:5500

**Opção B - Python**
```bash
python -m http.server 3000
# Abre em http://localhost:3000
```

✅ **Tudo rodando!**

---

## 🧪 Teste Agora

### 1. Página Inicial
- Abra http://localhost:3000 (ou 5500)
- Veja as 5 cidades
- Clique em "Explorar Agora"

### 2. Ver Empresas
- Aparecem 8 empresas de teste
- Clique em uma para ver detalhes
- Adicione aos favoritos ❤️

### 3. Login de Usuário
- Clique em "Para Empresas"
- Email: `user@vivacidade.com`
- Senha: `User@123`

### 4. Painel Admin
- Vá para http://localhost:3000/admin/login.html
- Email: `admin@vivacidade.com`
- Senha: `Admin@123`
- Veja stats em tempo real!

---

## 📊 O que você verá

### Frontend
- ✅ 5 cidades do Sul Fluminense
- ✅ 8 empresas de teste
- ✅ Busca por categoria
- ✅ Filtro por cidade
- ✅ Sistema de favoritos
- ✅ Detalhes de empresas

### Admin
- ✅ Dashboard com 4 estatísticas
- ✅ Tabela de usuários
- ✅ Tabela de empresas
- ✅ Botões de ação
- ✅ Interface profissional

### API
- ✅ `/api/auth/login` - Funciona
- ✅ `/api/businesses` - Retorna 8 empresas
- ✅ `/api/admin/stats` - Retorna estatísticas
- ✅ `/api/admin/users` - Lista 2 usuários
- ✅ Todos os endpoints prontos

---

## 🎯 Próximos Passos (Depois)

### Curto Prazo
- [ ] Adicionar empresas reais
- [ ] Cadastrar seus contatos
- [ ] Customizar descrições
- [ ] Adicionar fotos

### Médio Prazo
- [ ] Integrar Stripe com chaves reais
- [ ] Testar fluxo de pagamento
- [ ] Criar conta bancária
- [ ] Começar a vender planos

### Longo Prazo
- [ ] Deploy em servidor real
- [ ] Configurar domínio próprio
- [ ] Marketing
- [ ] App mobile

---

## ⚠️ Se Algo Não Funcionar

### "MongoDB connection error"
```bash
# Verifique a URL em .env
# Verifique IP whitelist no MongoDB Atlas
# Teste no terminal: ping cluster0.xxxxx.mongodb.net
```

### "Port 5000 already in use"
```bash
# Feche o servidor anterior
# Ou mude a porta em .env: PORT=5001
```

### "Cannot find module"
```bash
# Na pasta backend, rode:
npm install
```

### "Website não carrega"
```bash
# Verifique se backend está rodando (porta 5000)
# Verifique console do browser (F12)
# Verifique CORS em server.js
```

---

## 📱 Funcionalidades para Testar

### Como Usuário
1. ✅ Registre-se com email novo
2. ✅ Faça login
3. ✅ Busque empresas
4. ✅ Adicione aos favoritos
5. ✅ Veja detalhes (telefone, email, website)

### Como Admin
1. ✅ Veja total de usuários
2. ✅ Veja total de empresas
3. ✅ Veja usuários premium
4. ✅ Clique em "Feature" para destacar empresa
5. ✅ Veja mudanças em tempo real

### Como Desenvolvedor
1. ✅ Abra DevTools (F12)
2. ✅ Vá para Network
3. ✅ Faça uma busca
4. ✅ Veja requisições para http://localhost:5000
5. ✅ Inspecione responses

---

## 🔍 Arquivos Importantes

```
VIVACIDADE BRASIL/
├── backend/
│   ├── server.js          ← BACKEND PRINCIPAL
│   ├── .env               ← CONFIGURAÇÃO (salve a URL aqui)
│   └── seed.js            ← Dados de teste
├── index.html             ← FRONTEND PRINCIPAL
├── app.js                 ← Lógica da app
├── admin/
│   ├── login.html         ← LOGIN ADMIN
│   └── dashboard.html     ← PAINEL ADMIN
├── README.md              ← Documentação
└── INSTALACAO_RAPIDA.md   ← Guia completo
```

---

## 💬 Commands Úteis

```bash
# Iniciar backend
npm run dev

# Popular banco
npm run seed

# Resetar banco
npm run seed  # Roda novamente

# Criar nova empresa (via API)
curl -X POST http://localhost:5000/api/businesses \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category":"Test"}'
```

---

## ✅ Checklist de Verificação

- [ ] Criei conta MongoDB Atlas
- [ ] Copiei URL de conexão
- [ ] Editei arquivo .env
- [ ] Rodei `npm install` no backend
- [ ] Rodei `npm run seed`
- [ ] Backend está rodando (porta 5000)
- [ ] Frontend está rodando (porta 3000)
- [ ] Vejo empresas na página inicial
- [ ] Consigo fazer login
- [ ] Consigo acessar painel admin
- [ ] Consigo adicionar aos favoritos

✅ **Se marcou tudo, PARABÉNS!** 🎉

---

## 🚀 Você Está Pronto!

Agora você tem:
- ✅ Plataforma rodando localmente
- ✅ Banco de dados populado
- ✅ Admin funcionando
- ✅ Tudo pronto para customizar

**Próximo passo: Adicione suas empresas reais!**

---

## 📚 Mais Informações

- **Documentação completa**: Veja `README.md`
- **Exemplos de API**: Veja `API_EXEMPLOS.md`
- **Estrutura do projeto**: Veja `RESUMO_ESTRUTURA.md`
- **Checklist de features**: Veja `CHECKLIST_IMPLEMENTACAO.md`

---

## 🎉 Bem-vindo ao VivaCidade Brasil!

Desenvolvido com ❤️ para transformar ideia em realidade.

**Boa sorte com seu projeto! 🚀**

*Criado em: 13 de janeiro de 2026*
