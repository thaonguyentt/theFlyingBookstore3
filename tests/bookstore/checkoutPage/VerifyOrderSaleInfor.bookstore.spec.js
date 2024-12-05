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

   await page.waitForTimeout(5000);
  
  
  //Click the first listing
  await page.locator('(//*[@class="grid grid-cols-4 gap-4"]//img)[3]').click();


  //click button mua ngay
  await page.getByRole('button', { name: 'Mua ngay' }).click();

  //click button đặt mua hàng
  await page.getByRole('button', { name: 'Đặt mua hàng' }).click();

  // verify thông tin cho thuê bao gồm : người cho thuê, thời gian thuê, địa chỉ
  // số điện thoại, số ngày thuê, tiền thuê, tiền cọc, tổng cộng, tổng tiền thanh toán
  await expect(page.getByText('Người bán', { exact: true })).toBeVisible();
  await expect(page.getByText('Địa chỉ', { exact: true })).toBeVisible();
  await expect(page.getByText('Số điện thoại', { exact: true })).toBeVisible();
  await expect(page.getByText('Giá gốc')).toBeVisible();
  await expect(page.getByText('Giá giảm trực tiếp')).toBeVisible();
  await expect(page.getByText('Khuyến mãi từ người bán', { exact: true })).toBeVisible();
  await expect(page.getByText('Khuyến mãi từ The Flying')).toBeVisible();
  await expect(page.getByText('Tổng tiền thanh toán')).toBeVisible();
  

});