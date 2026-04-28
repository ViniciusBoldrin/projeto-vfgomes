import type { FakeStoreUser } from '../../types/user'

interface UserRowProps {
  user: FakeStoreUser
  onEdit: (user: FakeStoreUser) => void
  onDelete: (id: number) => void
}

function PencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

export function UserRow({ user, onEdit, onDelete }: UserRowProps) {
  return (
    <tr className="border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
      <td className="px-4 py-3 text-xs text-black dark:text-white">
        {user.name.firstname} {user.name.lastname}
      </td>
      <td className="px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400">{user.email}</td>
      <td className="px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400">{user.username}</td>
      <td className="px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400 hidden md:table-cell">{user.phone}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(user)}
            aria-label="Editar usuário"
            title="Editar"
            className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none"
          >
            <PencilIcon />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            aria-label="Excluir usuário"
            title="Excluir"
            className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors focus-visible:outline-none"
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  )
}
