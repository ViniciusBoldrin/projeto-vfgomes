# FakeStore E-commerce

Mini e-commerce desenvolvido como teste técnico, consumindo a [FakeStore API](https://fakestoreapi.com/).

## Stack

- **React 19** + **TypeScript** — framework base
- **Vite 8** — build tool
- **Tailwind CSS v4** — estilos com dark mode
- **React Router DOM v7** — roteamento SPA
- **Zustand** — estado global (cart, auth)
- **Axios** — cliente HTTP com interceptors
- **Vitest** + **Testing Library** — testes unitários e de integração

## Como instalar e rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar testes
npm test

# Build de produção
npm run build
```

## Contas de acesso

| Perfil | Username | Senha |
|---|---|---|
| Administrador | `mor_2314` | `83r5^_` |
| Cliente | `kevinryan` | `kev02937@` |

## Funcionalidades

### Autenticação
- [x] Login via FakeStore API
- [x] Separação de perfis (admin / cliente)
- [x] Proteção de rotas por perfil
- [x] Redirecionamento automático por role

### Área Admin
- [x] Dashboard com totais (usuários, produtos, categorias)
- [x] Listagem de usuários
- [x] Criar, editar e excluir usuários (mock com LocalStorage)
- [x] Listagem de produtos com imagem, preço e categoria
- [x] Criar, editar e excluir produtos (mock com LocalStorage)

### Área Cliente
- [x] Listagem de produtos com filtro por categoria
- [x] Busca por nome (filtro local)
- [x] Adicionar ao carrinho / alterar quantidade / remover
- [x] Subtotal por item e total geral
- [x] Finalização de compra (mock)

### UX / Design
- [x] Layout responsivo (mobile, tablet, desktop)
- [x] Tema claro / escuro com persistência
- [x] Estados de loading (skeletons), erro e lista vazia
- [x] Feedback visual em interações (hover, active, transições)
- [x] Acessibilidade básica (labels, alt, focus-visible, role=alert)

## Diferenciais implementados

- **Zustand** para estado global (cart e auth)
- **Vitest + Testing Library** — 28 testes cobrindo todos os critérios de aceite
- Tratamento avançado de erros com retry na loja

## Observação sobre dados mock

A FakeStore API é read-only. Todas as operações de escrita (criar/editar/excluir usuários e produtos) são simuladas localmente via **LocalStorage**. Os dados são preservados entre sessões do browser, mas se perdem ao limpar o localStorage.
