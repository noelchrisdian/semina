import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app
  .use(logger('dev'))
  .use(json())
  .use(urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(join(__dirname, 'public')));

export { app };