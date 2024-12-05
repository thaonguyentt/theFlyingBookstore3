// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify tab order sale order', async ({ page }) => {
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

 await page.waitForTimeout(5000);


  //Click listing "cover of ice"
  await page.getByRole('link', { name: 'Cover of Ice Ice Thuê: 1.600' }).click();

    //scroll to a element 
    const detail_elem = await page.getByRole('button', { name: 'Mua sách với giá 263.620đ' });
    await detail_elem.scrollIntoViewIfNeeded();

  //verify title of tab sale order
  await expect(page.getByRole('main')).toContainText('Mua sách với giá');
  //verify button "mua ngay"
  await expect(page.getByRole('button', { name: 'Mua ngay' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mua ngay' })).toBeEnabled();

  //verify button "thu gọn"
  await expect(page.getByRole('button', { name: 'Mua sách với giá 263.620đ' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mua sách với giá 263.620đ' })).toBeEnabled();

});