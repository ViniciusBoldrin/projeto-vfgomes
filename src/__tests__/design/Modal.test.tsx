import { render, screen } from '@testing-library/react'
import { Modal } from '../../components/ui/Modal'

function renderModal() {
  render(
    <Modal isOpen title="Teste" onClose={() => {}}>
      <p>Conteúdo</p>
    </Modal>
  )
}

describe('Modal — design system Zara', () => {
  it('overlay tem bg-black/60 (sem backdrop-blur)', () => {
    renderModal()
    // O overlay é o div absoluto atrás do dialog
    const overlay = document.querySelector('.absolute.inset-0')
    expect(overlay?.className).toContain('bg-black/60')
    expect(overlay?.className).not.toContain('backdrop-blur')
  })

  it('dialog não tem rounded-2xl', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).not.toContain('rounded-2xl')
    expect(dialog.className).not.toContain('rounded-xl')
  })

  it('dialog não tem shadow-2xl', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).not.toContain('shadow-2xl')
    expect(dialog.className).not.toContain('shadow-lg')
  })

  it('dialog tem borda border-neutral-200', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('border')
    expect(dialog.className).toContain('border-neutral-200')
  })
})
