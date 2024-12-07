// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify danh sách listing', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

   // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

  //verify text present "tất cả sách"
  await expect(page.getByRole('main')).toContainText('Tất cả sách');

  //verify button choose type of book is for purchase or rent
  await expect(page.getByRole('button', { name: 'Sách mua và thuê' })).toBeEnabled;

  //choose just allowed for rent
  await page.getByRole('button', { name: 'Sách mua và thuê' }).click();
  await page.getByRole('menuitem', { name: 'Chỉ sách thuê' }).click();
  await expect(page.getByRole('button', { name: 'Sách mua và thuê' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Chỉ sách thuê' })).toBeVisible();

  //check just allowed for purchase
  await page.getByRole('button', { name: 'Chỉ sách thuê' }).click();
  await page.getByRole('menuitem', { name: 'Chỉ sách mua' }).click();
  await expect(page.getByRole('button', { name: 'Chỉ sách thuê' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Chỉ sách mua' })).toBeVisible();


});