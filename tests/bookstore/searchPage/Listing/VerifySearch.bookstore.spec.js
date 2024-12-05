// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify dropdown "bộ lọc"', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

   // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

  //verify text present "tất cả sách"
  await expect(page.getByRole('main')).toContainText('Tất cả sách');

  //set text on search input and click search icon
  await page.getByPlaceholder('Tìm sách…').fill('b');
  await page.locator('#search').click();

  //verify text present 
  await expect(page.getByRole('main')).toContainText('Sách có tiêu đề bao gồm:');
  await expect(page.getByRole('button', { name: 'Sách mua và thuê' })).toBeEnabled;



});