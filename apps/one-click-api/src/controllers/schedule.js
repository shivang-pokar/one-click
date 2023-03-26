const axios = require('axios');
import * as schedule from 'node-schedule';
import firebaseAdmin from './controllers/firebaseAdmin';


export const createSchedule = async (req, res) => {
    if (req.body) {

        var futureDate = new Date(req.body.time);
        futureDate = futureDate.toLocaleString('en-US', { timeZone: req.body.timeZone });


        schedule.scheduleJob(req.body.id, futureDate, function (body) {

            firebaseAdmin.firestore().collection('postContainer').doc(body).get().then(post => {
                axios.post(`${environment.LOCAL_URL}/post/create-post`, post.data());
            });

        }.bind(null, req.body.id));

    }
}