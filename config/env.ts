import path from 'node:path';
import dotenv from 'dotenv';

const ENVIRONMENTS = ['dev', 'staging'] as const;
export type TestEnv = (typeof ENVIRONMENTS)[number];

function resolveTestEnv(): TestEnv {
  const value = process.env.TEST_ENV ?? 'dev';
  if (!(ENVIRONMENTS as readonly string[]).includes(value)) {
    throw new Error(
      `Invalid TEST_ENV "${value}". Expected one of: ${ENVIRONMENTS.join(', ')}`,
    );
  }
  return value as TestEnv;
}

const testEnv = resolveTestEnv();

// Load .env.<testEnv>. Existing env vars (e.g. from CI) are NOT overridden.
dotenv.config({
  path: path.resolve(__dirname, '..', `.env.${testEnv}`),
  quiet: true,
});

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required env var "${name}" for TEST_ENV="${testEnv}". ` +
        `Copy .env.example to .env.${testEnv} and set it.`,
    );
  }
  return value;
}

export const env = Object.freeze({
  testEnv,
  baseUrl: required('BASE_URL'),
  apiBaseUrl: required('API_BASE_URL'),
});
