import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../../../hooks/useProducts'
import { useCartStore } from '../../../store/cartStore'
import { ProductCard } from '../../../components/shared/ProductCard'
import { ProductSkeleton } from '../../../components/ui/Skeleton'
import { Button } from '../../../components/ui/Button'
import { Toast, useToast } from '../../../components/ui/Toast'
import { Container } from '../../../components/ui/Container'
import type { Product } from '../../../types/product'

const BANNERS = [
  '/banners/maes70.png',
  '/banners/looks-treino.png',
  '/banners/all-jeans.png',
  '/banners/lancamentos-vans.png',
]

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
  const [bannerIdx, setBannerIdx] = useState(0)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  useEffect(() => {
    const id = setInterval(() => {
      setBannerIdx((i) => (i + 1) % BANNERS.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  function handleAddToCart(product: Product) {
    addToCart(product)
    showToast(`${product.title.slice(0, 30)}... adicionado ao carrinho!`)
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {/* Banner promocional — full-width, fora do Container */}
      <div
        data-banner
        className="w-full overflow-hidden"
        style={{ aspectRatio: '1922/500' }}
      >
        <img
          src={BANNERS[bannerIdx]}
          alt="Promoção"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

    <Container className="py-8">
      {/* Filtros de categoria — chips estilo Zattini */}
      {!loading && categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            data-active={selectedCategory === '' ? 'true' : 'false'}
            style={
              selectedCategory === ''
                ? { backgroundColor: 'var(--c-brand)' }
                : { borderColor: 'var(--c-border)', color: 'var(--c-muted)' }
            }
            className={`shrink-0 text-xs uppercase tracking-widest py-2 px-4 rounded-[20px] transition-opacity hover:opacity-80 focus-visible:outline-none ${
              selectedCategory === '' ? 'text-white' : 'border bg-transparent'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-active={selectedCategory === cat ? 'true' : 'false'}
              style={
                selectedCategory === cat
                  ? { backgroundColor: 'var(--c-brand)' }
                  : { borderColor: 'var(--c-border)', color: 'var(--c-muted)' }
              }
              className={`shrink-0 text-xs uppercase tracking-widest py-2 px-4 rounded-[20px] transition-opacity hover:opacity-80 focus-visible:outline-none ${
                selectedCategory === cat ? 'text-white' : 'border bg-transparent'
              }`}
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

      {/* Grid de produtos */}
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
    </>
  )
}
