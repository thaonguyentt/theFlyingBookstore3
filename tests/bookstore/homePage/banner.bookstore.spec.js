// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify banner', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  await page.waitForTimeout(5000);

  //verify bán chạy
  await expect(page.locator('#banner1 > .hero > .max-w-2xl > p').first()).toBeVisible();
  //verify text danh nhân đến việt nam
  await expect(page.getByRole('heading', { name: 'Danh nhân Việt Nam' })).toBeVisible();
  //verify link thuê ngay
  await expect(page.getByRole('link', { name: 'Thuê ngay' })).toBeVisible();
  //verify link xem chi tiết
  await expect(page.getByRole('link', { name: 'Xem chi tiết' })).toBeVisible();
  //verify text bán chạy
  await expect(page.getByRole('main')).toContainText('BÁN CHẠY');
  //verify text doanh nhân việt nam
  await expect(page.getByRole('main')).toContainText('Danh nhân Việt Nam');
  //verify text thuê ngay
  await expect(page.getByRole('main')).toContainText('Thuê ngay');
  //verify text xem chi tiết
  await expect(page.getByRole('main')).toContainText('Xem chi tiết →');


 
  // await expect(page.getByRole('button', { name: 'Picture of the author The' })).toBeVisible();
  // await expect(page.locator('#book-button')).toBeVisible();
  // await expect(page.getByPlaceholder('Tìm sách…')).toBeVisible();
  // await expect(page.locator('#search')).toBeVisible();






});