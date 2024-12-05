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

  //verify image of book
  await expect(page.getByRole('img', { name: 'd' })).toBeVisible();
  //verify listing information: số lượng
  await expect(page.getByText('Số lượng:')).toBeVisible();
  // verify button delete
  await expect(page.getByLabel('delete')).toBeVisible();
  await expect(page.getByLabel('delete')).toBeEnabled();

  //verify các thông tin còn lại: thông tin đặt hàng, người bán, địa chỉ, số điện thoại,
  //giá gốc, giá giảm trực tiếp, khuyến mãi từ người bán, tổng tiền thanh toán
  await expect(page.getByRole('heading', { name: 'Thông tin đặt hàng' })).toBeVisible();
  await expect(page.getByText('Người bán', { exact: true })).toBeVisible();
  await expect(page.getByText('Địa chỉ')).toBeVisible();
  await expect(page.getByText('Số điện thoại')).toBeVisible();
  await expect(page.getByText('Giá gốc')).toBeVisible();
  await expect(page.getByText('Giá giảm trực tiếp')).toBeVisible();
  await expect(page.getByText('Khuyến mãi từ người bán', { exact: true })).toBeVisible();
  await expect(page.getByText('Tổng tiền thanh toán')).toBeVisible();
  //verify button đặt mua hàng
  await expect(page.getByRole('button', { name: 'Đặt mua hàng' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Đặt mua hàng' })).toBeEnabled();

});