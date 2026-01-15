# Business ID - Guia Completo

## O que é Business ID?

**Business ID** é um identificador único gerado automaticamente no MongoDB para cada negócio cadastrado na plataforma Vivacidade Brasil. É uma cadeia alfanumérica de 24 caracteres.

**Exemplo:** `507f1f77bcf86cd799439011`

## Para que serve?

O Business ID é utilizado para:

1. **Referenciar o negócio em tabelas relacionadas**
   - Comentários e reviews estão vinculados ao Business ID
   - Eventos estão vinculados ao Business ID
   - Favoritos dos usuários armazenam o Business ID

2. **Chamadas de API**
   - Editar negócio: `PUT /api/businesses/{business_id}`
   - Deletar negócio: `DELETE /api/businesses/{business_id}`
   - Obter detalhes: `GET /api/businesses/{business_id}`

3. **Relações no Banco de Dados**
   - Cada review possui um campo `businessId` que referencia o Business ID
   - Cada evento possui um campo `businessId`
   - Cada bookmark/favorito armazena o Business ID

## Como encontrar o Business ID?

### No Admin Panel
1. Acesse a seção "Negócios"
2. Clique no botão de editar (✏️) do negócio desejado
3. O ID aparecerá no console do navegador ou na requisição ao servidor

### Via API
```bash
# Listar todos os negócios e seus IDs
GET https://vivacidade-brasil-api.onrender.com/api/businesses
```

Resposta:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Hotel Maravilha",
    "category": "Hospedagem",
    "city": "Quatis",
    "plan": "Plus",
    ...
  }
]
```

### No Formulário de Eventos
Quando criar um evento, você precisa fornecer o Business ID do negócio associado. Este campo vincula o evento ao negócio.

## Estrutura no Banco de Dados

```javascript
// Tabela: Business
{
  _id: ObjectId,           // Este é o Business ID
  name: String,
  description: String,
  category: String,
  city: String,
  owner: ObjectId,         // ID do usuário que criou
  plan: String,            // Free, Start, Plus, Elite
  image: String,           // URL da imagem
  createdAt: Date,
  updatedAt: Date
}

// Tabela: Review (referencia Business ID)
{
  _id: ObjectId,
  businessId: ObjectId,    // ← Referencia o Business._id
  userId: ObjectId,
  rating: Number,
  comment: String,
  ...
}

// Tabela: Event (referencia Business ID)
{
  _id: ObjectId,
  businessId: ObjectId,    // ← Referencia o Business._id
  name: String,
  date: Date,
  location: String,
  image: String,
  ...
}
```

## Fluxo Típico

1. **Criar Negócio**
   - Admin cria novo negócio via modal
   - Sistema gera automaticamente um `_id` (Business ID)
   - Backend retorna o ID criado

2. **Criar Evento**
   - Admin vai para a seção "Eventos"
   - Clica em "Novo Evento"
   - Fornece o Business ID do negócio
   - Sistema vincula o evento ao negócio via este ID

3. **Adicionar Review**
   - Usuário vê negócio na página
   - Clica para avaliar
   - Sistema automaticamente usa o Business ID da página
   - Review é vinculada ao negócio

## Importante

⚠️ **O Business ID é imutável** - Não pode ser alterado após criação, pois outros registros dependem dele.

⚠️ **Use o ID correto** - Ao criar eventos ou reviews, certifique-se de usar o Business ID do negócio correto.

✅ **Auto-gerado** - Não precisa gerar manualmente; o sistema cria automaticamente quando um negócio é criado.

## Suporte

Se tiver dúvidas sobre qual Business ID usar:
1. Vá ao Admin Panel → Negócios
2. Encontre o negócio desejado
3. Clique em editar para ver os detalhes completos
4. Use o ID exibido no console ou na requisição
