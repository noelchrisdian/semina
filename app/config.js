import dotenv from 'dotenv';

dotenv.config();
const urlDB = process.env.URL_MONGODB_DEV;
const jwtExpiration = '24h';
const jwtSecret = 'jwtSecret';
const gmail = 'pxperfect00@gmail.com'
const password = process.env.PASSWORD_GMAIL;

export { urlDB, jwtExpiration, jwtSecret, gmail, password };