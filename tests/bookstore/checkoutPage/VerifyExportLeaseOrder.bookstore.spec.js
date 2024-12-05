// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify check out page for leaseOrder', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

   // click icon search  
  await page.locator('#search').click();

  await page.waitForTimeout(3000);

 //set text on search input and click search icon
//  await page.getByPlaceholder('Tìm sách…').fill('Ice');
 await page.locator('#search').click();

  //Click the first listing
  // await page.getByRole('link', { name: 'Cover of Ice Ice Thuê: 1.600' }).click();
  await page.locator('(//*[@class="grid grid-cols-4 gap-4"]//img)[3]').click();


  //verify tab thuê theo ngày
  await expect(page.getByRole('main')).toContainText('Thuê theo ngày');

  //chọn ngày 31
  await page.getByLabel('Chọn ngày', { exact: true }).click();
  await page.getByRole('gridcell', { name: '31' }).click();

  //nút đặt thuê ngay có thể click
  await page.getByRole('button', { name: 'Đặt thuê ngay' }).click();

  //click butotn đặt thuê hàng in card
  await page.getByRole('button', { name: 'Đặt thuê hàng' }).click();

  //tạo đơn hàng
  await page.getByRole('button', { name: 'Tạo đơn hàng' }).click();


  // verify tạo đơn hàng thành công
  await expect(page.getByRole('heading', { name: 'Đơn hàng được tạo thành công!' })).toBeVisible();
  //verify thông tin đơn hàng: bài đăng, số lượng, giá thuê, cọc, thông tin đặt hàng
  // mã đơn hàng, ngày đặt thuê, người cho thuê, thời gian thuê, địa chỉ người cho thuê
  //số điện thoại người cho thuê, trạng thái, phương thức thanh toán, số ngày thuê,
  //tiền thuê, tiền cọc
  await expect(page.getByText('Bài đăng')).toBeVisible();
  await expect(page.getByText('Số lượng:')).toBeVisible();
  await expect(page.getByText('Giá thuê:')).toBeVisible();
  await expect(page.getByText('Cọc:')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Thông tin đặt hàng' })).toBeVisible();
  await expect(page.getByText('Mã đơn hàng', { exact: true })).toBeVisible();
  await expect(page.getByText('Ngày đặt thuê')).toBeVisible();
  await expect(page.getByText('Người cho thuê', { exact: true })).toBeVisible();
  await expect(page.getByText('Thời gian thuê')).toBeVisible();
  await expect(page.getByText('Địa chỉ người cho thuê')).toBeVisible();
  await expect(page.getByText('Số điện thoại người cho thuê').first()).toBeVisible();
  await expect(page.getByText('Số điện thoại người cho thuê').nth(1)).toBeVisible();
  await expect(page.getByText('Trạng thái')).toBeVisible();
  await expect(page.getByText('Phương thức thanh toán')).toBeVisible();
  await expect(page.getByText('Số ngày thuê')).toBeVisible();
  await expect(page.getByText('Tiền thuê')).toBeVisible();
  await expect(page.getByText('Tiền cọc')).toBeVisible();
  await expect(page.getByText('Tổng cộng')).toBeVisible();
  //verify button quản lý đơn hàng 
  await expect(page.getByRole('button', { name: 'Quản lý đơn hàng' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Quản lý đơn hàng' })).toBeEnabled();
  // verrify button tiếp tục mua sắm
  await expect(page.getByRole('button', { name: 'Tiếp tục mua sắm' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tiếp tục mua sắm' })).toBeEnabled();

});