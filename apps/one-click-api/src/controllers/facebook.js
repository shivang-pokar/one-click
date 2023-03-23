const axios = require('axios');
var { environment } = require('../environments/environment');


export const facebookPost = async (req, res, next) => {
    try {
        const allUrlList = createImageUrl(req.body.attachment, req.body.access_token, req.body.user_id);
        const imageList = await getImagePerma(allUrlList);
        const feed = await axios.post(`${environment.FB_AUTH_URL}/${req.body.user_id}/feed`, {
            access_token: req.body.access_token,
            message: req.body.message,
            attached_media: imageList
        })
        res.send(feed.data);
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
            allImageUploadUrlList.push(axios.post(`${environment.FB_AUTH_URL}/${id}/photos?url=${encodeURIComponent(element.url)}&published=false&access_token=${access_token}`, {}));
        });
    }
    return allImageUploadUrlList;
}