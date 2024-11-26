// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL_Home;
const authFile = './playwright/.auth/user.json';


test('verify header', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  try {
    await page.context().storageState({ path: authFile });
    console.log('Loaded state from', authFile);
    await page.goto(url);
    await page.waitForTimeout(7000);
    await expect(page.getByRole('button', { name: 'Picture of the author The' })).toBeVisible();
    await expect(page.locator('#book-button')).toBeVisible();
    await expect(page.getByPlaceholder('Tìm sách…')).toBeVisible();
    await expect(page.locator('#search')).toBeVisible();
    await expect(page.getByLabel('show 4 new mails').first()).toBeInViewport();
    await page.waitForTimeout(3000);
    await expect(page.locator('xpath=(//button[@aria-label="show 4 new mails"])[1]')).toBeInViewport();
    await expect(page.locator('xpath=(//button[@aria-label="show 4 new mails"])[2]')).toBeInViewport();
    await expect(page.locator('xpath=(//button[@aria-label="show 4 new mails"])[3]')).toBeInViewport();
    await expect(page.locator('a').filter({ hasText: /^1$/ }).getByLabel('show 4 new mails')).toBeInViewport();
    await expect(page.getByLabel('show 4 new mails').nth(2)).toBeInViewport();

  } catch (error) {
    console.error('Error loading state:', error);
  }
  

});