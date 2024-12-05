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

  // //chọn sách chỉ mua
  // await page.getByRole('button', { name: 'Sách mua và thuê' }).click();
  // await page.getByRole('button', { name: 'Chỉ sách mua' }).click();

  await page.waitForTimeout(3000);
  //Click listing "cover of ice"
  await page.getByRole('link', { name: 'Cover of Ice Ice Thuê: 1.600' }).click();

  await page.waitForTimeout(4000);
  //verify tab thuê theo ngày
  await expect(page.getByRole('main')).toContainText('Thuê theo ngày');

  //verify tab thu gọn
  await expect(page.getByRole('button', { name: 'Thuê theo ngày 1.600đ/ngày' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Thuê theo ngày 1.600đ/ngày' })).toBeEnabled();

  //verify detail lease order 
  //verrify chọn ngày nhận ngày trả và nút calendar
  await expect(page.getByLabel('Ngày nhận')).toBeVisible();
  await expect(page.getByLabel('Ngày trả')).toBeVisible();
  await expect(page.getByLabel('Chọn ngày, ngày đã chọn là')).toBeVisible();
  await expect(page.getByLabel('Chọn ngày, ngày đã chọn là')).toBeEnabled();
  await expect(page.getByLabel('Chọn ngày', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Chọn ngày', { exact: true })).toBeEnabled();

  // verrify thoong tin thuê
  await expect(page.getByRole('main')).toContainText('Giá thuê');
  await expect(page.getByRole('main')).toContainText('Số ngày thuê');
  await expect(page.getByRole('main')).toContainText('Tổng tiền thuê');
  await expect(page.getByRole('main')).toContainText('Tiền cọc');
  await expect(page.getByRole('main')).toContainText('Tổng tiền');

  // verrify nút đặt thuê ngay
  await expect(page.getByRole('button', { name: 'Đặt thuê ngay' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Đặt thuê ngay' })).toBeDisabled();

  //chọn ngày 31
  await page.getByLabel('Chọn ngày', { exact: true }).click();
  await page.getByRole('gridcell', { name: '31' }).click();

  //nút đặt thuê ngay có thể click
  await expect(page.getByRole('button', { name: 'Đặt thuê ngay' })).toBeEnabled();
  

});