// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');
import path from 'path';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

const timeInMin= 60 * 1000;

module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,
  /*set timeout */
  timeout: Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  //chấp nhận download tệp được xử lý bởi playwright
  acceptDownloads: true,

  reporter: [
    ['html',{ outputFolder: 'reports', outputFile : 'test-results.html' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInMin,
    navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInMin,
    // viewport: null,
    
    ignoreHTTPSErrors: true,
    screenshot: {
      // acceptDownloads: true,
      mode: "only-on-failure",
      fullPage: true,
      // downloadsPath: "./Files/Downloads",
    },
  },

  /* Configure projects for major browsers */
  projects: [

    { name: 'setupBookstore', testMatch: /auth\.bookstore\.setup\.js/},

    {
      name: 'bookstore', // tên project
      use: {
        ...devices['Desktop Chrome'],
        // viewport: { width: 1536, height: 864 },
        //config save authentication
        storageState: 'playwright/.auth/user.json',
        // headless: false,
        // viewport: { width: 1280, height: 720 },
        launchOptions: {
          // Chạy chế độ có giao diện
          headless: false,
          // args: ["--start-maximized","--disable-extensions", "--disable-plugins"],
          // slowMo: 50,
          // downloadsPath: "./Files/Downloads", eeh gemini AI nó nói dầy nè

        },
        video: 'off',
      },
      dependencies: ['setupBookstore'], // là chỗ này để xác định file auth
    },

    {
      name: 'chrome', // tên project
      testMatch: "*.chrome.spec.js",
      // acceptDownloads: true,
      // headless: false,
      use: {
        // ...devices['Desktop Chrome'],
        // //config save authentication
        // // storageState: 'playwright/.auth/user.json',
        // headless: false,
        // launchOptions: {
        //   // Chạy chế độ có giao diện
        //   headless: false,
        //   // args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
        //   // slowMo: 50,
        //   // downloadsPath: "./Files/Downloads",
        // viewport: { width: 1280, height: 720 },
        },
      // },
      // dependencies: ['setupHcmut'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

