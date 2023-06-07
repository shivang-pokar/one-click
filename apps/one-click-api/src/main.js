/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import authRouter from './routes/auth.js';
import twitterRouter from './routes/twitter.js';
import linkedinRouter from './routes/linkedin.js';
import instagramrRouter from './routes/instagram.js';
import facebookRouter from './routes/facebook.js';
import post from './routes/post.js';
import schedule from './routes/schedule.js';
import payment from './routes/payment.js';
import contentWriting from './routes/content-writing.js';

import { environment } from './environments/environment.js';
import firebaseAdmin from './controllers/firebaseAdmin';

import Stripe from 'stripe';
import { requiresAuth } from './auth-middleware.js';
const stripe = new Stripe(process.env.STRIPE_SCREAT_KEY);


const app = express.default();


//app.use(bodyParser.json({ limit: '30mb', extended: true, }));
app.use(bodyParser.json({
  limit: '30mb', extended: true,
  verify: (req, res, buf) => {
    var url = req.originalUrl;
    if (url.startsWith('/payment/stripe-webhook')) {
      req.rawBody = buf.toString()
    }
  }
}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors.default());

app.use((req, res, next) => {
  req.firebaseAdmin = firebaseAdmin;
  req.stripe = stripe;
  next();
});

app.use('/auth', requiresAuth, authRouter);
app.use('/twitter', twitterRouter);
app.use('/linkedin', linkedinRouter);
app.use('/instagramr', instagramrRouter);
app.use('/facebook', facebookRouter);
app.use('/post', post);
app.use('/schedule', schedule);
app.use('/payment', payment);
app.use('/content-writing', contentWriting);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to one-click-api!' });
});

const port = environment.port;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
