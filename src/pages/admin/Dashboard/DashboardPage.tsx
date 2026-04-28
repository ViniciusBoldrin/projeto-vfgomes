import { useEffect } from 'react'
import { useProductsStore } from '../../../store/productsStore'
import { useUsersStore } from '../../../store/usersStore'

interface StatCardProps {
  label: string
  value: number | string
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-black p-8 flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-neutral-400">{label}</p>
      <p className="font-serif text-4xl text-black dark:text-white">{value}</p>
    </div>
  )
}

export default function DashboardPage() {
  const { products, init: initProducts } = useProductsStore()
  const { users, init: initUsers } = useUsersStore()

  useEffect(() => {
    initProducts()
    initUsers()
  }, [initProducts, initUsers])

  const categories = new Set(products.map((p) => p.category)).size

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-xl tracking-widest uppercase text-black dark:text-white">Dashboard</h1>
        <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Visão geral da loja</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-100 dark:bg-neutral-900">
        <StatCard label="Usuários" value={users.length} />
        <StatCard label="Produtos" value={products.length} />
        <StatCard label="Categorias" value={categories} />
      </div>
    </div>
  )
}
