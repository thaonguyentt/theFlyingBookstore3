// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify detail listing page ', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

   // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

 //set text on search input and click search icon
 await page.getByPlaceholder('Tìm sách…').fill('Ice');
 await page.locator('#search').click();

  //Click listing "cover of ice"
  await page.getByRole('link', { name: 'Cover of Ice Ice Thuê: 1.600' }).click();

  //image of book cover is present 
  await expect(page.getByRole('img', { name: 'book' })).toBeVisible();
  
  //click and verify tab review
  await expect(page.getByRole('tab', { name: 'Đánh giá' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Đánh giá' })).toBeEnabled();
  await page.getByRole('tab', { name: 'Đánh giá' }).click();

  //scroll to tab detail book
  page.getByRole('tab', { name: 'Đánh giá' }).scrollIntoViewIfNeeded();

  //verify information of book review of user (icon review, các tab chọn xem tất cả, 5 sao đến 1 sao)
  await expect(page.locator('div').filter({ hasText: /^5$/ }).nth(2)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Xem tất cả' })).toBeVisible();
  await expect(page.getByRole('button', { name: '5 sao' })).toBeVisible();
  await expect(page.getByRole('button', { name: '4 sao' })).toBeVisible();
  await expect(page.getByRole('button', { name: '3 sao' })).toBeVisible();
  await expect(page.getByRole('button', { name: '2 sao' })).toBeVisible();
  await expect(page.getByRole('button', { name: '1 sao' })).toBeVisible();

});