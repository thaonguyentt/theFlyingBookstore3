// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify carousel', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  await page.waitForTimeout(10000);

  const element = await page.getByText('Sách mới ra mắt').scrollIntoViewIfNeeded();

  //verify "sách mới ra mắt text"
  await expect(page.getByText('Sách mới ra mắt')).toBeVisible();

  // verify carousel list
  await expect(page.locator('xpath=(//*[@class="slick-list"])[2]')).toBeVisible();








});