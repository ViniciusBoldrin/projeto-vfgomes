import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../../store/cartStore'
import { CartItem } from '../../../components/shared/CartItem'
import { Button } from '../../../components/ui/Button'
import { formatCurrency } from '../../../utils/currency'

export default function CartPage() {
  const { items, total, clearCart } = useCartStore()
  const [success, setSuccess] = useState(false)

  async function handleCheckout() {
    clearCart()
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-6xl">🎉</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pedido realizado com sucesso!</h2>
        <p className="text-gray-500 dark:text-gray-400">Obrigado pela sua compra. Em breve você receberá o seu pedido.</p>
        <Link to="/store">
          <Button>Continuar comprando</Button>
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-6xl">🛒</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Carrinho vazio</h2>
        <p className="text-gray-500 dark:text-gray-400">Adicione produtos para continuar</p>
        <Link to="/store" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Continuar comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items list */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumo do pedido</h2>

          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="line-clamp-1 flex-1 mr-2">{item.product.title}</span>
                <span className="shrink-0">{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full mt-6"
          >
            Finalizar compra
          </Button>
        </div>
      </div>
    </div>
  )
}
