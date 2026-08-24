import { expect, test } from '@playwright/test';

test.describe('GoldPulse paper-trading dashboard', () => {
  test('renders a transparent XAU/USD workspace', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/GoldPulse AI/);
    await expect(page.getByRole('heading', { name: /Trade with context/i })).toBeVisible();
    await expect(page.getByText('Paper balance')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'XAU/USD' })).toBeVisible();
    await expect(page.getByText('Current market call')).toBeVisible();
    await expect(page.getByText('WAIT', { exact: true })).toBeVisible();
  });

  test('adjusts the risk plan for each supported trade duration', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: '5 min' }).click();
    await expect(page.locator('[data-duration-summary]')).toHaveText('5-minute quick setup');
    await expect(page.locator('[data-take-profit]')).toHaveText('$2,179.06');
    await expect(page.locator('[data-risk-ratio]')).toHaveText('1 : 2.1');

    await page.getByRole('button', { name: '15 min' }).click();
    await expect(page.locator('[data-duration-summary]')).toHaveText('15-minute extended setup');
    await expect(page.locator('[data-stop-loss]')).toHaveText('$2,171.64');
  });

  test('previews a paper trade without claiming an order was sent', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Preview buy' }).click();
    await expect(page.getByRole('status')).toContainText('Buy paper ticket prepared');
    await expect(page.getByRole('status')).toContainText('No order was sent');
  });
});
