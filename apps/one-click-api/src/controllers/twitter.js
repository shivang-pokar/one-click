const axios = require('axios');
var { environment } = require('../environments/environment');
import { TwitterApi } from 'twitter-api-v2';
const fs = require('fs');

export const twitterPost = async (req, res) => {
    try {
        const client = getTwitterClient(req);
        let mediaId = await uploadAllImage(req.body.attachment, client);
        const post = await client.v1.tweet(req.body.message, {
            media_ids: mediaId,
        });
        console.log(post);
        res.send(post);
    } catch (e) {
        console.log(e);
        console.log(e.data);
        res.status(e.code);
        res.send(e.data);
    }
};

function uploadAllImage(imageObjList, client) {
    return new Promise(async (resolve, reject) => {
        try {
            let imageIdList = [];
            if (imageObjList && imageObjList.length) {
                for (let img of imageObjList) {
                    const response = await axios.get(img.url, {
                        responseType: 'arraybuffer',
                    });
                    const buffer = Buffer.from(response.data, 'utf-8');
                    const mediaId = await client.v1.uploadMedia(buffer, {
                        mimeType: img.fileType,
                    });
                    imageIdList.push(mediaId);
                }
            }
            resolve(imageIdList);
        } catch (e) {
            reject(e);
        }
    });
}

export const getTwitterPost = async (req, res, next) => {
    try {
        req.body.access_token = await getTwitterToekFromV1ToV2();
        let header = createHeader(req);
        try {
            const twitter = await axios.get(
                `${environment.twitter_url}/users/${req.body.id}/tweets?expansions=author_id,attachments.media_keys&media.fields=url&tweet.fields=created_at,entities&user.fields=url`,
                { headers: header }
            );
            res.send(twitter.data);
        } catch (e) {
            console.log(e);
            res.status(e.response.status);
            res.send(e.response.data);
        }
    } catch (e) {
        console.log(e);
        console.log(e.response.data);
    }

    /* const tweets = await client.v1.tweets();
      console.log(tweets) */
};

export const getUserId = async (req, res, next) => {
    req.body.access_token = await getTwitterToekFromV1ToV2();
    let header = createHeader(req);
    try {
        const twitter = await axios.get(
            `https://api.twitter.com/2/users?ids=364949543&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified`,
            {
                headers: header,
            }
        );
        res.send(twitter.data);
    } catch (e) {
        res.status(e.response.status);
        res.send(e.response.data);
    }
};

function getTwitterToekFromV1ToV2() {
    return new Promise(async (resolve, reject) => {
        const client = new TwitterApi({
            username: environment.twitter_app_key,
            password: environment.twitter_app_secret,
        });
        try {
            const twitter = await axios.post(
                `https://api.twitter.com/oauth2/token?grant_type=client_credentials`,
                { grant_type: 'client_credentials' },
                {
                    headers: {
                        Authorization: `Basic ${client._requestMaker.basicToken}`,
                        'Content-type': `application/x-www-form-urlencoded;charset=UTF-8`,
                    },
                }
            );
            resolve(twitter.data.access_token);
        } catch (e) {
            reject(e);
        }
    });
}

function createHeader(req) {
    let header = {
        Authorization: `Bearer ${req.body.access_token}`,
        ConsumerKey: `${environment.twitterConsumerKey}`,
        ConsumerSecret: `${environment.twitterConsumerSecret}`,
        'Content-type': `application/json`,
    };
    return header;
}

function getTwitterClient(req) {
    const client = new TwitterApi({
        appKey: environment.twitter_app_key,
        appSecret: environment.twitter_app_secret,
        accessToken: req?.body?.oauth_token || req?.body?.access_token,
        accessSecret: req.body.oauth_token_secret,
    });
    return client;
}
