// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify statistic list', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  await page.waitForTimeout(5000);

  const element = await page.getByText('Giao hàng nhanh').scrollIntoViewIfNeeded();

  //verify giao hàng nhanh và icon
  await expect(page.locator('#thong-ke path').first()).toBeVisible();
  await expect(page.locator('#thong-ke')).toContainText('Giao hàng nhanh');
  await expect(page.locator('#thong-ke path').nth(2)).toBeVisible();
  //verify bảo mật thanh toán và icon
  await expect(page.locator('#thong-ke')).toContainText('Bảo mật thanh toán');
  await expect(page.locator('#thong-ke').getByRole('img').nth(2)).toBeVisible();
  //verify chất lượng đỉnh nhất và icon
  await expect(page.locator('#thong-ke')).toContainText('Chất lượng đỉnh nhất');
  await expect(page.locator('#thong-ke path').nth(4)).toBeVisible();
  //verify chính sách rõ ràng và icon
  await expect(page.locator('#thong-ke')).toContainText('Chính sách rõ ràng');
  await expect(page.locator('#thong-ke path').nth(4)).toBeVisible();


 
  // await expect(page.getByRole('button', { name: 'Picture of the author The' })).toBeVisible();
  // await expect(page.locator('#book-button')).toBeVisible();
  // await expect(page.getByPlaceholder('Tìm sách…')).toBeVisible();
  // await expect(page.locator('#search')).toBeVisible();






});