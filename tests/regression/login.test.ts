import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DashboardPage } from '../../pages/dashboardPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test('Successful login', async () => {
    await loginPage.login('Admin', 'admin123');
    const title = await dashboardPage.isLoggedIn();
    expect(title).toContain('Dashboard');
  });

  test('Login with wrong password', async ({page}) => {
    await loginPage.login('Admin', 'wrongpass');
    await page.waitForSelector('(//p[contains(@class,"oxd-text oxd-text--p")])[1]', { state: 'visible' });
    const error = await page.locator('(//p[contains(@class,"oxd-text oxd-text--p")])[1]').textContent();
    expect(error).toContain('Invalid credentials');
  });
  test('Login with wrong username', async ({page}) => {
    await loginPage.login('wrongusername', 'admin123');
    await page.waitForSelector('(//p[contains(@class,"oxd-text oxd-text--p")])[1]', { state: 'visible' });
    const error = await page.locator('(//p[contains(@class,"oxd-text oxd-text--p")])[1]').textContent();
    expect(error).toContain('Invalid credentials');
  });
  test('Login with empty credentials', async ({page}) => {
    await loginPage.login('', '');
    await page.waitForSelector('span.oxd-input-field-error-message', { state: 'visible' });

  const usernameError = await page.locator('span.oxd-input-field-error-message').first().textContent();
  const passwordError = await page.locator('span.oxd-input-field-error-message').nth(1).textContent();

  console.log('Username error:', usernameError);
  console.log('Password error:', passwordError);

  expect(usernameError).toBe('Required');
  expect(passwordError).toBe('Required');
  });
  test('Forgot password', async ({page}) => {
    await page.click('text=Forgot your password?');
    await page.fill('input[name="username"]', 'Admin');
  await page.click('button[type="submit"]');
  const confirmation = await page.locator('text=Reset Password link sent successfully').textContent();
  expect(confirmation).toContain('Reset Password');
  });
});
