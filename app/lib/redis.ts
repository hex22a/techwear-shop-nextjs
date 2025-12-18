import Redis from 'ioredis';
import { REDIS_LOCAL_URL } from '@/app/lib/constants';

declare global {
  var redis: Redis | undefined;
}

const redis = global.redis || new Redis(process.env.REDIS_URL || REDIS_LOCAL_URL);

if (process.env.NODE_ENV !== 'production') {
  global.redis = redis;
}

export default redis;
