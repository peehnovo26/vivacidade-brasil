# 🔐 Guia de Configuração do Stripe - VivaCidade Brasil

## Passo 1: Criar Conta no Stripe

1. Acesse https://dashboard.stripe.com
2. Clique em "Sign up"
3. Preencha com seus dados
4. Verifique seu email

## Passo 2: Obter Chaves API

1. Acesse [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copie as duas chaves (você verá "Publishable key" e "Secret key"):
   - **Publishable Key** (começa com `pk_test_`) → Coloque em `STRIPE_PUBLIC_KEY`
   - **Secret Key** (começa com `sk_test_`) → Coloque em `STRIPE_SECRET_KEY`

3. Adicione ao arquivo `.env`:
```env
STRIPE_PUBLIC_KEY=pk_test_seu_valor
STRIPE_SECRET_KEY=sk_test_seu_valor
```

## Passo 3: Criar Produtos e Preços

### Via Dashboard Stripe:

1. Acesse [https://dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Clique em "Add product"

#### Criar 3 Produtos:

**Produto 1: Start**
- Nome: "VivaCidade Start Plan"
- Descrição: "Plano Start - R$ 29,90/mês"
- Tipo: "Recorrente"
- Preço: 29.90
- Moeda: BRL
- Frequência: Mensal

Copie o **Price ID** e coloque em `.env`:
```env
STRIPE_PRICE_START=price_xxxxx
```

**Produto 2: Plus**
- Nome: "VivaCidade Plus Plan"
- Descrição: "Plano Plus - R$ 49,90/mês"
- Preço: 49.90
- Frequência: Mensal

Copie o **Price ID**:
```env
STRIPE_PRICE_PLUS=price_xxxxx
```

**Produto 3: Elite**
- Nome: "VivaCidade Elite Plan"
- Descrição: "Plano Elite - R$ 79,90/mês"
- Preço: 79.90
- Frequência: Mensal

Copie o **Price ID**:
```env
STRIPE_PRICE_ELITE=price_xxxxx
```

## Passo 4: Configurar Webhook

### Para receber eventos de pagamento:

1. Acesse [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Clique em "Add endpoint"
3. URL do Endpoint: `https://seu-dominio.com/api/payments/webhook`
4. Selecione os eventos:
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`

5. Clique em "Create endpoint"
6. Copie o "Signing secret" (começa com `whsec_`) e coloque em `.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## Passo 5: Testando Localmente

### Usar Stripe CLI para simular webhooks:

```bash
# 1. Baixar e instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# 2. Login
stripe login

# 3. Ouvir eventos localmente
stripe listen --forward-to localhost:5000/api/payments/webhook

# 4. Simular um evento
stripe trigger payment_intent.succeeded
```

## Cartões de Teste do Stripe

Use esses números ao testar a plataforma:

### Sucesso:
- Número: `4242 4242 4242 4242`
- MM/AA: Qualquer data futura
- CVC: Qualquer 3 dígitos

### Falha:
- Número: `4000 0000 0000 0002`
- MM/AA: Qualquer data futura
- CVC: Qualquer 3 dígitos

### Autenticação 3D Secure:
- Número: `4000 0025 0000 3155`

## Passo 6: Atualizar Backend

Adicione todas as variáveis ao arquivo `.env`:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/vivacidade
JWT_SECRET=sua_chave_super_secreta_aqui
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_START=price_xxxxx
STRIPE_PRICE_PLUS=price_xxxxx
STRIPE_PRICE_ELITE=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Passo 7: Testar Fluxo de Pagamento

1. Inicie o backend: `npm start`
2. Abra `http://localhost:3000/plans.html`
3. Clique em "Escolher Plano"
4. Preencha o formulário de checkout
5. Use um cartão de teste Stripe
6. Confirme o pagamento

## Passo 8: Deploy em Produção

Quando estiver pronto para produção:

1. **Criar Conta Stripe Production**
   - Acesse [https://dashboard.stripe.com/account/keys](https://dashboard.stripe.com/account/keys)
   - Mude para "Production" (toggle no topo)
   - Copie as chaves reais (começam com `pk_live_` e `sk_live_`)

2. **Atualizar variáveis em produção**
   - Atualize `STRIPE_PUBLIC_KEY` e `STRIPE_SECRET_KEY`
   - Configure novo webhook para seu domínio de produção

3. **Testar com transações reais**
   - Use cartões reais (será cobrado o valor real)
   - Verifique se os webhooks estão funcionando

## Referências

- [Documentação Stripe (PT)](https://stripe.com/docs/payments/payment-intents)
- [API Reference](https://stripe.com/docs/api)
- [Dashboard](https://dashboard.stripe.com)

## Suporte

Para dúvidas:
- Documentação: https://stripe.com/docs
- Status da plataforma: https://status.stripe.com

