import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const authFile = './playwright/.auth/user.json';
// const url = process.env.URL;

const url = process.env.URL;


setup('authenticate', async ({ page }) => {
    
    if (!url) {
        throw new Error('URL environment variable is not defined');
    }

    await page.goto(url);
    await page.getByRole('button', { name: 'Đăng nhập' }).first().click();
    await page.getByLabel('Tên đăng nhập', { exact: true }).fill(process.env.USERNAME1);
    await page.getByLabel('Mật khẩu', { exact: true }).fill(process.env.PASSWORD1);
    await page.getByRole('button', { name: 'Đăng nhập' }).nth(1).click();
    // await page.waitForTimeout(5000);
    await page.waitForURL(url);
    await expect(page.locator('xpath=(//button[@aria-label="show 4 new mails"])[2]')).toBeVisible();
    

    await page.context().storageState({ path: authFile });
});