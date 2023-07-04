import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home page', () => {
  it('renders a Gallery link on Home page', () => {
    render(<Home />)

    const heading = screen.getByRole('link', {
      name: /Gallery/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
