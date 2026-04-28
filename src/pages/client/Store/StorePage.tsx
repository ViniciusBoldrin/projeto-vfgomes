import { useProducts } from '../../../hooks/useProducts'
import { useCartStore } from '../../../store/cartStore'
import { ProductCard } from '../../../components/shared/ProductCard'
import { ProductSkeleton } from '../../../components/ui/Skeleton'
import { Button } from '../../../components/ui/Button'
import { Toast, useToast } from '../../../components/ui/Toast'
import { Container } from '../../../components/ui/Container'
import type { Product } from '../../../types/product'

export default function StorePage() {
  const {
    filteredProducts,
    categories,
    selectedCategory,
    loading,
    error,
    setSelectedCategory,
    setSearchQuery,
    retry,
  } = useProducts()
  const { addToCart } = useCartStore()
  const { toast, showToast, closeToast } = useToast()

  function handleAddToCart(product: Product) {
    addToCart(product)
    showToast(`${product.title.slice(0, 30)}... adicionado ao carrinho!`)
  }

  return (
    <Container className="py-8 md:py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {/* Filtros de categoria */}
      {!loading && categories.length > 0 && (
        <div
          className="flex border-b overflow-x-auto mb-8"
          style={{ borderColor: 'var(--c-border)' }}
        >
          <button
            onClick={() => setSelectedCategory('')}
            className={`shrink-0 text-xs uppercase tracking-widest py-3 px-4 transition-colors focus-visible:outline-none ${
              selectedCategory === ''
                ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                : ''
            }`}
            style={selectedCategory !== '' ? { color: 'var(--c-muted)' } : undefined}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 text-xs uppercase tracking-widest py-3 px-4 transition-colors focus-visible:outline-none ${
                selectedCategory === cat
                  ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                  : ''
              }`}
              style={selectedCategory !== cat ? { color: 'var(--c-muted)' } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Busca oculta — acessível via ClientLayout expandível */}
      <label htmlFor="store-search" className="sr-only">Buscar produtos</label>
      <input
        id="store-search"
        type="search"
        className="sr-only"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Erro */}
      {error && !loading && (
        <div role="alert" className="text-center py-16 space-y-6">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--c-muted)' }}
          >
            Erro ao carregar produtos
          </p>
          <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{error}</p>
          <Button onClick={retry}>Tentar novamente</Button>
        </div>
      )}

      {/* Vazio */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--c-muted)' }}
          >
            Nenhum produto encontrado
          </p>
        </div>
      )}

      {/* Grid de produtos — gap real (não gap-px) */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </Container>
  )
}
