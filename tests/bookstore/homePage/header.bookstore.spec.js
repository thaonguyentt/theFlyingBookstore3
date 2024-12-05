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
    //verify logo trang web 
    await expect(page.getByRole('button', { name: 'Picture of the author The' })).toBeVisible();
    //verify button chọn thể loại
    await expect(page.locator('#book-button')).toBeVisible();
    //verify placeholder tìm sách
    await expect(page.getByPlaceholder('Tìm sách…')).toBeVisible();
    //verify icon search
    await expect(page.locator('#search')).toBeVisible();
    //verify icon quản lý
    await expect(page.getByLabel('show 4 new mails').first()).toBeInViewport();
    await expect(page.locator('xpath=(//button[@aria-label="show 4 new mails"])[1]')).toBeInViewport();
    //verify icon giỏ hàng
    await expect(page.locator('xpath=(//button[@aria-label="show 4 new mails"])[2]')).toBeInViewport();
    //verify icon quản lý
    await expect(page.locator('xpath=(//button[@aria-label="show 4 new mails"])[3]')).toBeInViewport();
    await expect(page.locator('a').filter({ hasText: /^1$/ }).getByLabel('show 4 new mails')).toBeInViewport();
    await expect(page.getByLabel('show 4 new mails').nth(2)).toBeInViewport();

  } catch (error) {
    console.error('Error loading state:', error);
  }
  

});