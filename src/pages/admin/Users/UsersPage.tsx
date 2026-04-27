import { useEffect, useState } from 'react'
import { useUsersStore } from '../../../store/usersStore'
import { UserRow } from '../../../components/shared/UserRow'
import { UserForm } from '../../../components/shared/UserForm'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { Toast, useToast } from '../../../components/ui/Toast'
import type { FakeStoreUser, UserFormData } from '../../../types/user'

export default function UsersPage() {
  const { users, loading, error, init, addUser, updateUser, removeUser } = useUsersStore()
  const { toast, showToast, closeToast } = useToast()
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<FakeStoreUser | undefined>()

  useEffect(() => { init() }, [init])

  function openCreate() {
    setEditTarget(undefined)
    setFormOpen(true)
  }

  function openEdit(user: FakeStoreUser) {
    setEditTarget(user)
    setFormOpen(true)
  }

  async function handleSubmit(data: UserFormData) {
    if (editTarget) {
      await updateUser(editTarget.id, data)
      showToast('Usuário atualizado com sucesso!')
    } else {
      await addUser(data)
      showToast('Usuário criado com sucesso!')
    }
  }

  async function handleDelete(id: number) {
    await removeUser(id)
    showToast('Usuário excluído.', 'error')
  }

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Usuários</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{users.length} usuários cadastrados</p>
        </div>
        <Button onClick={openCreate}>+ Novo Usuário</Button>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {error && (
        <div role="alert" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">👥</p>
          <p>Nenhum usuário encontrado</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Nome</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Username</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">Telefone</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <UserForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editTarget}
      />
    </div>
  )
}
