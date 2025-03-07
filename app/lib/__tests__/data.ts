import seed from './helpers/seed';
import { db } from '../model/db';

describe('data platform test', () => {
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await seed(db);
  });

  it('should fail', () => {
    expect(true).toBe(false);
  });
});
