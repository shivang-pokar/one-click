const axios = require('axios');



export const createPost = async (req, res) => {
    if (req.body) {
        //let post = [];
        let posts = req.body.postContent;
        for (const [index, element] of posts.entries()) {
            if (element.type == "FACEBOOK") {
                try {
                    const fb = await axios.post(`${process.env.LOCAL_URL}/facebook/create-post`, element);
                    posts[index].post_id = fb.data.id;
                }
                catch (e) {
                    posts[index].post_id = null;
                }
            }
            if (element.type == "TWITTER") {
                try {
                    const twitter = await axios.post(`${process.env.LOCAL_URL}/twitter/create-post`, element)
                    posts[index].post_id = twitter.data.id;
                }
                catch (e) {
                    posts[index].post_id = null;
                }
            }
            if (element.type == "INSTAGRAM") {
                try {
                    const insta = await axios.post(`${process.env.LOCAL_URL}/instagramr/create-post`, element);
                    posts[index].post_id = insta.data.id;
                    posts[index].creation_id = insta?.data?.creation_id || '';
                }
                catch (e) {
                    posts[index].post_id = null;
                }
            }
        }

        addDataInPostContainer(req, posts);


        res.send({
            error: false,
            message: "Content posted succesfully",
            post: posts
        });
    }
}

const addDataInPostContainer = async (req, posts) => {
    const db = req.firebaseAdmin.firestore();

    let id = req.body.id || db.collection('postContainer').doc().id;
    let obj = {
        id: id,
        company_id: req.body.company_id,
        status: 'SUCESS',
        postContent: posts,
        createdBy: req?.body?.uid || req?.body?.createdBy,
        createdAt: new Date().getTime(),
        updatedBy: req?.body?.uid || req?.body?.updatedBy,
        updatedAt: new Date().getTime(),
        deleteFlag: "N"
    }

    console.log(req.body)
    console.log(obj)

    if (req.body.id) {
        await db.collection('postContainer').doc(id).update(obj);
    } else {
        await db.collection('postContainer').doc(id).set(obj, { merge: true });
    }

}