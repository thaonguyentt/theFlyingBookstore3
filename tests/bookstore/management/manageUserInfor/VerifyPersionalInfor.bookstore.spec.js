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

  //verify header thông tin cá nhân
  await expect(page.getByRole('heading', { name: 'Thông tin cá nhân' })).toBeVisible();
  //verify các thông tin còn lại: họ và tên lót, tên, email, ngày sinh, số điện thoại, địa chỉ
  await expect(page.getByText('Họ và tên lót *')).toBeVisible();
  await expect(page.getByText('Tên *')).toBeVisible();
  await expect(page.getByText('Email *')).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Ngày sinh *' })).toBeVisible();
  await expect(page.getByText('Số điện thoại *')).toBeVisible();
  await expect(page.getByText('Địa chỉ *')).toBeVisible();
  //verify button xác nhận chỉnh sửa thông tin cá nhân
  await expect(page.getByRole('button', { name: 'Xác nhận' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Xác nhận' })).toBeEnabled();


});