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

  //Click listing "cover of ice"
  await page.getByRole('link', { name: 'Cover of Ice Ice Thuê: 1.600' }).click();

    //scroll to a element 
    const detail_elem = await page.getByRole('heading', { name: 'Chủ sách' });
    await detail_elem.scrollIntoViewIfNeeded();

    //verify title "chủ sách"
  await expect(page.getByRole('main')).toContainText('Chủ sách');
  await expect(page.getByText('Số sách hiện có')).toBeVisible();
  // await expect(page.locator('div').filter({ hasText: /^Chủ sáchBraun TracySố sách hiện có8Số sách đang cho thuê3$/ }).getByRole('img')).toBeVisible();
  //verify số sách hiện có và số sách đang cho thuê"
  await expect(page.getByRole('main')).toContainText('Số sách hiện có');
  await expect(page.getByRole('main')).toContainText('Số sách đang cho thuê');

});