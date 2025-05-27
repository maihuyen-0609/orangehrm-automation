import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SearchPage } from '../pages/searchPage';

test.describe('Left Sidebar Menu Search Tests', () => {
  let searchPage: SearchPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('aside');
    searchPage = new SearchPage(page);
  });

  test('Search exact menu item', async ({ page }) => {
    await searchPage.searchMenu('Dashboard');
    const results = await searchPage.getMenuResults();
    expect(results).toContain('Dashboard');
  });

  test('Search partial menu name', async ({ page }) => {
    await searchPage.searchMenu('adm');
    const results = await searchPage.getMenuResults();
    expect(results.some(r => r.toLowerCase().includes('admin'))).toBeTruthy();
  });

  test('Search case-insensitive', async ({ page }) => {
    await searchPage.searchMenu('PeRfOrMaNcE');
    const results = await searchPage.getMenuResults();
    expect(results.some(r => r.toLowerCase() === 'performance')).toBeTruthy();
  });

  test('Search with special characters', async ({ page }) => {
    await searchPage.searchMenu('@#*&^');
    const results = await searchPage.getMenuResults();
    expect(results.length).toBe(0); 
  });

  test('Search empty string shows all menu', async ({ page }) => {
    await searchPage.searchMenu('');
    const results = await searchPage.getMenuResults();
    expect(results.length).toBeGreaterThan(5);
  });

  test('Search while navigating', async ({ page }) => {
    await searchPage.searchMenu('b');
    await searchPage.selectMenuByName('Buzz');
    await expect(page).toHaveURL(/buzz/);

  });
});
