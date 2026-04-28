import { Container } from './Container'

export function Footer() {
  return (
    <footer
      className="py-8 mt-auto border-t"
      style={{
        borderColor: 'var(--c-border)',
        backgroundColor: 'var(--c-subtle)',
      }}
    >
      <Container>
        <div className="flex justify-center">
          <span
            className="font-serif text-xs uppercase tracking-[0.15em]"
            style={{ color: 'var(--c-muted)' }}
          >
            © 2026 FAKESTORE
          </span>
        </div>
      </Container>
    </footer>
  )
}
