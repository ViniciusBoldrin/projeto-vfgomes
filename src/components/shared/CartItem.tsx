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
    <div className="flex gap-4 py-4 border-b border-neutral-100 dark:border-neutral-900">
      <div className="w-20 h-20 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shrink-0 p-2">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-light lowercase text-black dark:text-white line-clamp-2 tracking-wide">
          {product.title.toLowerCase()}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{formatCurrency(product.price)}</p>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label="Diminuir quantidade"
              className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors text-sm"
            >
              −
            </button>
            <span className="text-xs font-medium text-black dark:text-white min-w-[1.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Aumentar quantidade"
              className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors text-sm"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            aria-label="Remover item"
            className="text-xs text-neutral-400 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none"
          >
            Remover
          </button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-xs font-medium text-black dark:text-white">{formatCurrency(subtotal)}</p>
      </div>
    </div>
  )
}
