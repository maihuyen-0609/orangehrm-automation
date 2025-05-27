import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'webkit', use: devices['Desktop Safari'] },
  ],
  reporter: [
    ['list'], // simple console output
    ['html', { outputFolder: 'playwright-report', open: 'always' }], // HTML report
    ['json', { outputFile: 'test-results/results.json' }], // JSON report (optional)
  ],
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    headless: true,
    screenshot: 'only-on-failure',   // screenshot if test fail
    video: 'retain-on-failure',      // record if test fail
  },
});
