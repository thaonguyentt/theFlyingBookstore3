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
   await page.getByRole('button', { name: 'account of current user' }).click();
   await page.getByRole('link', { name: 'Chào' }).click();

  await page.waitForTimeout(3000);

  //click thêm bài đăng
  await page.getByText('Thêm bài đăng').click();

  await page.waitForTimeout(3000);

   //scroll đến bài đăng
   await page.getByRole('button', { name: 'Bài đăng', exact: true }).scrollIntoViewIfNeeded();

  //verify header bài đăng
  await expect(page.getByRole('button', { name: 'Bài đăng', exact: true })).toBeVisible();

  // thêm các thông tin khác
  await expect(page.getByText('Mô tả trạng thái sách *')).toBeVisible();
  await expect(page.getByText('Chọn dịch vụ')).toBeVisible();
  await expect(page.getByLabel('Thuê và bán')).toBeVisible();
  await expect(page.getByText('Tiền cọc *')).toBeVisible();
  await expect(page.getByText('Giá thuê theo ngày *')).toBeVisible();
  await expect(page.getByText('Phí phạt trả trễ theo ngày *')).toBeVisible();
  await expect(page.getByText('Giá bán *')).toBeVisible();
  
  await expect(page.getByText('Địa chỉ cho thuê *')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tạo bài đăng' })).toBeVisible();
  await expect(page.getByText('Chỉ thuê')).toBeVisible();
  await expect(page.getByLabel('Chỉ thuê')).toBeVisible();
  await expect(page.getByText('Chỉ bán')).toBeVisible();
  await expect(page.getByLabel('Chỉ bán')).toBeVisible();


});