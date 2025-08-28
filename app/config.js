import dotenv from 'dotenv';

dotenv.config();
const urlDB = process.env.URL_MONGODB_DEV;
const jwtExpiration = '10m';
const jwtRefreshExpiration = '24h';
const jwtSecret = 'jwtSecret';
const gmail = 'pxperfect00@gmail.com'
const password = process.env.PASSWORD_GMAIL;

export {
    gmail,
    jwtExpiration,
    jwtRefreshExpiration,
    jwtSecret,
    password,
    urlDB
}