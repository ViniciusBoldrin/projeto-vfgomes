import { useEffect, useState } from 'react'
import { useProductsStore } from '../../../store/productsStore'
import { ProductCard } from '../../../components/shared/ProductCard'
import { ProductForm } from '../../../components/shared/ProductForm'
import { Button } from '../../../components/ui/Button'
import { ProductSkeleton } from '../../../components/ui/Skeleton'
import { Toast, useToast } from '../../../components/ui/Toast'
import type { Product, ProductFormData } from '../../../types/product'

export default function ProductsPage() {
  const { products, loading, error, init, addProduct, updateProduct, removeProduct } = useProductsStore()
  const { toast, showToast, closeToast } = useToast()
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Product | undefined>()

  useEffect(() => { init() }, [init])

  function openCreate() {
    setEditTarget(undefined)
    setFormOpen(true)
  }

  function openEdit(product: Product) {
    setEditTarget(product)
    setFormOpen(true)
  }

  async function handleSubmit(data: ProductFormData) {
    if (editTarget) {
      await updateProduct(editTarget.id, data)
      showToast('Produto atualizado com sucesso!')
    } else {
      await addProduct(data)
      showToast('Produto criado com sucesso!')
    }
  }

  async function handleDelete(id: number) {
    await removeProduct(id)
    showToast('Produto excluído.', 'error')
  }

  return (
    <div className="space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl tracking-widest uppercase text-black dark:text-white">Produtos</h1>
          <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">{products.length} cadastrados</p>
        </div>
        <Button onClick={openCreate}>+ Novo Produto</Button>
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div role="alert" className="border border-red-200 p-4 text-xs text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs uppercase tracking-widest text-neutral-400">Nenhum produto cadastrado</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ProductForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editTarget}
      />
    </div>
  )
}
