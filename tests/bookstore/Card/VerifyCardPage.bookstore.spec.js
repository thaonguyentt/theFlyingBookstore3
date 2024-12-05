// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify detail listing page ', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  //click giỏ hàng
  await page.locator('a').filter({ hasText: '1' }).getByLabel('show 4 new mails').click();

  //verify header giỏ hàng 
  await expect(page.getByRole('main')).toContainText('Giỏ hàng của bạn');
  await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn' })).toBeVisible();
  //verify tab book for rent
  await expect(page.getByRole('tab', { name: 'Sách thuê' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Sách thuê' })).toBeEnabled();
  //verify tab book for purchase
  await expect(page.getByRole('tab', { name: 'Sách mua' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Sách mua' })).toBeEnabled();

  // verrify button turn back homepage
  await expect(page.getByRole('button', { name: 'Quay lại trang chủ' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Quay lại trang chủ' })).toBeEnabled();

  // verify your card is empty
  await expect(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible(); 

});