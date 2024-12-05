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

  // verify checkbox "học thuật" not to be checked
  await expect(page.getByLabel('Học thuật')).not.toBeChecked();

  // click checkbox "học thuật"
  await page.getByLabel('Học thuật').click();

  //verify checkbox "học thuật" to be checked
  await expect(page.getByLabel('Học thuật')).toBeChecked();

  //verify list of listing is adaptable with action
  await expect(page.getByRole('main')).toContainText('Sách theo thể loại Học thuật');
  await expect(page.getByText('Hiển thị')).toBeVisible();



  // // click "danh mục" to dropdown list genre
  // await page.getByRole('button', { name: 'Danh mục' }).click();

  // // verify list genre is visible
  // await expect(page.getByLabel('Danh mục').locator('div').first()).toBeVisible();


});