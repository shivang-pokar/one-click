const axios = require('axios');
var { environment } = require('../environments/environment');



export const createPost = async (req, res) => {
    if (req.body) {
        let post = [];
        for (let element of req.body) {
            if (element.type == "FACEBOOK") {
                try {
                    const fb = await axios.post(`${environment.LOCAL_URL}/facebook/create-post`, element);
                    post.push({
                        error: false,
                        type: "FACEBOOK",
                        data: fb.data
                    })
                }
                catch (e) {
                    post.push({
                        error: true,
                        type: "FACEBOOK",
                        data: e
                    })
                }
            }
            if (element.type == "TWITTER") {
                try {
                    const twitter = await axios.post(`${environment.LOCAL_URL}/twitter/create-post`, element)
                    post.push({
                        error: false,
                        type: "TWITTER",
                        data: twitter.data
                    })
                }
                catch (e) {
                    post.push({
                        error: true,
                        type: "TWITTER",
                        data: e
                    })
                }
            }
            if (element.type == "INSTAGRAM") {
                try {
                    const insta = await axios.post(`${environment.LOCAL_URL}/instagramr/create-post`, element);
                    post.push({
                        error: false,
                        type: "INSTAGRAM",
                        data: insta.data
                    })
                }
                catch (e) {
                    post.push({
                        error: true,
                        type: "INSTAGRAM",
                        data: e
                    })
                }
            }
        }
        res.send({
            error: false,
            message: "Content posted succesfully",
            post: post
        });
    }
}