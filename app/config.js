import dotenv from 'dotenv';

dotenv.config();
const urlDB = process.env.URL_MONGODB_DEV;
const jwtExpiration = '24h';
const jwtSecret = 'jwtSecret'

export { urlDB, jwtExpiration, jwtSecret };