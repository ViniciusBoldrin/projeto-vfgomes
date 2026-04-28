import { formatCurrency } from '../../utils/currency'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
  onEdit?: (product: Product) => void
  onDelete?: (id: number) => void
  onAddToCart?: (product: Product) => void
}

function PencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

export function ProductCard({ product, onEdit, onDelete, onAddToCart }: ProductCardProps) {
  const isAdmin = !!onEdit

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg hover:shadow-md transition-shadow duration-300">
      {/* Imagem */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden"
        style={{ backgroundColor: 'var(--c-subtle)' }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />

        {/* Admin: botões de ação */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit!(product)}
              aria-label="Editar produto"
              title="Editar"
              className="p-1.5 transition-colors"
              style={{ backgroundColor: 'var(--c-surface)', color: 'var(--c-muted)' }}
            >
              <PencilIcon />
            </button>
            <button
              onClick={() => onDelete!(product.id)}
              aria-label="Excluir produto"
              title="Excluir"
              className="p-1.5 transition-colors hover:text-red-600"
              style={{ backgroundColor: 'var(--c-surface)', color: 'var(--c-muted)' }}
            >
              <TrashIcon />
            </button>
          </div>
        )}

        {/* Cliente: botão slide-up */}
        {!isAdmin && (
          <div className="absolute inset-x-0 bottom-0 overflow-hidden">
            <button
              data-action="add-to-cart"
              onClick={() => onAddToCart?.(product)}
              className="w-full text-xs uppercase tracking-widest py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              style={{
                backgroundColor: 'var(--c-brand)',
                color: '#fff',
                letterSpacing: '0.15em',
              }}
            >
              Adicionar
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-2">
        <h3
          className="text-xs font-light lowercase tracking-wide line-clamp-2"
          style={{ color: 'var(--c-text)' }}
        >
          {product.title.toLowerCase()}
        </h3>
        <p className="text-sm mt-0.5" style={{ color: 'var(--c-muted)' }}>
          {formatCurrency(product.price)}
        </p>
      </div>
    </div>
  )
}
