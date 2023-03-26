/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import authRouter from './routes/auth.js';
import twitterRouter from './routes/twitter.js';
import linkedinRouter from './routes/linkedin.js';
import instagramrRouter from './routes/instagram.js';
import facebookRouter from './routes/facebook.js';
import post from './routes/post.js';
import { environment } from './environments/environment.js';
import firebaseAdmin from './controllers/firebaseAdmin';


const app = express.default();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors.default());

app.use((req, res, next) => {
  req.firebaseAdmin = firebaseAdmin;
  next();
});

app.use('/auth', authRouter);
app.use('/twitter', twitterRouter);
app.use('/linkedin', linkedinRouter);
app.use('/instagramr', instagramrRouter);
app.use('/facebook', facebookRouter);
app.use('/post', post);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to one-click-api!' });
});

const port = environment.port;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
