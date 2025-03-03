export const REDIS_LOCAL_URL = 'redis://localhost:6379';

export const RP_NAME = 'Techwear Shop';
export const RP_ID = process.env.RP_ID || 'localhost';
export const USER_VERIFICATION_MODE = 'preferred';
export const ORIGIN = process.env.ORIGIN || `http://localhost:3000`;

export const USER_ALREADY_EXISTS_ERROR_MESSAGE = 'User already exists';
export const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found.';
export const SESSION_EXPIRED_ERROR_MESSAGE = 'Session expired.';
export const REGISTRATION_FAILED_ERROR_MESSAGE = 'Registration failed.';
export const PASSKEY_NOT_FOUND_ERROR_MESSAGE = 'Passkey not found.';

export const USER_NOT_LOGGED_IN_MESSAGE = 'User not logged in.';
export const ADD_TO_CART_MISSING_FIELDS_ERROR_MESSAGE = 'Missing Fields. Failed to add to cart.';
export const ORDER_PRODUCTS_MISSING_FIELDS_ERROR_MESSAGE = 'Missing Fields. Failed to order products.';

export const WEBAUTHN_SESSION_ID_COOKIE_NAME = 'w-session-id';
export const WEBAUTHN_SESSION_PREFIX = 'techwear-shop-webauthn-session-';
export const WEBAUTHN_SESSION_TTL = 5 * 60;
