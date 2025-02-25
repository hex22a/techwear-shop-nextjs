import { STRIPE_CONFIG } from '@/app/lib/config';

jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('stripe', () => {
  test('constructor', () => {
    // Arrange
    const expectedStripeSecretKey = 'sk_test_1234567890';
    const expectedStripeConfig = STRIPE_CONFIG;
    process.env.STRIPE_SECRET_KEY = expectedStripeSecretKey;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const MockStripe = require('stripe').default;

    // Act
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const actualStripe: typeof module = require('./stripe').stripe;

    // Assert
    expect(actualStripe).toBeDefined();
    expect(MockStripe).toHaveBeenCalledWith(expectedStripeSecretKey, expectedStripeConfig);
  });
});
