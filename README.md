# VF GOMES outlet — E-commerce

Mini e-commerce desenvolvido como teste técnico, consumindo a [FakeStore API](https://fakestoreapi.com/).

> Design inspirado na identidade visual da Zattini: coral brand (`#f4546a`), tipografia refinada, banners promocionais, chips de categoria e layout responsivo.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS v4 (design tokens, dark mode) |
| Roteamento | React Router DOM v7 |
| Estado global | Zustand 5 (cart, auth, products, users) |
| HTTP | Axios com interceptors |
| Testes | Vitest 4 + Testing Library (118 testes) |

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # watch mode
npm run test:run   # CI / single run
npm run build      # build de produção
```

## Acesso

| Perfil | Username | Senha |
|--------|----------|-------|
| Administrador | `mor_2314` | `83r5^_` |
| Cliente | `kevinryan` | `kev02937@` |

## Funcionalidades

### Autenticação
- Login via FakeStore API com JWT
- Separação de perfis: admin e cliente
- Proteção de rotas por perfil (`PrivateRoute`, `AdminRoute`, `ClientRoute`)
- Redirecionamento automático por role
- Logout limpa sessão e carrinho

### Área Admin
- Dashboard com totais (usuários, produtos, categorias)
- CRUD completo de produtos (título, preço, descrição, categoria, imagem)
- CRUD completo de usuários
- Persistência local via localStorage — dados sobrevivem ao reload

### Loja (área cliente)
- Banners promocionais com rotação automática
- Filtro de produtos por categoria (chips estilo Zattini)
- Busca por nome via URL (`/store?q=termo`) — compartilhável
- Input do header sincronizado com o parâmetro da URL
- Adicionar ao carrinho / alterar quantidade / remover item
- Subtotal por item e total geral
- Finalização de compra (mock)

### UX / Qualidade
- Layout responsivo: mobile, tablet e desktop
- Tema claro / escuro com ícones sol/lua e persistência em localStorage
- Skeletons de loading, estado de erro com retry, estado de lista vazia
- Feedback visual em todas as interações (hover, transições, toast)
- Acessibilidade: `aria-label`, `alt`, `role=alert`, `focus-visible`

## Arquitetura

```
src/
├── components/
│   ├── layout/          # ClientLayout, AdminLayout, Header, Sidebar, PrivateRoute
│   ├── shared/          # ProductCard, ProductForm, UserForm, CartItem
│   └── ui/              # Button, Input, Modal, Toast, Skeleton, Container
├── context/             # ThemeContext (dark/light mode)
├─�� hooks/               # useProducts (consome productsStore)
├── pages/
│   ├── Login/
│   ├── admin/           # Dashboard, Products, Users
│   └── client/          # Store, Cart
├── services/            # API (axios), authService, productsService, usersService
├── store/               # Zustand: authStore, cartStore, productsStore, usersStore
├── types/               # Product, User, Auth
└── utils/               # localStorage, currency, cn
```

## Destaques técnicos

- **Fonte de verdade única**: `useProducts` consome `useProductsStore` — produtos criados na admin aparecem imediatamente na loja sem reload
- **Busca via URL**: parâmetro `?q=` lido com `useSearchParams`, mantendo a busca ao compartilhar ou recarregar a página
- **TDD**: todos os critérios de aceite cobertos por testes antes da implementação (Red → Green → Refactor)
- **Hardening**: senhas não persistidas em localStorage, credenciais removidas do HTML, carrinho limpo no logout
- **118 testes** passando — unitários, integração e design system

## Observação sobre a API

A FakeStore API é read-only para mutações. Operações de escrita (criar/editar/excluir) são simuladas localmente via localStorage e persistem entre sessões do browser.
