import { Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchMenu(keyword: string) {
  await this.page.waitForSelector('input.oxd-input[placeholder="Search"]', { state: 'visible' });
  await this.page.fill('input.oxd-input[placeholder="Search"]', keyword);
}


  async getMenuResults() {
    return this.page.locator('.oxd-main-menu-item').allTextContents();
  }

  async selectFirstMenu() {
    await this.page.locator('.oxd-main-menu-item').first().click();
  }
   async selectMenuByName(name: string) {
    const menu = this.page.locator(`.oxd-main-menu-item`, { hasText: name });
    await menu.first().click();
  }

}
