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

  // click button user
  await page.getByRole('button', { name: 'account of current user' }).click();
  //click item đăng xuất
  await page.getByRole('menuitem', { name: 'Đăng xuất' }).click();
  //verify đăng xuất thành công
  await expect(page.getByText('Đăng xuất thành công')).toBeVisible();






});