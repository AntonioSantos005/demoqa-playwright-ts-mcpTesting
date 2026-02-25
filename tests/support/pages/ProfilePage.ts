import { Page, Locator } from '@playwright/test'

export class ProfilePage {
  readonly page: Page
  readonly userNameValue: Locator

  constructor(page: Page) {
    this.page = page
    // Usar getByLabel para encontrar o campo de username exibido na página de perfil
    this.userNameValue = page.locator('#userName-value')
  }

  async navigateToProfile() {
    await this.page.goto('/profile')
  }

  async isUserNameValueVisible(timeout: number = 10000) {
    try {
      await this.userNameValue.waitFor({ state: 'visible', timeout })
      return true
    } catch {
      return false
    }
  }

  async getUserName() {
    return await this.userNameValue.textContent()
  }

  async validateUserNameDisplayed(expectedUsername: string) {
    const displayedUsername = await this.getUserName()
    if (displayedUsername?.trim() !== expectedUsername) {
      throw new Error(
        `Expected username '${expectedUsername}' but got '${displayedUsername?.trim()}'`
      )
    }
  }

  async waitBeforeClosing(milliseconds: number = 10000) {
    await this.page.waitForTimeout(milliseconds)
  }
}
