// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test.skip('verify tab order sale order', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);
  
  await page.waitForTimeout(3000);
  // click icon manage persional information 
  await page.getByRole('button', { name: 'account of current user' }).click();
  await page.getByRole('link', { name: 'Chào' }).click();

  await page.waitForTimeout(3000);

  //click thêm bài đăng
  await page.getByText('Thêm bài đăng').click();

  await page.waitForTimeout(3000);
 
  const [newPage] = await Promise.all ([
    page.waitForEvent('popup'),

    // click nút xem quy định giám định phần trăm hư hại
    await page.getByRole('link', { name: 'tại đây' }).click(),
    

  ])

  //wait for new page to load
  await newPage.waitForLoadState();

  await newPage.waitForTimeout(5000);
  // thấy nội dung quy định 
  await expect(newPage.getByText('Hướng dẫn về tình trạng sách')).toBeVisible();






});