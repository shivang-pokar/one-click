const axios = require('axios');


export const facebookPost = async (req, res, next) => {
    try {
        if (req?.body?.attachment[0].type == "IMAGE") {
            /* 
            Post Image
             */
            const allUrlList = createImageUrl(req.body.attachment, req.body.access_token, req.body.user_id);
            const mediaList = await getImagePerma(allUrlList);
            const feed = await axios.post(`${process.env.FB_AUTH_URL}/${req.body.user_id}/feed`, {
                access_token: req.body.access_token,
                message: req.body.message,
                attached_media: mediaList
            });
            res.send(feed.data);
        } else {
            /* 
            Post Video
             */
            let attachment = req.body.attachment[0];
            const feed = await axios.post(`${process.env.FB_AUTH_URL}/${req.body.user_id}/videos?file_url=${encodeURIComponent(attachment.url)}&published=true&description=${encodeURIComponent(req.body.message || '')}&access_token=${req.body.access_token}`, {});
            res.send(feed.data);
        }
    }
    catch (e) {
        res.status(e.response.status)
        res.send(e.response.data);
    }
}

function getImagePerma(allUrlList) {
    return new Promise(async (resolve, reject) => {
        let imageList = [];
        if (allUrlList.length) {
            try {
                const allIdList = await axios.all(allUrlList);
                allIdList.forEach((imageId) => {
                    imageList.push({ "media_fbid": imageId.data.id })
                });
                resolve(imageList);
            }
            catch (e) {
                reject(e);
            }
        } else {
            resolve(imageList);
        }
    })
}

function createImageUrl(photolist, access_token, id) {
    let allImageUploadUrlList = []
    if (photolist && photolist.length) {
        photolist.forEach(element => {
            allImageUploadUrlList.push(axios.post(`${process.env.FB_AUTH_URL}/${id}/photos?url=${encodeURIComponent(element.url)}&published=false&access_token=${access_token}`, {}));
        });
    }
    return allImageUploadUrlList;
}

/* function createVideoUrl(mediaList, access_token, id) {
    
    return mediaUploadList;
} */