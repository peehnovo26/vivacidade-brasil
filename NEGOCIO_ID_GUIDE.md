# Guia: O que é Business ID (Negócio ID)

## Resumo Executivo
**Business ID** é um identificador único e permanente atribuído a cada negócio cadastrado no sistema VIVACIDADE BRASIL. É um código que o sistema usa internamente para rastrear, gerenciar e conectar dados sobre cada negócio.

## O que é exatamente?

### Definição Técnica
- **Tipo**: String alpanumérica (exemplo: `507f1f77bcf86cd799439011`)
- **Origem**: Gerado automaticamente pelo banco de dados MongoDB quando um negócio é criado
- **Formato**: ID único do MongoDB (ObjectId)
- **Imutável**: Nunca muda após criação, mesmo se o negócio for editado

### Analogia do Mundo Real
Pense no Business ID como o **número de registro ou CPF de um negócio**:
- Assim como uma pessoa tem um CPF único que a identifica para sempre
- Um negócio tem um Business ID único que o identifica no sistema
- Mesmo que mude de nome, endereço ou propriedade, o ID continua o mesmo

## Para que serve?

### 1. **Identificação Única**
Garante que não haja confusão entre negócios:
- Dois negócios com o mesmo nome podem existir em cidades diferentes
- O Business ID os diferencia perfeitamente

### 2. **Ligação de Dados Relacionados**
Conecta informações de um negócio em diferentes tabelas:

```
Business (Negócio)
├── ID: 507f1f77bcf86cd799439011
├── Nome: "Pousada Serra Verde"
├── Descrição: "..."
└── Imagem: "..."

Review (Avaliação)
├── businessId: 507f1f77bcf86cd799439011  ← Aponta para o negócio
├── Rating: 4.5
├── Comentário: "Muito bom!"
└── ...

Event (Evento)
├── businessId: 507f1f77bcf86cd799439011  ← Aponta para o mesmo negócio
├── Nome: "Festival de Verão"
├── Data: "2024-07-15"
└── ...
```

### 3. **Integrações e Buscas**
Quando você quer:
- **Ver avaliações de um negócio** → Sistema busca por `businessId`
- **Exibir eventos próximos** → Sistema busca eventos com `businessId` correto
- **Editar informações** → Sistema identifica qual negócio via `businessId`

## Exemplos de Uso no Sistema

### Admin Panel
```
Ao criar um novo evento no painel admin:
- Campo: "Negócio ID"
- Digite: O Business ID do negócio (ex: 507f1f77bcf86cd799439011)
- O evento fica vinculado permanentemente a esse negócio
```

### API (Desenvolvimento)
```javascript
// Buscar todas as avaliações de um negócio
GET /api/reviews?businessId=507f1f77bcf86cd799439011

// Buscar todos os eventos de um negócio
GET /api/events?businessId=507f1f77bcf86cd799439011

// Atualizar informações de um negócio
PUT /api/businesses/507f1f77bcf86cd799439011
{ name: "Novo Nome", ... }
```

## Como Encontrar o Business ID?

### Opção 1: Admin Panel
1. Acesse o **Admin Dashboard**
2. Vá para a aba **"Negócios"**
3. Veja a tabela de negócios
4. Ao editar um negócio, o ID aparece na URL ou no console

### Opção 2: Visualizar no Banco de Dados
- Acesso direto ao MongoDB Atlas
- Busque na coleção `businesses`
- Cada documento tem um campo `_id` (que é o Business ID)

### Opção 3: API
```javascript
// Listar todos os negócios
GET /api/businesses
// Retorna array com todos, cada um incluindo _id
```

## Estrutura de um Negócio no Banco

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),  // ← BUSINESS ID
  name: "Pousada Serra Verde",
  description: "Uma pousada aconchegante na serra",
  category: "Hospedagem",
  city: "Resende",
  owner: "userId123",  // ID do proprietário
  plan: "Plus",
  image: "https://cloudinary.com/...",
  rating: 4.5,
  reviews: ["reviewId1", "reviewId2"],  // Referências a avaliações
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-03-20T14:45:00Z"
}
```

## Operações Comuns com Business ID

| Operação | Como Usar | Exemplo |
|----------|-----------|---------|
| **Criar evento** | Forneça Business ID | `businessId: "507f1f77bcf86cd799439011"` |
| **Ver avaliações** | Filtre por Business ID | `GET /api/reviews?businessId=...` |
| **Editar negócio** | Use na URL | `PUT /api/businesses/507f1f77bcf86cd799439011` |
| **Deletar negócio** | Use na URL | `DELETE /api/businesses/507f1f77bcf86cd799439011` |
| **Vincular favorito** | Armazene Business ID | `favorites: ["507f1f77bcf86cd799439011"]` |

## Importante: Business ID vs Owner ID

**NÃO confunda:**
- **Business ID** (`_id`): ID do negócio em si
- **Owner ID** (`owner`): ID do usuário que é proprietário do negócio

```javascript
// CORRETO - Entender a diferença
business._id        // Business ID - identifica o negócio
business.owner      // Owner ID - identifica quem o criou/gerencia
```

## Casos de Uso Reais

### Caso 1: Admin Criando um Evento
```
1. Admin acessa "Novo Evento" no painel
2. Preenche: Nome, Data, Local, Foto
3. Campo: "Negócio ID" ← Copia do Business ID do negócio
4. Clica "Criar"
5. Sistema vincula evento ao negócio correto
```

### Caso 2: Usuário Vendo Avaliações
```
1. Usuário acessa página de "Pousada Serra Verde"
2. Página faz requisição: GET /api/reviews?businessId=507f...
3. Backend retorna todas as avaliações desse negócio
4. Frontend exibe as avaliações
```

### Caso 3: Sistema Calculando Média de Classificação
```
1. Sistema busca negócio: GET /api/businesses/507f...
2. Busca avaliações: GET /api/reviews?businessId=507f...
3. Calcula média das ratings
4. Atualiza o campo `rating` do negócio
```

## Padrão de Segurança

O Business ID é **público** (pode ser visto por qualquer um), mas:
- ❌ Não é a senha do negócio
- ❌ Não permite edição sem permissão (auth é separado)
- ✅ É apenas um identificador
- ✅ Necessário para operações legítimas

```javascript
// PROTEGIDO - Só admin/proprietário pode fazer
PUT /api/businesses/507f...
Authorization: Bearer <token>  // ← Verificação de permissão

// PÚBLICO - Qualquer um pode ver
GET /api/businesses/507f...
// Sem token necessário
```

## Resumo Rápido

| Pergunta | Resposta |
|----------|----------|
| O que é? | ID único do negócio no banco de dados |
| Quem o cria? | Sistema (automático ao criar negócio) |
| Como é? | String alfanumérica de 24 caracteres |
| Pode mudar? | Não, é permanente |
| É secreto? | Não, é público |
| Para que serve? | Conectar dados do negócio (eventos, avaliações, etc) |
| Onde encontro? | Admin Panel > Negócios > Editar |
| Preciso usar? | Sim, ao criar eventos vinculados a negócios |

---

**Dúvidas?** Consulte a seção de ["API Exemplos"](API_EXEMPLOS.md) para ver requisições práticas usando Business ID.
