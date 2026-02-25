import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly loginHeading: Locator
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.loginHeading = page.getByRole('heading', { name: 'Login', exact: true })
    this.usernameInput = page.locator('input[id="userName"]')
    this.passwordInput = page.locator('input[id="password"]')
    this.loginButton = page.getByRole('button', { name: /login/i })
    this.errorMessage = page.getByText(/invalid username or password/i)
  }

  async navigateToLogin() {
    await this.page.goto('/login')
  }

  async validateLoginPageElements() {
    await this.loginHeading.waitFor({ state: 'visible' })
    const headingText = await this.loginHeading.textContent()
    if (!headingText?.includes('Login')) {
      throw new Error('Login heading not found')
    }

    await this.usernameInput.waitFor({ state: 'visible' })
    await this.passwordInput.waitFor({ state: 'visible' })
    await this.loginButton.waitFor({ state: 'visible' })
  }

  async fillLoginForm(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
  }

  async clickLoginButton() {
    await this.loginButton.click()
  }

  async submitLogin(username: string, password: string) {
    await this.fillLoginForm(username, password)
    await this.clickLoginButton()
  }

  async isErrorMessageVisible(timeout: number = 10000) {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout })
      return true
    } catch {
      return false
    }
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent()
  }
}
