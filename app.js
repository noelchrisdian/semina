import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { router as categorieRouter } from './app/api/categories/router.js';
import { router as imageRouter } from './app/api/images/router.js';
import { router as talentRouter } from './app/api/talents/router.js';
import { router as eventRouter } from './app/api/events/router.js';
import { errorHandler } from './app/middlewares/handle error.js';
import { notFound } from './app/middlewares/not found.js';
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
  .use(express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Semina API'
  })
})

app.use('/categories', categorieRouter);
app.use('/images', imageRouter);
app.use('/talents', talentRouter);
app.use('/events', eventRouter)

app.use(errorHandler);
app.use(notFound);

export { app };