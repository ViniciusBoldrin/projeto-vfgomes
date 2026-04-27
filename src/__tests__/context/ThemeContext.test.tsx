import { render, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../context/ThemeContext'

function ThemeToggler() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('ThemeContext', () => {
  it('CA-F5-1: toggleTheme saves dark to localStorage', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>
    )

    act(() => {
      getByRole('button').click()
    })

    expect(localStorage.getItem('theme')).toBe('"dark"')
  })

  it('CA-F5-1: initializes with dark theme from localStorage and applies class', () => {
    localStorage.setItem('theme', '"dark"')

    render(
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
