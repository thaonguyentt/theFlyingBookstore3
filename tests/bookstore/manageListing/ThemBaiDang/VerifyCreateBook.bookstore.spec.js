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
  // verify tab tạo sách
  await expect(page.getByRole('button', { name: 'Sách', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sách', exact: true })).toBeEnabled();
  
  //verrify nội dung cần thêm: sách, tiêu đề, tác giả, thể loại, nhà xuất bản, số trang,
  //kích thước, isbn, ngày phát hành, ngôn ngữ
  await expect(page.getByLabel('Tìm sách *')).toBeVisible();
  await expect(page.getByText('Tiêu đề *')).toBeVisible();
  await expect(page.getByText('Tác giả *')).toBeVisible();
  await expect(page.getByText('Thể loại')).toBeVisible();
  await expect(page.getByText('Nhà xuất bản *')).toBeVisible();
  await expect(page.getByText('Số trang *')).toBeVisible();
  await expect(page.getByText('Kích thước')).toBeVisible();
  await expect(page.getByText('ISBN *')).toBeVisible();
  await expect(page.getByText('Ngày phát hành *')).toBeVisible();
  await expect(page.getByText('Ngôn ngữ *')).toBeVisible();

  // verify button chọn sách
  await expect(page.getByRole('button', { name: 'Chọn sách' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Chọn sách' })).toBeEnabled();


});