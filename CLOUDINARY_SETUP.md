# 📸 Integração Cloudinary - VivaCidade Brasil

## O que foi instalado?
✅ Pacote `cloudinary` - SDK oficial do Cloudinary
✅ Pacote `multer-storage-cloudinary` - Integração com multer
✅ Novos arquivos:
  - `backend/config/cloudinary.js` - Configuração
  - `backend/routes/upload.js` - Endpoints de upload

## Passo 1: Criar conta Cloudinary (GRÁTIS)

1. Acesse: https://cloudinary.com/users/register/free
2. Clique em **"Sign up for free"**
3. Preencha os dados (email, senha, nome)
4. Confirme o email
5. Escolha "Programmable Media" como foco
6. Pronto! Você tem 25GB grátis

## Passo 2: Pegar as credenciais

1. No dashboard, clique em **"Settings"** (engrenagem)
2. Clique em **"API Keys"** (aba azul)
3. Copie:
   - **Cloud Name** (topo da página)
   - **API Key**
   - **API Secret** (clique em ícone para revelar)

## Passo 3: Adicionar no .env

Abra `backend/.env` e adicione:

```
CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui
CLOUDINARY_API_KEY=sua_api_key_aqui
CLOUDINARY_API_SECRET=seu_api_secret_aqui
```

Exemplo real:
```
CLOUDINARY_CLOUD_NAME=djt5h3wqr
CLOUDINARY_API_KEY=847392847392
CLOUDINARY_API_SECRET=hS3H_kdH3HSdhsjdhSD82hsh
```

## Passo 4: Usar no frontend

Para fazer upload de uma foto, você agora faz:

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]); // o arquivo

const response = await fetch('/api/upload/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.imageUrl); // URL da foto no Cloudinary
```

## Endpoints disponíveis:

### Upload único
```
POST /api/upload/upload
Content-Type: multipart/form-data

Parâmetros:
- image (arquivo)

Resposta:
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/.../image.jpg",
  "publicId": "vivacidade-brasil/abc123"
}
```

### Upload múltiplo
```
POST /api/upload/upload-multiple
Content-Type: multipart/form-data

Parâmetros:
- images (até 5 arquivos)

Resposta:
{
  "success": true,
  "images": [
    { "url": "https://...", "publicId": "..." },
    { "url": "https://...", "publicId": "..." }
  ]
}
```

## Limites:
- Máx 5MB por arquivo
- Até 5 arquivos por vez
- Formatos: JPG, PNG, GIF, WebP
- Armazenamento: 25GB (free tier)

## 💡 Dica importante

As fotos ficam armazenadas na nuvem (Cloudinary), não no seu servidor!

Vantagens:
✅ Economiza espaço em disco
✅ Carrega mais rápido (CDN global)
✅ Redimensiona automático
✅ Sem limite de espaço (até 25GB free)

## Próximo passo

Agora é só integrar os uploads no formulário de cadastro de negócios!
Quer que eu mostre como fazer isso?
