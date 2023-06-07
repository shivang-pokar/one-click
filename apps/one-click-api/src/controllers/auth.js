const axios = require('axios');
import { TwitterApi } from 'twitter-api-v2';
const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
});

/* Twitter */

export const getTwitterAuthUrl = async (req, res) => {
  try {
    const authLink = await client.generateAuthLink(
      `${process.env.WEB_DOMAIN}auth-channel?state=twitter`,
      { linkMode: 'authorize' }
    );
    res.send({ autlUrl: authLink.url });
  } catch (e) {
    res.status(e.response.status);
    console.log(e);
    res.send(e.response.data);
  }
};

export const twitterAuth = async (req, res) => {
  try {
    const twitter = await axios.post(
      `${process.env.TWITTER_AUTH_URL_V_1}?oauth_consumer_key=${process.env.TWITTER_APP_KEY}&oauth_token=${req.body.oauth_token}&oauth_verifier=${req.body.oauth_verifier}`
    );
    res.send(Object.fromEntries(new URLSearchParams(twitter.data)));
  } catch (e) {
    console.log(e);
    res.status(e.response.status);
    res.send(e.response.data);
  }

  /* // By default, oauth/authenticate are used for auth links, you can change with linkMode
        // property in second parameter to 'authorize' to use oauth/authorize
        const authLink = await client.generateAuthLink(CALLBACK_URL, { linkMode: 'authorize' }); */

  // Use URL generated

  /* const twitter = await axios.post(`${environment.twitter_auth_url}?code=${req.body.code}&grant_type=authorization_code&client_id=${environment.client_id_twitter}&redirect_uri=${environment.redirect_uri}&code_verifier=challenge`, { headers: header })
    res.send(twitter.data); */
};

export const genrateTokenTwitter = async (req, res, next) => {
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  try {
    const twitter = await axios.post(
      `${process.env.TWITTER_AUTH_URL}?refresh_token=${req.body.refresh_token}&grant_type=refresh_token&client_id=${process.env.CLIENT_ID_TWITTER}`,
      { headers: header }
    );
    res.send(twitter.data);
  } catch (e) {
    res.status(e.response.status);
    res.send(e.response.data);
  }
};

/* Facebook */
export const faceBookLiveLongToken = async (req, res, next) => {
  try {
    const fbTokenData = await axios.get(
      `${process.env.FB_AUTH_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_CLIENT_SECRET}&fb_exchange_token=${req.body.access_token}`
    );
    res.send(fbTokenData.data);
  } catch (e) {
    res.status(e.response.status);
    res.send(e.response.data);
  }
};

export const getInstagramPageId = async (req, res, next) => {
  try {
    const fbTokenData = await axios.get(
      `${process.env.FB_AUTH_URL}/${req.body.id}?fields=instagram_business_account&access_token=${req.body.access_token}`
    );
    res.send(fbTokenData.data);
  } catch (e) {
    res.status(e.response.status);
    res.send(e.response.data);
  }
};

export const getUserId = async (req, res, next) => {
  let header = {
    /* 'Authorization': `Bearer ${req.body.access_token}`, */

    Authorization: `Bearer ${req.body.access_token}`,
    ConsumerKey: `${process.env.TWITTERCONSUMERKEY}`,
    ConsumerSecret: `${process.env.TWITTERCONSUMERSECRET}`,
    'Content-type': `application/json`,
  };
  try {
    const twitter = await axios.get(process.env.TWITTER_URL_USER, {
      headers: header,
    });
    res.send(twitter.data);
  } catch (e) {
    res.status(e.response.status);
    res.send(e.response.data);
  }
};

export const genrateTokenLinkedin = async (req, res, next) => {
  try {
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const linkedin = await axios.post(
      `${process.env.LINKEDIN}/oauth/v2/accessToken?grant_type=authorization_code&code=${req.body.code}&redirect_uri=${process.env.REDIRECT_URI}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`,
      { headers: header }
    );
    res.send(linkedin.data);
  } catch (e) {
    res.status(e.response.status);
    res.send(e.response.data);
  }
};
