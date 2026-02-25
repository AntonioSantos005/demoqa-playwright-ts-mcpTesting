import { test, expect } from '@playwright/test'

test('login with valid credentials and validate successful login', async ({ page }) => {
  // Navigate to login page
  await page.goto('/login')
  
  // Map and validate login page elements
  const loginHeading = page.locator('h1.text-center')
  await expect(loginHeading).toBeVisible()
  expect(await loginHeading.textContent()).toContain('Login')
  
  // Get username input field
  const usernameInput = page.locator('input[id="userName"]')
  await expect(usernameInput).toBeVisible()
  
  // Get password input field
  const passwordInput = page.locator('input[id="password"]')
  await expect(passwordInput).toBeVisible()
  
  // Get login button
  const loginButton = page.locator('button#login')
  await expect(loginButton).toBeVisible()
  
  // Fill in login credentials
  await usernameInput.fill('antonioSantos')
  await passwordInput.fill('Teste0**')
  
  // Click login button
  await loginButton.click()
  
  // Validate successful login
  // Wait for page to change (either navigation or dynamic content)
  await page.waitForNavigation({ timeout: 10000 }).catch(() => null)
  
  // Check if login was successful by validating the userName-value element
  const userNameValueElement = page.locator('#userName-value')
  await expect(userNameValueElement).toBeVisible()
  
  // Get the text content and compare with the provided username
  const displayedUsername = await userNameValueElement.textContent()
  expect(displayedUsername?.trim()).toBe('antonioSantos')

})
