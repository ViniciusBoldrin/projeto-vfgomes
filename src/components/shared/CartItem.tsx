import { useCartStore } from '../../store/cartStore'
import { formatCurrency } from '../../utils/currency'
import type { CartItem as CartItemType } from '../../store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore()
  const { product, quantity } = item
  const subtotal = product.price * quantity

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 p-2">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{product.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{formatCurrency(product.price)} un.</p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label="Diminuir quantidade"
              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Aumentar quantidade"
              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            aria-label="Remover item"
            className="text-sm text-red-500 hover:text-red-700 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none rounded"
          >
            Remover
          </button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</p>
      </div>
    </div>
  )
}
