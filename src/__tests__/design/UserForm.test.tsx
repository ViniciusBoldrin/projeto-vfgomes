import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { UserForm } from '../../components/shared/UserForm'
import type { FakeStoreUser } from '../../types/user'

const existingUser: FakeStoreUser = {
  id: 1,
  email: 'john@email.com',
  username: 'johnd',
  password: 'pass1',
  name: { firstname: 'John', lastname: 'Doe' },
  phone: '1-234',
  address: { city: 'NYC', street: 'Main', number: 1, zipcode: '12345', geolocation: { lat: '', long: '' } },
}

describe('UserForm — validação de senha (F6-CA3)', () => {
  it('campo senha é required ao criar novo usuário (sem initialData)', () => {
    render(
      <UserForm isOpen={true} onClose={vi.fn()} onSubmit={vi.fn().mockResolvedValue(undefined)} />
    )
    const passwordInput = screen.getByLabelText(/senha/i)
    expect(passwordInput).toHaveAttribute('required')
  })

  it('campo senha NÃO é required ao editar usuário existente', () => {
    render(
      <UserForm isOpen={true} onClose={vi.fn()} onSubmit={vi.fn().mockResolvedValue(undefined)} initialData={existingUser} />
    )
    const passwordInput = screen.getByLabelText(/senha/i)
    expect(passwordInput).not.toHaveAttribute('required')
  })
})
