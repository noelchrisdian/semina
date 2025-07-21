import dotenv from 'dotenv';

dotenv.config();
const urlDB = process.env.URL_MONGODB_DEV

export { urlDB };