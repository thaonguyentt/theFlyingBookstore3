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

  // click icon manage page
  await page.getByLabel('show 4 new mails').first().click();
  await page.getByRole('link', { name: 'Đơn cho thuê' }).click();

  await page.waitForTimeout(3000);

  //verify header quản lý đơn thuê
  await expect(page.getByRole('heading', { name: 'Quản lý đơn cho thuê' })).toBeVisible();
  //verify tab trên quản lý đơn thuê page : tất cả, đã đặt hàng, đã nhận, đã quá hạn,
  //đã trả sách, đã huỷ
  await expect(page.getByRole('tab', { name: 'Tất cả' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Đã đặt hàng' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Đã nhận' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Đã quá hạn' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Đã trả sách' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Đã hủy' })).toBeVisible();

  //verify button tải
  await expect(page.getByRole('button', { name: 'Tải lại' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tải lại' })).toBeEnabled();

  


});