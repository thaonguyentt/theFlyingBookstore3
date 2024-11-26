// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL_Home;

test('verify header', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);
  await expect(page.getByRole('button', { name: 'Picture of the author The' })).toBeVisible();
  await expect(page.locator('#book-button')).toBeVisible();
  await expect(page.getByPlaceholder('Tìm sách…')).toBeVisible();
  await expect(page.locator('#search')).toBeVisible();
  // await expect(page.getByLabel('show 4 new mails').first()).toBeVisible();
  // await expect(page.locator('(//button[@aria-label="show 4 new mails"])[1]')).toBeVisible();
  // await expect(page.locator('(//button[@aria-label="show 4 new mails"])[2]')).toBeVisible();
  // await expect(page.locator('(//button[@aria-label="show 4 new mails"])[3]')).toBeVisible();
  // await expect(page.locator('a').filter({ hasText: /^1$/ }).getByLabel('show 4 new mails')).toBeVisible();
  // await expect(page.getByLabel('show 4 new mails').nth(2)).toBeVisible();


});