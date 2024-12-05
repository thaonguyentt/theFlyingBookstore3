// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify detail tab in detail listing page', async ({ page }) => {
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

  //scroll to a element 
  const detail_elem = await page.getByRole('tab', { name: 'Chi tiết' });
  await detail_elem.scrollIntoViewIfNeeded();

  // //button book preview button is enabled
  // await expect(page.getByRole('button', { name: 'Xem trước sách' })).toBeVisible();
  // await expect(page.getByRole('button', { name: 'Xem trước sách' })).toBeEnabled();

  // //verify title, authors, publisher, Publication date of book 
  // await expect(page.getByRole('heading', { name: 'Ice' })).toBeVisible();
  // await expect(page.getByText('Tác giả')).toBeVisible();
  // await expect(page.getByText('Nhà xuất bản')).toBeVisible();
  // await expect(page.locator('p').filter({ hasText: 'Ngày xuất bản' })).toBeVisible();



});