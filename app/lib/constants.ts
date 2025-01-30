const PROD_URL = 'techwear-shop-nextjs.vercel.app'; // Replace this with your actual production domain
const isProduction = process.env.NODE_ENV === 'production';

const VERSEL_URL = process.env.VERCEL_URL || PROD_URL;

// RP ID should be a consistent domain
export const RP_ID = isProduction ? new URL(`https://${VERSEL_URL}`).hostname : 'localhost';

// ORIGIN for WebAuthn
export const ORIGIN = isProduction
    ? `https://${VERSEL_URL}`
    : 'http://localhost:3000';
