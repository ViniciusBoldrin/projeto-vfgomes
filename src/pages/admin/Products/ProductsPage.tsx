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
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Produtos</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{products.length} produtos cadastrados</p>
        </div>
        <Button onClick={openCreate}>+ Novo Produto</Button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      )}

      {error && (
        <div role="alert" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">📦</p>
          <p>Nenhum produto cadastrado</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
