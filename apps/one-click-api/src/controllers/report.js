const axios = require('axios');


export const instagramrPostReport = async (req, res, next) => {
    if (req.body) {
        try {
            const instagram = await axios.get(`${process.env.FB_AUTH_URL}/${req.body.post_id}/insights?metric=engagement,impressions,reach,likes,comments&access_token=${req.body.access_token}`, {});
            res.send(instagram.data);
        }
        catch (e) {
            next(e)
            console.log(e.response.data.error);
        }
    }
}

export const fbPostReport = async (req, res, next) => {
    if (req.body) {
        try {
            /* post_impressions,post_engaged_users,post_clicks,post_comments,post_reactions_like_total,post_shares */
            const fb = await axios.get(`${process.env.FB_AUTH_URL}/${req.body.post_id}/insights?metric=post_activity,post_clicks,post_engaged_users,post_impressions,post_reactions_by_type_total&fields=id,description,values,title,name&access_token=${req.body.access_token}`);
            res.send(fb.data);
        }
        catch (e) {
            console.log(e.response.data);
            next(e)
        }
    }
}