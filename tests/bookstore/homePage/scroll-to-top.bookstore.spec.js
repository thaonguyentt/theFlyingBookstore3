// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test.skip('verify icon scroll to top', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  await page.waitForTimeout(10000);

  await expect(page.getByTitle('Scroll to Top').getByRole('img')).not.toBeVisible();

  const element1 = await page.getByText('Giao hàng nhanh').scrollIntoViewIfNeeded();

  await page.waitForTimeout(10000);

  await expect(page.getByTitle('Scroll to Top').getByRole('img')).toBeVisible();

  const element2 = await page.getByText('Sách mới ra mắt').scrollIntoViewIfNeeded();

  await expect(page.getByTitle('Scroll to Top').getByRole('img')).toBeVisible();


});