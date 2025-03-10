import { Config } from 'jest';
import config from './jest.config.base';

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const platformTestConfig: Config = {
  ...config,
  testMatch: ["**/__tests__/*.[jt]s?(x)"],
};

export default createJestConfig(platformTestConfig);
