import { defineConfig, devices } from '@playwright/test';

const WEB_URL = process.env.WEB_URL ?? 'http://localhost:5173';
const API_URL = process.env.API_URL ?? 'http://localhost:3000';

// Safety rail: WEB_URL and API_URL must be local. This only checks these two values;
// it does not stop a test or agent from navigating to an absolute URL elsewhere.
// Node reports IPv6 hosts in brackets, so localhost over IPv6 is '[::1]'.
for (const url of [WEB_URL, API_URL]) {
  const host = new URL(url).hostname;
  if (!['localhost', '127.0.0.1', '[::1]'].includes(host)) {
    throw new Error(`Refusing to run against non-local host: ${host}`);
  }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: WEB_URL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: `${API_URL}/api/` },
    },
  ],
  // Starts both apps unless they are already running (for example via `pnpm dev`).
  webServer: [
    {
      command: 'pnpm --filter @conduit/api dev',
      cwd: '..',
      url: `${API_URL}/api/tags`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'pnpm --filter @conduit/web dev',
      cwd: '..',
      url: WEB_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
