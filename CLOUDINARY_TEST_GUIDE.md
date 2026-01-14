# 🚀 TESTE MANUAL - CLOUDINARY + VIVACIDADE BRASIL

## ✅ STATUS ATUAL
- ✅ Backend rodando na porta 5000
- ✅ MongoDB conectado (São Paulo)
- ✅ Cloudinary configurado (dxfgvwgre)
- ✅ Upload endpoints criados
- ✅ Register.html criado
- ✅ Login.html criado
- ✅ Authentication implementado

## 📋 PASSO A PASSO PARA TESTAR

### 1️⃣ ACESSAR E REGISTRAR USUÁRIO
```
URL: http://localhost:5000/
Clique em "Registrar" (botão azul no header)
```

**Preencha:**
- Nome: Seu Nome
- Email: seu@email.com
- Senha: SenhaForte@123 (mín 8 char, 1 maiúscula, 1 número)
- Confirmar: SenhaForte@123

Clique em "Criar Conta"

### 2️⃣ FAZER LOGIN AUTOMATICAMENTE
Após registrar, você será logado automaticamente ✅

### 3️⃣ REGISTRAR UM NEGÓCIO
Na home, clique em "Para Empresas" ou vá para:
```
http://localhost:5000/register-business.html
```

**Preencha o formulário:**
- Nome da Empresa: Ex: "Pizzaria do João"
- Categoria: Selecione uma
- Cidade: Selecione (Quatis, Porto Real, Resende, Itatiaia, Barra Mansa)
- Descrição: Descrição do negócio
- Email: seu@email.com
- Telefone: (24) 99999-9999
- Website: https://seusite.com (opcional)
- Endereço: Rua da Empresa, 123

### 4️⃣ ⭐ UPLOAD DE IMAGENS (CLOUDINARY)
**Clique em "Adicionar Fotos"**
- Selecione até 5 imagens (JPG, PNG, GIF, WebP)
- **Elas irão para Cloudinary automaticamente!** ✨
- Veja as imagens aparecerem em preview

### 5️⃣ ENVIAR NEGÓCIO
Clique em "Registrar Negócio"

**O que vai acontecer:**
✅ Imagens são uploadadas para Cloudinary
✅ URLs das imagens são armazenadas
✅ Negócio é salvo no MongoDB
✅ Você é redirecionado para a home

## 🔐 CLOUDINARY CREDENTIALS
```
Cloud Name: dxfgvwgre
API Key: 411857641626289
Pasta: vivacidade-brasil/
Max file: 5MB
Formatos: JPG, PNG, GIF, WebP
```

## 🔑 ADMIN PANEL (OPCIONAL)

### Acessar Admin
- Atalho: Pressione **Shift + Alt + A** em qualquer página
- Ou acesse: http://localhost:5000/admin/login.html

### Registrar Admin (Protegido)
- URL: http://localhost:5000/admin/register.html
- Apenas admins já logados podem criar novos admins
- Dashboard em: http://localhost:5000/admin/dashboard.html

## 📊 VERIFICAR IMAGENS NO CLOUDINARY

1. Acesse: https://cloudinary.com/console
2. Faça login com sua conta
3. Vá em "Media Library"
4. Pasta: "vivacidade-brasil"
5. Suas imagens aparecerão lá! ✨

## ✨ ENDPOINTS DO UPLOAD

### Upload único
```
POST /api/upload/upload
Content-Type: multipart/form-data
Param: image (arquivo)
Response: { success: true, imageUrl: "...", publicId: "..." }
```

### Upload múltiplo
```
POST /api/upload/upload-multiple
Content-Type: multipart/form-data
Param: images (até 5 arquivos)
Response: { success: true, images: [...] }
```

## 🐛 TROUBLESHOOTING

### Servidor não conecta
```
cd backend
npm start
```

### MongoDB não conecta
- Verifique conexão internet
- Verifique credenciais em .env
- MongoDB URI deve estar com @cluster0.aa4mi8f.mongodb.net

### Cloudinary não faz upload
- Verifique credenciais em backend/.env
- Certifique-se de estar logado antes de acessar register-business.html
- Verifique tamanho das imagens (máx 5MB)

### Imagens não aparecem
- Aguarde 2-3 segundos após selecionar
- Verifique console do navegador (F12)
- Veja em Network as requisições para /api/upload

## 📝 NOTAS
- Todas as imagens vão para a pasta "vivacidade-brasil" no Cloudinary
- Plano gratuito do Cloudinary inclui 25GB de armazenamento
- Imagens são permanentes e escaláveis
- Use URLs para mostrar imagens nos negócios

## ✅ PRÓXIMA ETAPA
Após testar com sucesso:
1. Deploy no Render.com
2. Configurar domínio
3. Testar em produção

---

**Criado em:** 14 de janeiro de 2026
**Status:** ✅ Pronto para teste manual
