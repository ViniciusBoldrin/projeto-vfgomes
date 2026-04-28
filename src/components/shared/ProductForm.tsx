import { useEffect, useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { Product, ProductFormData } from '../../types/product'

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProductFormData) => Promise<void>
  initialData?: Product
}

export function ProductForm({ isOpen, onClose, onSubmit, initialData }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    title: initialData?.title ?? '',
    price: initialData?.price ?? 0,
    description: initialData?.description ?? '',
    category: initialData?.category ?? '',
    image: initialData?.image ?? '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm({
      title: initialData?.title ?? '',
      price: initialData?.price ?? 0,
      description: initialData?.description ?? '',
      category: initialData?.category ?? '',
      image: initialData?.image ?? '',
    })
  }, [initialData])

  function handleChange(field: keyof ProductFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === 'price' ? Number(e.target.value) : e.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(form)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const title = initialData ? 'Editar Produto' : 'Novo Produto'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título"
          value={form.title}
          onChange={handleChange('title')}
          required
        />
        <Input
          label="Preço"
          type="number"
          step="0.01"
          min="0.01"
          value={form.price}
          onChange={handleChange('price')}
          required
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="descricao" className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Descrição
          </label>
          <textarea
            id="descricao"
            value={form.description}
            onChange={handleChange('description')}
            rows={3}
            className="w-full pb-2 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-600 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
          />
        </div>
        <Input
          label="Categoria"
          value={form.category}
          onChange={handleChange('category')}
          required
        />
        <Input
          label="Imagem"
          type="url"
          value={form.image}
          onChange={handleChange('image')}
          placeholder="https://..."
        />

        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
          <Button type="submit" loading={loading}>Salvar</Button>
        </div>
      </form>
    </Modal>
  )
}
