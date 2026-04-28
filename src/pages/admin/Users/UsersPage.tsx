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
    <div className="space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl tracking-widest uppercase text-black dark:text-white">Usuários</h1>
          <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">{users.length} cadastrados</p>
        </div>
        <Button onClick={openCreate}>+ Novo Usuário</Button>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {error && (
        <div role="alert" className="border border-red-200 p-4 text-xs text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs uppercase tracking-widest text-neutral-400">Nenhum usuário encontrado</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-left">
                  <th className="px-4 py-3 text-xs uppercase tracking-widest text-neutral-400 font-normal">Nome</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-widest text-neutral-400 font-normal">Email</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-widest text-neutral-400 font-normal">Username</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-widest text-neutral-400 font-normal hidden md:table-cell">Telefone</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-widest text-neutral-400 font-normal">Ações</th>
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
