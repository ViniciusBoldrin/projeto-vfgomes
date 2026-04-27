import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import UsersPage from '../../pages/admin/Users/UsersPage'
import { useUsersStore } from '../../store/usersStore'
import type { FakeStoreUser } from '../../types/user'

vi.mock('../../services/usersService', () => ({
  usersService: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

const mockUsers: FakeStoreUser[] = [
  {
    id: 1,
    email: 'john@email.com',
    username: 'johnd',
    password: 'pass1',
    name: { firstname: 'John', lastname: 'Doe' },
    phone: '1-234',
    address: { city: 'NYC', street: 'Main', number: 1, zipcode: '12345', geolocation: { lat: '', long: '' } },
  },
  {
    id: 2,
    email: 'kate@email.com',
    username: 'kate',
    password: 'pass2',
    name: { firstname: 'Kate', lastname: 'Smith' },
    phone: '1-567',
    address: { city: 'LA', street: 'Oak', number: 2, zipcode: '90001', geolocation: { lat: '', long: '' } },
  },
]

function renderPage() {
  return render(
    <MemoryRouter>
      <UsersPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  useUsersStore.setState({ users: mockUsers, loading: false, error: null })
})

describe('UsersPage (Admin)', () => {
  it('CA-F2.1-1: shows username, email and name for each user', () => {
    renderPage()
    expect(screen.getByText('johnd')).toBeInTheDocument()
    expect(screen.getByText('john@email.com')).toBeInTheDocument()
    expect(screen.getByText('kate')).toBeInTheDocument()
    expect(screen.getByText('kate@email.com')).toBeInTheDocument()
  })

  it('CA-F2.1-2: creates a new user and shows it in the list', async () => {
    renderPage()

    await userEvent.click(screen.getByRole('button', { name: /novo usuário/i }))

    // Find inputs within the modal dialog
    const dialog = screen.getByRole('dialog')
    await userEvent.type(within(dialog).getByLabelText(/^nome$/i), 'New')
    await userEvent.type(within(dialog).getByLabelText(/sobrenome/i), 'User')
    await userEvent.type(within(dialog).getByLabelText(/email/i), 'new@email.com')
    await userEvent.type(within(dialog).getByLabelText(/username/i), 'newuser')
    await userEvent.type(within(dialog).getByLabelText(/senha/i), 'password123')

    await userEvent.click(within(dialog).getByRole('button', { name: /salvar/i }))

    await waitFor(() => {
      expect(screen.getByText('newuser')).toBeInTheDocument()
      expect(screen.getByText('new@email.com')).toBeInTheDocument()
    })
  })

  it('CA-F2.1-3: store updateUser reflects updated email in the list', async () => {
    renderPage()

    // Verify initial state
    expect(screen.getByText('john@email.com')).toBeInTheDocument()

    // Directly call the store action (simulates what the form submit would do)
    await useUsersStore.getState().updateUser(1, {
      firstname: 'John',
      lastname: 'Doe',
      email: 'updated@email.com',
      username: 'johnd',
      password: 'pass1',
      phone: '1-234',
    })

    await waitFor(() => {
      expect(screen.getByText('updated@email.com')).toBeInTheDocument()
      expect(screen.queryByText('john@email.com')).not.toBeInTheDocument()
    })
  })

  it('CA-F2.1-4: deletes a user and removes from the list', async () => {
    renderPage()

    expect(screen.getByText('johnd')).toBeInTheDocument()

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    await userEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(screen.queryByText('johnd')).not.toBeInTheDocument()
    })
  })
})
