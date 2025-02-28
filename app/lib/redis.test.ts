import { REDIS_LOCAL_URL } from '@/app/lib/constants';

describe('redis', () => {
  let MockRedis: jest.Mock;
  const expectedRedis = {};

  beforeEach(() => {
    jest.resetModules();
    delete global.redis;
    delete process.env.REDIS_URL;

    jest.doMock('ioredis', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue(expectedRedis),
    }));

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    MockRedis = require('ioredis').default;

    MockRedis.mockClear();
  });

  describe('production environment', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      process.env.NODE_ENV = 'production';
    });

    afterAll(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      process.env.NODE_ENV = originalNodeEnv;
    });

    test('process.env.REDIS_URL is not present', () => {
      // Arrange
      const expectedRedisUrl = REDIS_LOCAL_URL;

      // Act
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const actualRedis: typeof module = require('./redis').default;

      // Assert
      expect(actualRedis).toBeDefined();
      expect(actualRedis).toEqual(expectedRedis);
      expect(global.redis).toBeUndefined();
      expect(MockRedis).toHaveBeenCalledWith(expectedRedisUrl);
    });

    test('process.env.REDIS_URL is present', () => {
      // Arrange
      const expectedRedisUrl = 'redis://default:1234567890@redis-cloud.com:1122';
      process.env.REDIS_URL = expectedRedisUrl;

      // Act
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const actualRedis: typeof module = require('./redis').default;

      // Assert
      expect(actualRedis).toBeDefined();
      expect(actualRedis).toEqual(expectedRedis);
      expect(global.redis).toBeUndefined();
      expect(MockRedis).toHaveBeenCalledWith(expectedRedisUrl);
    });
  });

  describe('singleton in non-production environments to avoid multiple connections in development (Hot Reload issue)', () => {
    describe('first import', () => {
      test('process.env.REDIS_URL is not present', () => {
        // Arrange
        const expectedRedisUrl = REDIS_LOCAL_URL;

        // Act
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const actualRedis: typeof module = require('./redis').default;

        // Assert
        expect(actualRedis).toBeDefined();
        expect(actualRedis).toEqual(expectedRedis);
        expect(global.redis).toEqual(expectedRedis);
        expect(MockRedis).toHaveBeenCalledWith(expectedRedisUrl);
      });

      test('process.env.REDIS_URL is present', () => {
        // Arrange
        const expectedRedisUrl = 'redis://default:1234567890@redis-cloud.com:1122';
        process.env.REDIS_URL = expectedRedisUrl;

        // Act
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const actualRedis: typeof module = require('./redis').default;

        // Assert
        expect(actualRedis).toBeDefined();
        expect(actualRedis).toEqual(expectedRedis);
        expect(global.redis).toEqual(expectedRedis);
        expect(MockRedis).toHaveBeenCalledWith(expectedRedisUrl);
      });
    });

    test('consecutive imports', () => {
      // Arrange
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const expectedImportedRedis: typeof module = require('./redis').default;

      // Act
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const actualRedis: typeof module = require('./redis').default;

      // Assert
      expect(actualRedis).toBeDefined();
      expect(actualRedis).toEqual(expectedImportedRedis);
      expect(global.redis).toEqual(expectedImportedRedis);
    });
  });
});
