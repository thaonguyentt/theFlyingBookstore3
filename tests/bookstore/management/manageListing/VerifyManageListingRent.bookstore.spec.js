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

  await page.waitForTimeout(3000);
   // click icon manage persional information 
  await page.getByLabel('show 4 new mails').nth(2).click();

  await page.waitForTimeout(3000);

  //verify header quản lý bài đăng của tôi
  await expect(page.getByRole('heading', { name: 'Quản lý bài đăng của tôi' })).toBeVisible();

  //verify 3 tab bài đăng bán và thuê, bài đăng chỉ thuê, bài đăng chỉ bán

  await page.getByRole('tab', { name: 'Bài đăng chỉ thuê' }).click();

  //verify thông tin trên grid: id, tên bài đăng, tác giả, giá thuê, tiền cọc, tiền phạt,
  //giá bán
  await expect(page.locator('div').filter({ hasText: /^Id$/ }).nth(2)).toBeVisible();
  await expect(page.getByText('Tên bài đăng')).toBeVisible();
  await expect(page.getByText('Tác giả')).toBeVisible();
  await expect(page.getByText('Giá thuê')).toBeVisible();
  await expect(page.getByText('Tiền cọc')).toBeVisible();
  await expect(page.getByText('Tiền phạt')).toBeVisible();

});