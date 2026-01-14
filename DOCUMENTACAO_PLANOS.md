# 📊 Documentação dos Planos - VivaCidade Brasil

## Estrutura de Preços Atual

### 🟢 PLANO GRÁTIS — R$ 0,00 / mês

Ideal para **testar a plataforma** e criar presença mínima.

#### Inclui:
- Cadastro em 1 cidade
- Perfil básico com:
  - Nome da empresa
  - Endereço
  - Telefone
- 1 imagem
- Atualizações manuais pelo painel
- Presença nas buscas padrão

#### Não inclui:
- Destaque nas buscas
- Estatísticas
- Horário de funcionamento
- Múltiplas cidades

---

### 🟢 PLANO START — R$ 29,90 / mês

Ideal para **pequenos comércios e profissionais locais** que querem marcar presença digital.

#### Inclui (tudo do Grátis +):
- Perfil básico com:
  - Nome da empresa
  - Endereço
  - Telefone
  - **Horário de funcionamento** ✨
- 1 imagem principal
- **Botão de contato direto** (WhatsApp ou ligação) ✨
- Atualizações manuais pelo painel
- Presença nas buscas padrão

#### Não inclui:
- Destaque nas buscas
- Múltiplas cidades
- Estatísticas
- Redes sociais/Website

---

### 🔵 PLANO PLUS — R$ 49,90 / mês

Para **empresas que desejam mais visibilidade e profissionalismo**.

#### Inclui (tudo do Start +):
- Cadastro em **até 2 cidades** ✨
- Perfil completo com:
  - Descrição detalhada
  - **Até 6 imagens** ✨
  - **Links para Instagram, site e redes sociais** ✨
- **Aparição com prioridade nas buscas** ✨
- **Destaque visual em listas de categorias** ✨
- **Acesso a estatísticas básicas** ✨
  - Visualizações
  - Cliques
- **Possibilidade de criar promoções** ✨

#### Não inclui:
- Vídeo institucional
- Destaque prioritário extremo
- Todas as cidades
- Suporte prioritário 24/7

---

### 🟣 PLANO ELITE — R$ 79,90 / mês

Para **empresas que querem máxima exposição e autoridade premium**.

#### Inclui (tudo do Plus +):
- Cadastro em **todas as cidades disponíveis** (5) ✨
- **Destaque fixo no topo das buscas e categorias** ✨
- Perfil premium com:
  - **Galeria completa de fotos** (ilimitadas) ✨
  - **Vídeo institucional ou promocional** ✨
  - **Selos de destaque Elite** ✨
- **Prioridade máxima no ranqueamento** ✨
- **Relatórios completos de desempenho** ✨
  - Análise de tendências
  - Comparativos
  - Recomendações
- **Participação em banners e áreas patrocinadas** ✨
- **Destaque em conteúdos editoriais** ✨
- **Suporte prioritário 24/7** ✨

---

## Tabela Comparativa Rápida

| Funcionalidade | Grátis | Start | Plus | Elite |
|---|---|---|---|---|
| **Preço** | R$0 | R$29,90 | R$49,90 | R$79,90 |
| **Cidades** | 1 | 1 | 2 | 5 |
| **Imagens** | 1 | 1 | 6 | Ilimitadas |
| **Vídeo** | ✗ | ✗ | ✗ | ✓ |
| **Horário** | ✗ | ✓ | ✓ | ✓ |
| **Redes/Site** | ✗ | ✗ | ✓ | ✓ |
| **WhatsApp/Ligação** | ✗ | ✓ | ✓ | ✓ |
| **Destaque Busca** | ✗ | ✗ | ✓ | ✓ Premium |
| **Promoções** | ✗ | ✗ | ✓ | ✓ |
| **Estatísticas** | ✗ | ✗ | Básicas | Completas |
| **Suporte** | Email | Email | Email | 24/7 |

---

## Estratégia de Migração de Planos

### Fluxo Esperado:
1. **Grátis** → Teste inicial
2. **Start** → Primeiros pagantes (R$29,90 é acessível)
3. **Plus** → Empresas com presença em 1-2 cidades
4. **Elite** → Grandes negócios/redes com presença regional

---

## Implementação Técnica

### Models Mongoose
O campo `plan` aceita: `['free', 'start', 'plus', 'elite']`

### API Routes
- POST `/api/businesses` - Criar empresa (padrão: free)
- PUT `/api/businesses/:id/upgrade-plan` - Atualizar plano
- GET `/api/businesses?plan=plus` - Filtrar por plano

### Frontend
- `plans.html` - Página de seleção visual
- Validações: Número máximo de cidades/imagens conforme plano
- Payment integration: Stripe para processamento

---

## Próximas Melhorias

- [ ] Integração com Stripe para pagamentos
- [ ] Renovação automática de assinaturas
- [ ] Cancelamento com aviso prévio
- [ ] Upgrade/Downgrade entre planos
- [ ] Cupons e promoções
- [ ] Análise de conversão por plano

