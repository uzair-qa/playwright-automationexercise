import { expect, test } from '@playwright/test';

test.describe('', { tag: '@smoke'}, () => {
    test('Smoke', async({page}) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/Automation Exercise/);
        await expect(page.getByRole('link', {name: 'Signup / Login'})).toBeVisible();
    });
});``
