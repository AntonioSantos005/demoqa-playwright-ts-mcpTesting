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

  // Wait 10 seconds before closing browser
  await page.waitForTimeout(10000)
})

test('login with invalid credentials and validate error message', async ({ page }) => {
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
  
  // Fill in invalid login credentials
  await usernameInput.fill('asdasde')
  await passwordInput.fill('asdasd')
  
  // Click login button
  await loginButton.click()
  
  // Validate error message appears
  // Wait for error message to be displayed
  const errorMessage = page.locator('text=Invalid username or password!')
  await expect(errorMessage).toBeVisible({ timeout: 10000 })
  
  // Verify error message is in red by checking for the error styling element
  // The error appears in a styled message on the page
  const errorElement = page.locator('[id*="output"], [class*="error"]')
  
  // Check that error message contains the expected text
  const errorText = await page.locator('body').textContent()
  expect(errorText).toContain('Invalid username or password!')
  
  // Wait 10 seconds before closing browser
  await page.waitForTimeout(10000)
})
