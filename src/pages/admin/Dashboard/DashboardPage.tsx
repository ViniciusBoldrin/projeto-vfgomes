import { useEffect } from 'react'
import { useProductsStore } from '../../../store/productsStore'
import { useUsersStore } from '../../../store/usersStore'

interface StatCardProps {
  icon: string
  label: string
  value: number | string
  color: string
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex items-center gap-4 border-l-4 ${color} transition-shadow hover:shadow-lg`}>
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Visão geral da loja</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon="👥" label="Usuários" value={users.length} color="border-blue-500" />
        <StatCard icon="📦" label="Produtos" value={products.length} color="border-green-500" />
        <StatCard icon="🏷️" label="Categorias" value={categories} color="border-purple-500" />
      </div>
    </div>
  )
}
