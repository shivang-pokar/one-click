const axios = require('axios');


export const instagramrPost = async (req, res, next) => {
    try {
        if (req.body.attachment && req.body.attachment.length > 1) {
            const children = await uploadImage(req);
            const instagram = await axios.post(`${process.env.FB_AUTH_URL}/${req.body.user_id}/media?media_type=CAROUSEL&children=${children}&caption=${req.body.message}&access_token=${req.body.access_token}`, {})
            post(req, res, instagram);

        } else {
            try {
                //console.log(req?.body?.attachment[0])
                if (req?.body?.attachment[0].type == "IMAGE") {
                    const instagram = await axios.post(`${process.env.FB_AUTH_URL}/${req.body.user_id}/media?image_url=${encodeURIComponent(req.body.attachment[0].url)}&caption=${req.body.message}&access_token=${req.body.access_token}`, {})
                    post(req, res, instagram);
                }
                else {
                    let postType = (req?.body.postType == "POST") ? "VIDEO" : "REELS";
                    const instagram = await axios.post(`${process.env.FB_AUTH_URL}/${req.body.user_id}/media?media_type=${postType}&video_url=${encodeURIComponent(req.body.attachment[0].url)}&caption=${req.body.message}&access_token=${req.body.access_token}`, {})
                    let interval = setInterval(async () => {
                        let status = await axios.get(`${process.env.FB_AUTH_URL}/${instagram.data.id}?fields=status_code&access_token=${req.body.access_token}`)
                        if (status.data.status_code != "IN_PROGRESS") {
                            clearInterval(interval);
                            if (status.data.status_code == "FINISHED") {
                                post(req, res, instagram);
                            }
                        }
                    }, 3000);
                }
            }
            catch (e) {
                if (e?.response?.status) {
                    res.status(e.response.status)
                }
                res.send(e);
            }
        }

    }
    catch (e) {
        if (e?.response?.status) {
            res.status(e.response.status)
        }
        res.send(e);
    }
}

function uploadImage(req) {
    return new Promise(async (resolve, reject) => {
        let children;
        for (let image of req.body.attachment) {
            const post = await axios.post(`${process.env.FB_AUTH_URL}/${req.body.user_id}/media?image_url=${encodeURIComponent(image.url)}&is_carousel_item=true&access_token=${req.body.access_token}`, {})
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
    try {
        const post = await axios.post(`${process.env.FB_AUTH_URL}/${req.body.user_id}/media_publish?creation_id=${instagram.data.id}&access_token=${req.body.access_token}`, {})
        post.data.creation_id = instagram.data.id;
        res.send(post.data);
    }
    catch (e) {
        console.log(e.response.data);
    }
}