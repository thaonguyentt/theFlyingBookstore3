// @ts-check
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
import { constants } from 'fs/promises';
dotenv.config();

const url = process.env.URL_Home;

test('verify banner', async ({ page }) => {
  if (!url) {
    throw new Error('URL environment variable is not defined');
  }
  await page.goto(url);

  await page.waitForTimeout(5000);
  
  //scroll to footer
  await page.locator('div').filter({ hasText: /^The Flyingbookstore$/ }).nth(1).scrollIntoViewIfNeeded();

  //verify logo the plying bookstore
  await expect(page.locator('div').filter({ hasText: /^The Flyingbookstore$/ }).nth(1)).toBeVisible();

  //verify infor facebook, youtube, insta
  await page.locator('.info > div:nth-child(3)').click();
  await expect(page.locator('.flex > svg > path').first()).toBeVisible();
  await expect(page.locator('svg:nth-child(2) > path')).toBeVisible();
  await expect(page.locator('svg:nth-child(3) > path')).toBeVisible();

  //verify text thông tin liên hệ
  await expect(page.locator('body')).toContainText('Liên hệ');
  await expect(page.locator('body')).toContainText('171/11 Trương Phước Phan, Bình Hưng Hòa, Bình Tân, TP.HCM');
  await expect(page.locator('body')).toContainText('+123 345 123');
  await expect(page.locator('body')).toContainText('support@flying.bookstore');

  //verify iframe map
  await expect(page.frameLocator('iframe[title="map"]').locator('.gm-style > div > div:nth-child(2)').first()).toBeVisible();

});