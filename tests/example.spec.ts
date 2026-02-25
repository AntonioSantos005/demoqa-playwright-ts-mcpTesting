import { test, expect } from '@playwright/test'
import { LoginPage } from './support/pages/LoginPage'
import { ProfilePage } from './support/pages/ProfilePage'

test('login with valid credentials and validate successful login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const profilePage = new ProfilePage(page)

  // Navigate to login page and validate elements
  await loginPage.navigateToLogin()
  await loginPage.validateLoginPageElements()

  // Submit login form with valid credentials
  await loginPage.submitLogin('antonioSantos', 'Teste0**')

  // Wait for navigation to profile page
  await page.waitForNavigation({ timeout: 10000 }).catch(() => null)

  // Validate successful login by checking profile page
  const isUserNameVisible = await profilePage.isUserNameValueVisible()
  expect(isUserNameVisible).toBeTruthy()

  // Validate the displayed username matches the login username
  await profilePage.validateUserNameDisplayed('antonioSantos')

  // Wait 10 seconds before closing browser
  await profilePage.waitBeforeClosing(10000)
})

test('login with invalid credentials and validate error message', async ({ page }) => {
  const loginPage = new LoginPage(page)

  // Navigate to login page and validate elements
  await loginPage.navigateToLogin()
  await loginPage.validateLoginPageElements()

  // Submit login form with invalid credentials
  await loginPage.submitLogin('asdasde', 'asdasd')

  // Validate error message appears
  const isErrorVisible = await loginPage.isErrorMessageVisible(10000)
  expect(isErrorVisible).toBeTruthy()

  // Verify error message contains expected text
  const errorText = await loginPage.getErrorMessageText()
  expect(errorText).toContain('Invalid username or password!')

  // Wait 10 seconds before closing browser
  await page.waitForTimeout(10000)
})
