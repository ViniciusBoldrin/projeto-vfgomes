import { Button } from '../ui/Button'
import type { FakeStoreUser } from '../../types/user'

interface UserRowProps {
  user: FakeStoreUser
  onEdit: (user: FakeStoreUser) => void
  onDelete: (id: number) => void
}

export function UserRow({ user, onEdit, onDelete }: UserRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
        {user.name.firstname} {user.name.lastname}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.username}</td>
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">{user.phone}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => onEdit(user)} aria-label="Editar" className="text-xs px-2 py-1">
            Editar
          </Button>
          <Button variant="danger" onClick={() => onDelete(user.id)} aria-label="Excluir" className="text-xs px-2 py-1">
            Excluir
          </Button>
        </div>
      </td>
    </tr>
  )
}
