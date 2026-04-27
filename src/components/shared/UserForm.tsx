import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { FakeStoreUser, UserFormData } from '../../types/user'

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UserFormData) => Promise<void>
  initialData?: FakeStoreUser
}

export function UserForm({ isOpen, onClose, onSubmit, initialData }: UserFormProps) {
  const [form, setForm] = useState<UserFormData>({
    firstname: initialData?.name.firstname ?? '',
    lastname: initialData?.name.lastname ?? '',
    email: initialData?.email ?? '',
    username: initialData?.username ?? '',
    password: '',
    phone: initialData?.phone ?? '',
  })
  const [loading, setLoading] = useState(false)

  function handleChange(field: keyof UserFormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
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

  const title = initialData ? 'Editar Usuário' : 'Novo Usuário'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Nome" value={form.firstname} onChange={handleChange('firstname')} required />
          <Input label="Sobrenome" value={form.lastname} onChange={handleChange('lastname')} required />
        </div>
        <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} required />
        <Input label="Username" value={form.username} onChange={handleChange('username')} required />
        <Input label="Senha" type="password" value={form.password} onChange={handleChange('password')} />
        <Input label="Telefone" value={form.phone} onChange={handleChange('phone')} />

        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
          <Button type="submit" loading={loading}>Salvar</Button>
        </div>
      </form>
    </Modal>
  )
}
