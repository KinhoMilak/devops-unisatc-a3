// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './e2e-tests',
  timeout: 60 * 1000, 
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', 
  use: {
    baseURL: 'http://localhost:1337', 
    trace: 'on-first-retry', 
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'], 
    },
  ],
  webServer: {
    command: 'npm run develop', 
    url: 'http://localhost:1337',
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});