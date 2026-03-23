import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('додає нову потребу', async ({ page }) => {
  await page.fill('#needInput', 'Test');
  await page.click('#addBtn');

  await expect(page.locator('#needList li')).toHaveCount(1);
});

test('очищає input', async ({ page }) => {
  await page.fill('#needInput', 'Hello');
  await page.click('#addBtn');

  await expect(page.locator('#needInput')).toHaveValue('');
});

test('оновлює лічильник', async ({ page }) => {
  await page.fill('#needInput', 'A');
  await page.click('#addBtn');

  await page.fill('#needInput', 'B');
  await page.click('#addBtn');

  await expect(page.locator('#count')).toHaveText('2');
});