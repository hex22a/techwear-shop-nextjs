const PROD_URL = 'techwear-shop-nextjs.vercel.app'; // Replace this with your actual production domain
const isProduction = process.env.NODE_ENV === 'production';

const getVercelUrl = () => process.env.VERCEL_URL || PROD_URL;

// RP ID should be a consistent domain
export const RP_ID = isProduction ? new URL(`https://${getVercelUrl()}`).hostname : 'localhost';

// ORIGIN for WebAuthn
export const ORIGIN = isProduction
    ? `https://${getVercelUrl()}`
    : 'http://localhost:3000';
