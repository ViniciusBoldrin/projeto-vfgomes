import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Usuários' },
  { to: '/admin/products', label: 'Produtos' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed md:static z-30 md:z-auto top-12 left-0 h-[calc(100vh-3rem)] md:h-full',
          'w-56 bg-black text-white border-r border-neutral-900',
          'flex flex-col py-6 transition-transform duration-300 ease-in-out shrink-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="px-6 mb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-500">Admin</span>
        </div>
        <nav className="flex-1 flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-6 py-3 text-xs uppercase tracking-widest transition-colors duration-200',
                  isActive
                    ? 'text-white border-l-2 border-white pl-[22px]'
                    : 'text-neutral-500 hover:text-white hover:bg-neutral-900 border-l-2 border-transparent pl-[22px]'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
