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
  
    // verify header quản lý voucher của tôi
    await expect(page.getByRole('heading', { name: 'Quản lý voucher của tôi' })).toBeVisible();
    //verify tab in page: tất cả voucher, voucher theo giá tiền, voucher theo phần trăm
    await expect(page.getByRole('tab', { name: 'Tất cả Voucher' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Tất cả Voucher' })).toBeEnabled;
    await expect(page.getByRole('tab', { name: 'Voucher theo giá tiền' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Voucher theo giá tiền' })).toBeEnabled();
    await expect(page.getByRole('tab', { name: 'Voucher theo phần trăm' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Voucher theo phần trăm' })).toBeEnabled();
  
    //verify thông tin hiển thị trên grid: id, tên, mã, thời gian hiệu lực, giá trị tối thiểu,
    // loại voucher, số tiền giảm
    await expect(page.locator('div').filter({ hasText: /^Id$/ }).nth(2)).toBeVisible();
    await expect(page.getByText('Tên')).toBeVisible();
    await expect(page.getByText('Mã')).toBeVisible();
    await expect(page.getByText('Thời gian hiệu lực')).toBeVisible();
    await expect(page.locator('#order-tabpanel-0').getByText('Giá trị tối thiểu')).toBeVisible();
    await expect(page.getByText('Loại voucher')).toBeVisible();
    await expect(page.getByText('Số tiền giảm')).toBeVisible();
    // verify button thêm voucher
    await expect(page.getByRole('button', { name: 'Thêm voucher' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Thêm voucher' })).toBeEnabled();
  


});