import Redis from 'ioredis';

// Avoid multiple connections in development (Hot Reload issue)
declare global {
  // Prevent TypeScript error for redeclaration
  // eslint-disable-next-line no-var
  var redis: Redis | undefined;
}

const redis = global.redis || new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

if (process.env.NODE_ENV !== 'production') {
  global.redis = redis;
}

export default redis;
