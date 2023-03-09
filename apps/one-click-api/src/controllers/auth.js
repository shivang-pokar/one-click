const axios = require('axios');
var { environment } = require('../environments/environment');
import { TwitterApi } from 'twitter-api-v2';
const client = new TwitterApi({
  appKey: environment.twitter_app_key,
  appSecret: environment.twitter_app_secret,
});

/* Twitter */

export const getTwitterAuthUrl = async (req, res) => {
  try {
    const authLink = await client.generateAuthLink(
      'http://localhost:4200/auth-channel?state=twitter',
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
      `${environment.twitter_auth_url_v_1}?oauth_consumer_key=8COqs2uPcZZL20BNhFEObU711&oauth_token=${req.body.oauth_token}&oauth_verifier=${req.body.oauth_verifier}`
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
      `${environment.twitter_auth_url}?refresh_token=${req.body.refresh_token}&grant_type=refresh_token&client_id=${environment.client_id_twitter}`,
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
      `${environment.FB_AUTH_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${environment.fb_app_id}&client_secret=${environment.fb_client_secret}&fb_exchange_token=${req.body.access_token}`
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
      `${environment.FB_AUTH_URL}/${req.body.id}?fields=instagram_business_account&access_token=${req.body.access_token}`
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
    ConsumerKey: `${environment.twitterConsumerKey}`,
    ConsumerSecret: `${environment.twitterConsumerSecret}`,
    'Content-type': `application/json`,
  };
  try {
    const twitter = await axios.get(`https://api.twitter.com/2/users/me`, {
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
      `${environment.LINKEDIN}/oauth/v2/accessToken?grant_type=authorization_code&code=${req.body.code}&redirect_uri=${environment.redirect_uri}&client_id=${environment.linkedin_client_id}&client_secret=${environment.linkedin_client_secret}`,
      { headers: header }
    );
    res.send(linkedin.data);
  } catch (e) {
    res.status(e.response.status);
    res.send(e.response.data);
  }
};
