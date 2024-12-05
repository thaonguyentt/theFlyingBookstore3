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

  //Click the first listing
  await page.locator('(//*[@class="grid grid-cols-4 gap-4"]//img)[3]').click();

    // //scroll to a element 
    // const detail_elem = await page.getByRole('button', { name: 'Mua sách với giá 263.620đ' });
    // await detail_elem.scrollIntoViewIfNeeded();

  //click button mua ngay
  await page.getByRole('button', { name: 'Mua ngay' }).click();

  //click button đặt mua hàng
  await page.getByRole('button', { name: 'Đặt mua hàng' }).click();

  // verify header mã giảm giá
  await expect(page.getByRole('heading', { name: 'Mã giảm giá' })).toBeVisible();
  //verify text khuyến mãi từ người bán
  await expect(page.getByRole('heading', { name: 'Khuyến Mãi từ người bán' })).toBeVisible();
  // verify có thể chọn 1 voucher
  await expect(page.locator('div').filter({ hasText: /^Khuyến Mãi từ người bánCó thể chọn 1$/ }).locator('span')).toBeVisible();
  //verify button bỏ chọn
  await expect(page.locator('//*[text()="Bỏ Chọn"]').first()).toBeVisible();
  await expect(page.locator('//*[text()="Bỏ Chọn"]').first()).toBeEnabled();
  // verify text chọn hoặc nhập mã khác
  await expect(page.locator('button').filter({ hasText: /^Chọn hoặc nhập mã khác$/ })).toBeVisible();
  //verify text khuyến mãi toàn sàn
  await expect(page.getByRole('heading', { name: 'Khuyến Mãi toàn sàn' })).toBeVisible();
  //verify text có thể chọn 1 khuyến mãi toàn sàn
  await expect(page.locator('div').filter({ hasText: /^Khuyến Mãi toàn sànCó thể chọn 1$/ }).locator('span')).toBeVisible();
  // verify button bỏ chọn voucher toàn sàn
  await expect(page.locator('//*[text()="Bỏ Chọn"]').nth(1)).toBeVisible();
  await expect(page.locator('//*[text()="Bỏ Chọn"]').nth(1)).toBeEnabled();
  //verify text chọn hoặc nhập mã khác
  await expect(page.getByRole('button', { name: 'Chọn hoặc nhập mã khác' }).nth(1)).toBeVisible();


});