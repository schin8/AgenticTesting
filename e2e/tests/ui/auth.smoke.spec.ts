import { test, expect } from '@playwright/test';
import { newUser } from '../support/users';

// Phase 0 baseline. AI-written (Claude Code), kept as the baseline by decision on
// 2026-11-15; not a human baseline (see docs/PLAN.md, H1). Protected: agents must not edit this file.
test.describe('auth smoke', () => {
  test('a new user can sign up, log out and log back in', async ({ page }) => {
    const user = newUser('ui');
    const nav = page.getByRole('navigation');

    await test.step('sign up', async () => {
      await page.goto('/register');
      await page.getByPlaceholder('Your Name').fill(user.username);
      await page.getByPlaceholder('Email').fill(user.email);
      await page.getByPlaceholder('Password').fill(user.password);
      await page.getByRole('button', { name: 'Sign up' }).click();

      await expect(page).toHaveURL('/');
      await expect(nav.getByRole('link', { name: user.username })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'New Post' })).toBeVisible();
    });

    await test.step('log out', async () => {
      await page.goto('/settings');
      await page.getByRole('button', { name: /logout/i }).click();
      await expect(nav.getByRole('link', { name: 'Sign in' })).toBeVisible();
      await expect(nav.getByRole('link', { name: user.username })).toHaveCount(0);
    });

    await test.step('log in', async () => {
      await page.goto('/login');
      await page.getByPlaceholder('Email').fill(user.email);
      await page.getByPlaceholder('Password').fill(user.password);
      await page.getByRole('button', { name: 'Sign in' }).click();

      await expect(page).toHaveURL('/');
      await expect(nav.getByRole('link', { name: user.username })).toBeVisible();
    });
  });

  test('login with a wrong password shows an error and stays signed out', async ({ page }) => {
    // Known bug F-001 (docs/findings.md): apps/web/src/lib/api.js only reads the body on
    // 2xx or 422, but the API returns 401 for bad credentials, so the user gets the
    // generic error page. test.fail() keeps CI green and flips red once the bug is fixed.
    test.fail(true, 'F-001: wrong password shows "Something went wrong 401" page');
    await page.goto('/login');
    await page.getByPlaceholder('Email').fill('nobody@example.test');
    await page.getByPlaceholder('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.locator('.error-messages')).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Sign in' })).toBeVisible();
  });
});
