import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isLoggedIn() {
    return this.page.locator('h6').textContent();
  }

}
