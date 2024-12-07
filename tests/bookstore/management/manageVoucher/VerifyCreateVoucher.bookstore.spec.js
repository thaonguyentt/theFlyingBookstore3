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

  // click icon manage page
  await page.getByLabel('show 4 new mails').first().click();
  await page.getByRole('link', { name: 'Đơn thuê' }).click();

  //click quản lý voucher
  await page.getByText('Quản lý voucher', { exact: true }).click();

  await page.waitForTimeout(3000);

  //click nút thêm voucher
  await page.getByRole('button', { name: 'Thêm voucher' }).click();
  
  //verify header tạo voucher mới
  await expect(page.getByRole('heading', { name: 'Tạo Voucher mới' })).toBeVisible();

  // verify thông tin cần cung cấp: tên voucher, mã voucher, ngày bắt đầu khuyến mãi,
  //ngày kết thúc khuyến mãi, minimum value, discount percentage, voucher type
  await expect(page.getByText('Tên Voucher *')).toBeVisible();
  await expect(page.getByText('Mã Voucher *')).toBeVisible();
  await expect(page.getByLabel('Ngày bắt đầu khuyến mãi')).toBeVisible();
  await expect(page.getByLabel('Ngày kết thúc khuyến mãi')).toBeVisible();
  await expect(page.getByText('Minimum Value *')).toBeVisible();
  await expect(page.getByText('Discount Percentage')).toBeVisible();
  await expect(page.getByText('Voucher Type *')).toBeVisible();

  //verify button create voucher
  await expect(page.getByRole('button', { name: 'Create Voucher' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create Voucher' })).toBeEnabled();

  


});