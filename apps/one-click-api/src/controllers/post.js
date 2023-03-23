const axios = require('axios');
var { environment } = require('../environments/environment');



export const createPost = async (req, res) => {
    console.log(environment.LOCAL_URL);
    console.log(req.body);
    if (req.body) {
        for (let element of req.body) {
            if (element.type == "FACEBOOK") {
                await axios.post(`${environment.LOCAL_URL}/facebook/create-post`, element)
            }
            if (element.type == "TWITTER") {
                await axios.post(`${environment.LOCAL_URL}/twitter/create-post`, element)
            }
            if (element.type == "INSTAGRAM") {
                await axios.post(`${environment.LOCAL_URL}/instagramr/create-post`, element)
            }
        }
        res.send({
            error: false,
            message: "Content posted succesfully"
        });
    }
}