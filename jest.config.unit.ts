import { Config } from 'jest';
import config from './jest.config.base';

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const unitTestConfig: Config = {
  ...config,
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default createJestConfig(unitTestConfig);
