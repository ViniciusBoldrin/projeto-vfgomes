import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../../store/cartStore'
import { CartItem } from '../../../components/shared/CartItem'
import { Container } from '../../../components/ui/Container'
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
      <Container size="narrow" className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <h2
          className="font-serif tracking-widest uppercase"
          style={{ fontSize: 'var(--text-heading)', color: 'var(--c-text)' }}
        >
          Pedido realizado com sucesso!
        </h2>
        <p className="text-sm" style={{ color: 'var(--c-muted)' }}>
          Obrigado pela sua compra.
        </p>
        <Link
          to="/store"
          className="text-xs uppercase tracking-widest pb-0.5 hover:opacity-60 transition-opacity border-b"
          style={{
            borderColor: 'var(--c-text)',
            color: 'var(--c-text)',
          }}
        >
          Continuar comprando
        </Link>
      </Container>
    )
  }

  if (items.length === 0) {
    return (
      <Container size="narrow" className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <h2
          className="font-serif tracking-widest uppercase"
          style={{ fontSize: 'var(--text-heading)', color: 'var(--c-text)' }}
        >
          Carrinho vazio
        </h2>
        <p className="text-sm" style={{ color: 'var(--c-muted)' }}>
          Adicione produtos para continuar
        </p>
        <Link
          to="/store"
          className="text-xs uppercase tracking-widest pb-0.5 hover:opacity-60 transition-opacity border-b"
          style={{ borderColor: 'var(--c-text)', color: 'var(--c-text)' }}
        >
          Continuar comprando
        </Link>
      </Container>
    )
  }

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Lista de itens — centrada em narrow */}
      <Container size="narrow" className="flex-1 pt-8">
        <h1
          className="font-serif tracking-widest uppercase mb-8"
          style={{ fontSize: 'var(--text-heading)', color: 'var(--c-text)' }}
        >
          Carrinho
        </h1>

        <div>
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
      </Container>

      {/* Footer fixo — também usa narrow para alinhar com a lista */}
      <div
        className="sticky bottom-0 border-t"
        style={{
          borderColor: 'var(--c-border)',
          backgroundColor: 'var(--c-bg)',
        }}
      >
        <Container size="narrow" className="py-4 flex items-center justify-between">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-0.5"
              style={{ color: 'var(--c-muted)' }}
            >
              Total
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--c-text)' }}
            >
              {formatCurrency(total)}
            </p>
          </div>
          <Button variant="primary" onClick={handleCheckout} className="w-full md:w-auto">
            Finalizar compra
          </Button>
        </Container>
      </div>
    </div>
  )
}
