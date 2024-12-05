// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify presence of filter', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  await page.waitForTimeout(5000);

  // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

  // verify name of tab xoá bộ lọc "Lọc theo"
  await expect(page.getByRole('main')).toContainText('Lọc theo');

  //button "Xoá bộ lọc" can click
  // await page.getByRole('button', { name: 'Xóa bộ lọc' }).click();
  // button is active
  await expect(page.getByRole('button', { name: 'Xóa bộ lọc' })).toBeEnabled();

  //verify "Danh mục" list of genre 
  await expect(page.locator('#panel1-header')).toContainText('Danh mục');


});