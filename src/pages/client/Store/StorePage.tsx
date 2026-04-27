import { useProducts } from '../../../hooks/useProducts'
import { useCartStore } from '../../../store/cartStore'
import { ProductCard } from '../../../components/shared/ProductCard'
import { ProductSkeleton } from '../../../components/ui/Skeleton'
import { Button } from '../../../components/ui/Button'
import { Toast, useToast } from '../../../components/ui/Toast'
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
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {/* Search + Category filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="store-search" className="sr-only">Buscar produtos</label>
          <input
            id="store-search"
            type="search"
            placeholder="Buscar produtos..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Category pills */}
      {!loading && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div role="alert" className="text-center py-12 space-y-4">
          <p className="text-4xl">⚠️</p>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button onClick={retry}>Tentar novamente</Button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">🔍</p>
          <p>Nenhum produto encontrado</p>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}
