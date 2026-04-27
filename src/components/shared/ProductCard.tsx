import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatCurrency } from '../../utils/currency'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
  // Admin actions
  onEdit?: (product: Product) => void
  onDelete?: (id: number) => void
  // Client action
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onEdit, onDelete, onAddToCart }: ProductCardProps) {
  const isAdmin = !!onEdit

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.01] flex flex-col overflow-hidden">
      <div className="relative h-48 bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <Badge label={product.category} />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {formatCurrency(product.price)}
        </p>

        {isAdmin ? (
          <div className="flex gap-2 mt-1">
            <Button
              variant="secondary"
              onClick={() => onEdit!(product)}
              aria-label="Editar"
              className="flex-1 text-xs"
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete!(product.id)}
              aria-label="Excluir"
              className="flex-1 text-xs"
            >
              Excluir
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => onAddToCart?.(product)}
            className="w-full mt-1 text-sm"
          >
            + Adicionar ao carrinho
          </Button>
        )}
      </div>
    </div>
  )
}
