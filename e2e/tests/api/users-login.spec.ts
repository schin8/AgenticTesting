import { test, expect } from '@playwright/test';
import { newUser } from '../support/users';

// Phase 0 baseline. AI-written (Claude Code), kept as the baseline by decision on
// 2026-11-15; not a human baseline (see docs/PLAN.md, H1). Protected: agents must not edit this file.
// Contract: spec/openapi.yml, operationId Login.
// Note: baseURL ends in /api/, so paths here have no leading slash.
test.describe('POST /api/users/login', () => {
  const user = newUser('api');

  test.beforeAll(async ({ request }) => {
    const res = await request.post('users', { data: { user } });
    expect(res.status(), await res.text()).toBe(201);
  });

  test('returns 200 and a user with a JWT for valid credentials', async ({ request }) => {
    const res = await request.post('users/login', {
      data: { user: { email: user.email, password: user.password } },
    });

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/json');

    const body = await res.json();
    expect(body.user).toMatchObject({
      email: user.email,
      username: user.username,
      bio: null,
      image: null,
    });
    // JWT shape: three base64url segments. Password must never come back.
    expect(body.user.token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
    expect(body.user).not.toHaveProperty('password');

    // The token must work on an authenticated endpoint.
    const me = await request.get('user', {
      headers: { Authorization: `Token ${body.user.token}` },
    });
    expect(me.status()).toBe(200);
    expect((await me.json()).user.username).toBe(user.username);
  });

  test('returns 401 for a wrong password', async ({ request }) => {
    const res = await request.post('users/login', {
      data: { user: { email: user.email, password: 'wrong-password' } },
    });
    expect(res.status()).toBe(401);
    expect((await res.json()).errors).toBeTruthy();
  });

  test('returns 422 when the email is missing', async ({ request }) => {
    const res = await request.post('users/login', {
      data: { user: { password: user.password } },
    });
    expect(res.status()).toBe(422);
    expect((await res.json()).errors).toBeTruthy();
  });
});
