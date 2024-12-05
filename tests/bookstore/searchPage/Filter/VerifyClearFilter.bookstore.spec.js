// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify xoá bộ lọc', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

   // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

  // click checkbox "học thuật"
  await page.getByLabel('Học thuật').click();

  //verify list of listing is adaptable with action
  await expect(page.getByRole('main')).toContainText('Sách theo thể loại Học thuật');
  await expect(page.getByText('Hiển thị')).toBeVisible();


  // verify checkbox "học thuật" to be checked
  await expect(page.getByLabel('Học thuật')).toBeChecked();

  //click button "Xoá bộ lọc"
  await page.getByRole('button', { name: 'Xóa bộ lọc' }).click();

  // verify checkbox "học thuật" not to be checked
  await expect(page.getByLabel('Học thuật')).not.toBeChecked();

  //verify absent of text "Sách theo thể loại học thuật"
  await expect(page.getByRole('main')).not.toContainText('Sách theo thể loại Học thuật');

  //verify present of text Tất cả sách
  await expect(page.getByRole('main')).toContainText('Tất cả sách');


});