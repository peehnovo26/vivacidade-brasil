# 🎠 Setup do Carousel de Fotos

## O que foi implementado

✅ **Carousel automático** com 5 fotos (uma por cidade)
✅ **Auto-play** a cada 5 segundos com transição fade suave
✅ **Dots navegáveis** na base (clique para ir à foto específica)
✅ **Overlay escuro** (gradiente) para garantir legibilidade do texto
✅ **Responsivo** - adapta em mobile, tablet e desktop

---

## 📸 Como Substituir as Fotos

### Opção 1: URLs de Imagens Externas (Mais Fácil)

No arquivo `index.html`, procure pela seção `<!-- Carousel Images -->` (linha ~180):

```html
<div class="carousel-slide" style="background-image: url('SEU_URL_AQUI');">
```

**URLs atuais (usando Unsplash):**
- Quatis: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop`
- Porto Real: `https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=1920&h=1080&fit=crop`
- Resende: `https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=1920&h=1080&fit=crop`
- Barra Mansa: `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop`
- Itatiaia: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop`

**Para colocar suas fotos (opção recomendada):**

1. Upload as 5 fotos (1920x1080px) no Cloudinary
2. Copie os URLs e substitua no `index.html`

Exemplo com Cloudinary:
```html
<div class="carousel-slide" style="background-image: url('https://res.cloudinary.com/dxfgvwgre/image/upload/v1234567890/quatis.jpg');">
```

### Opção 2: Guardar Fotos Localmente

Se preferir salvar as imagens junto com o projeto:

```
/
├── index.html
├── imagens/
│   └── carousel/
│       ├── quatis.jpg (1920x1080)
│       ├── porto-real.jpg
│       ├── resende.jpg
│       ├── barra-mansa.jpg
│       └── itatiaia.jpg
```

No HTML, use path relativo:
```html
<div class="carousel-slide" style="background-image: url('./imagens/carousel/quatis.jpg');">
```

---

## ⚙️ Personalização

### Mudar Velocidade do Carousel

No arquivo `script.js`, linha 8:
```javascript
const slideInterval = 5000; // Tempo em milissegundos (5 segundos)
```

Exemplos:
- `3000` = 3 segundos (mais rápido)
- `8000` = 8 segundos (mais lento)

### Mudar Transparência do Overlay

No arquivo `index.html`, linha ~192:
```html
<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40"></div>
```

Valores:
- `black/20` = muito transparente (foto muito visível)
- `black/50` = padrão atual (equilibrado)
- `black/70` = mais escuro (texto mais legível)

---

## 📐 Especificações Finais

| Aspecto | Valor |
|---------|-------|
| **Proporção** | 16:9 (landscape) |
| **Tamanho** | 1920 x 1080px (Full HD) |
| **Peso** | 300-400KB por foto |
| **Formato** | JPG ou WebP |
| **Auto-play** | 5 segundos |
| **Transição** | Fade (1 segundo) |

---

## 🎯 Próximos Passos

1. **Crie/obtenha as 5 fotos** seguindo as especificações
2. **Faça upload** (Cloudinary ou local)
3. **Substitua os URLs** no `index.html`
4. **Teste no navegador** (Ctrl+F5 para limpar cache)
5. **Push para Render** (auto-deploy)

---

## 🐛 Troubleshooting

**Foto não aparece:**
- Verifique o URL (copy/paste exato)
- Verifique CORS (URLs devem permitir cross-origin)
- Limpe cache do navegador (Ctrl+Shift+Delete)

**Carousel não muda:**
- Verifique se `script.js` está carregado
- Abra DevTools (F12) e veja console para erros

**Texto não legível:**
- Aumente opacidade do overlay (de `black/30` para `black/50`)
- Ou coloque fotos mais escuras/com menos detalhes no topo
