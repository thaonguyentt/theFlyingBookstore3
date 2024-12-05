// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test.skip('verify tab order sale order', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

   // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

 //set text on search input and click search icon
//  await page.getByPlaceholder('Tìm sách…').fill('Ice');

 await page.locator('#search').click();

 await page.waitForTimeout(5000);


  //Click listing "cover of ice"
  await page.locator('(//*[@class="grid grid-cols-4 gap-4"]//img)[3]').click();

    // //scroll to a element 
    // const detail_elem = await page.getByRole('button', { name: 'Mua sách với giá 263.620đ' });
    // await detail_elem.scrollIntoViewIfNeeded();

  //click button mua ngay
  await page.getByRole('button', { name: 'Mua ngay' }).click();

  //click button đặt mua hàng
  await page.getByRole('button', { name: 'Đặt mua hàng' }).click();

  //click button tạo đơn hàng
  await page.getByRole('button', { name: 'Tạo đơn hàng' }).click();



});