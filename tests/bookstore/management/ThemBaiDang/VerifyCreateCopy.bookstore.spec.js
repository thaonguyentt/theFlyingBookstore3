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

  //scroll đến copy
  await page.getByRole('button', { name: 'Tài liệu', exact: true }).scrollIntoViewIfNeeded();

  //verify tab tạo copy
  await expect(page.getByRole('button', { name: 'Tài liệu', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tài liệu', exact: true })).toBeEnabled();

  //verify nội dung cần thêm: phần trăm hư hại, hình ảnh
  await expect(page.getByLabel('Phần trăm hư hại (%) *')).toBeVisible();
  await expect(page.getByText('Tải hình ảnh')).toBeVisible();
  await expect(page.getByText('Tải hình ảnh')).toBeEnabled();

  //verify button tạo tài liệu
  await expect(page.getByRole('button', { name: 'Tạo tài liệu' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tạo tài liệu' })).toBeEnabled();


});