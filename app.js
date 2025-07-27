import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { router as categoryRouter } from './app/api/categories/router.js';
import { router as imageRouter } from './app/api/images/router.js';
import { router as talentRouter } from './app/api/talents/router.js';
import { router as eventRouter } from './app/api/events/router.js';
import { router as organizerRouter } from './app/api/organizers/router.js';
import { router as userRouter } from './app/api/users/router.js';
import { router as authRouter } from './app/api/auth/router.js';
import { router as orderRouter } from './app/api/orders/route.js';
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

app.use('/categories', categoryRouter);
app.use('/images', imageRouter);
app.use('/talents', talentRouter);
app.use('/events', eventRouter);
app.use('/organizers', organizerRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);

app.use(errorHandler);
app.use(notFound);

export { app };