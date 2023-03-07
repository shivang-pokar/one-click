const axios = require('axios');
var { environment } = require('../environments/environment');


export const instagramrPost = async (req, res, next) => {
    try {
        if (req.body.image_url && req.body.image_url.length > 1) {
            const children = await uploadImage(req);
            const instagram = await axios.post(`${environment.FB_AUTH_URL}/${req.body.id}/media?media_type=CAROUSEL&children=${children}&caption=${req.body.message}&access_token=${req.body.access_token}`, {})
            post(req, res, instagram);

        } else {
            const instagram = await axios.post(`${environment.FB_AUTH_URL}/${req.body.id}/media?image_url=${encodeURIComponent(req.body.image_url[0].url)}&caption=${req.body.message}&access_token=${req.body.access_token}`, {})
            post(req, res, instagram);
        }

    }
    catch (e) {
        res.status(e.response.status)
        res.send(e.response.data);
    }
}

function uploadImage(req) {
    return new Promise(async (resolve, reject) => {
        let children;
        for (let image of req.body.image_url) {
            const post = await axios.post(`${environment.FB_AUTH_URL}/${req.body.id}/media?image_url=${encodeURIComponent(image.url)}&is_carousel_item=true&access_token=${req.body.access_token}`, {})
            if (!children) {
                children = post.data.id;
            } else {
                children = children + '%2C' + post.data.id;
            }
        }
        resolve(children)
    });
}


async function post(req, res, instagram) {
    const post = await axios.post(`${environment.FB_AUTH_URL}/${req.body.id}/media_publish?creation_id=${instagram.data.id}&access_token=${req.body.access_token}`, {})
    post.data.creation_id = instagram.data.id;
    res.send(post.data);
}