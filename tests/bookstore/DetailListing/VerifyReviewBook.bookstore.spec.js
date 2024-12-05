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

   // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

 //set text on search input and click search icon
 await page.getByPlaceholder('Tìm sách…').fill('Ice');
 await page.locator('#search').click();

  //Click listing "cover of ice"
  await page.getByRole('link', { name: 'Cover of Ice Ice Thuê: 1.600' }).click();

  //image of book cover is present 
  await expect(page.getByRole('img', { name: 'book' })).toBeVisible();

  //click button book preview
  await page.getByRole('button', { name: 'Xem trước sách' }).click();

  //verify pop-up xem trước cuốn sách
  await expect(page.locator('#scroll-dialog-title')).toContainText('Xem trước cuốn sách');
  await expect(page.locator('.object-contain').first()).toBeVisible();

  //verify button return back
  await expect(page.getByLabel('back')).toBeVisible();
  await expect(page.getByLabel('back')).toBeEnabled();

  //verify zoom in, zoom out button
  await expect(page.getByLabel('zoom-out')).toBeVisible();
  await expect(page.getByLabel('zoom-out')).toBeEnabled();
  await expect(page.getByLabel('zoom-in')).toBeVisible();
  await expect(page.getByLabel('zoom-in')).toBeEnabled();

});