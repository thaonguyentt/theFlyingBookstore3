// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify dropdown "bộ lọc"', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

  // click "danh mục" to hide list genre
  await page.getByRole('button', { name: 'Danh mục' }).click();

  // verify list genre is hidden
  await expect(page.getByLabel('Danh mục').locator('div').first()).not.toBeVisible();

  // click "danh mục" to dropdown list genre
  await page.getByRole('button', { name: 'Danh mục' }).click();

  // verify list genre is visible
  await expect(page.getByLabel('Danh mục').locator('div').first()).toBeVisible();


});