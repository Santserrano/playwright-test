import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '../tests/',
  timeout: 30000,
  use: {
    headless: false, // <-- chrome
    viewport: { width: 1280, height: 720 },
    baseURL: process.env.BASE_URL,
    actionTimeout: 5000,
  },
});
