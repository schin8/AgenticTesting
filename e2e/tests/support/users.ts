import { randomBytes } from 'node:crypto';

export type TestUser = { username: string; email: string; password: string };

/** A fresh, unique local test user so tests never collide or depend on order. */
export function newUser(prefix = 'pw'): TestUser {
  const id = `${Date.now().toString(36)}${randomBytes(3).toString('hex')}`;
  return {
    username: `${prefix}_${id}`,
    email: `${prefix}_${id}@example.test`,
    password: `local-${randomBytes(8).toString('hex')}`,
  };
}
