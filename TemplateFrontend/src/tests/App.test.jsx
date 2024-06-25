// sum.test.js
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../components/App'
describe("App", () => {
  it("Correct Header for App", () => {
    render(<App/>)
    expect(screen.getByRole("heading").textContent).toMatch(/Messaging App/i)
  })
})
