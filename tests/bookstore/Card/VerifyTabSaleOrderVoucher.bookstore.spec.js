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
  await page.locator('(//*[@class="grid grid-cols-4 gap-4"]//img)[1]').click();


  //click button mua ngay
  await page.getByRole('button', { name: 'Mua ngay' }).click();

  // verify voucher shop
  await expect(page.getByRole('heading', { name: 'Khuyến Mãi từ người bán' })).toBeVisible();
  //verify người mua có thể chọn 1 voucher
  await expect(page.locator('div').filter({ hasText: /^Khuyến Mãi từ người bánCó thể chọn 1$/ }).locator('span')).toBeVisible();
  //verify button bỏ chọn
  await expect(page.locator('//*[text()="Bỏ Chọn"]').first()).toBeVisible();
  await expect(page.locator('//*[text()="Bỏ Chọn"]').first()).toBeEnabled();
  //verify chọn hoặc nhập mã khác
  await expect(page.locator('button').filter({ hasText: /^Chọn hoặc nhập mã khác$/ })).toBeVisible();
  //verify voucher toàn sàn
  await expect(page.getByRole('heading', { name: 'Khuyến Mãi toàn sàn' })).toBeVisible();
  //verify người mua có thể chọn 1 voucher
  await expect(page.locator('div').filter({ hasText: /^Khuyến Mãi toàn sànCó thể chọn 1$/ }).locator('span')).toBeVisible();
  //verify button bỏ chọn
  await expect(page.locator('//*[text()="Bỏ Chọn"]').nth(1)).toBeVisible();
  await expect(page.locator('//*[text()="Bỏ Chọn"]').nth(1)).toBeEnabled();
  //verify chọn hoặc nhập mã khác khuyến mãi toàn sàn
  await expect(page.getByRole('button', { name: 'Chọn hoặc nhập mã khác' }).nth(1)).toBeVisible();


});