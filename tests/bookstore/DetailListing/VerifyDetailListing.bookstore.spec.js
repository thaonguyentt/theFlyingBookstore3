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
  
  //verify tab detail book
  await expect(page.getByRole('tab', { name: 'Chi tiết' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Chi tiết' })).toBeEnabled();

  //scroll to tab detail book
  page.getByRole('tab', { name: 'Chi tiết' }).scrollIntoViewIfNeeded();

  //verify information of book detail
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Thông tin chung về sách');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Ngày xuất bản');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Kích thước');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('ISBN');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('ISBN');
  await expect(page.getByText('Số trang')).toBeVisible();
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Số trang');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Thông tin về sách thuê');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Tiền cọc');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Phần trăm hư hại');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Địa chỉ cho thuê');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Phí phạt trả trễ');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Giá gốc');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Giá bán');
  await expect(page.getByLabel('Chi tiết').locator('span')).toContainText('Địa chỉ mua sách');



});