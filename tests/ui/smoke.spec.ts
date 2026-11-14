import { expect, test } from '@playwright/test';

test.describe('Home Page', { tag: '@smoke'}, () => {
    test('loads with main navigation visible', async({page}) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/Automation Exercise/);
        await expect(page.getByRole('link', {name: 'Signup / Login'})).toBeVisible();
    });
});
