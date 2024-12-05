// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify check out page for leaseOrder', async ({ page }) => {
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


  //verify tab thuê theo ngày
  await expect(page.getByRole('main')).toContainText('Thuê theo ngày');

  //chọn ngày 31
  await page.getByLabel('Chọn ngày', { exact: true }).click();
  await page.getByRole('gridcell', { name: '31' }).click();

  //nút đặt thuê ngay có thể click
  await page.getByRole('button', { name: 'Đặt thuê ngay' }).click();

  //click butotn đặt thuê hàng in card
  await page.getByRole('button', { name: 'Đặt thuê hàng' }).click();

  // verify thông tin cho thuê bao gồm : đưa tiền trực tiếp, chuyển khoản, thanh toán vnpay
  await expect(page.getByText('Đưa tiền trực tiếp')).toBeVisible();
  await expect(page.getByText('Chuyển khoản')).toBeVisible();
  await expect(page.getByText('Thanh toán VNPay')).toBeVisible();
  await expect(page.getByText('Bạn sẽ đưa')).toBeVisible();
  

});