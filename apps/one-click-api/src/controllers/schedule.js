const axios = require('axios');
const fs = require('fs');
import * as schedule from 'node-schedule';
import firebaseAdmin from './firebaseAdmin';


export const createSchedule = async (req, res) => {
    if (req.body) {

        var my_job = schedule.scheduledJobs[req?.body?.id];
        if (my_job) {
            my_job.cancel();
        }

        var futureDate = new Date(req.body.time);
        futureDate = futureDate.toLocaleString('en-US', { timeZone: req.body.timeZone });

        scheduleData(req.body.id, futureDate);

        /* schedule.scheduleJob(req.body.id, futureDate, function (body) {
            firebaseAdmin.firestore().collection('postContainer').doc(body).get().then(post => {
                axios.post(`${process.env.LOCAL_URL}/post/create-post`, post.data());
            });

        }.bind(null, req.body.id)); */

        res.send({ message: 'Post scheduled successfully' })

    }
}

export const scheduleData = async (id, futureDate) => {
    schedule.scheduleJob(id, futureDate, function (body) {
        firebaseAdmin.firestore().collection('postContainer').doc(body).get().then(post => {
            axios.post(`${process.env.LOCAL_URL}/post/create-post`, post.data());
        });

    }.bind(null, id));
}

export const cancelSchedule = async (req, res) => {

    var my_job = schedule.scheduledJobs[req?.body?.id];
    if (my_job) {
        my_job.cancel();
        res.send({ message: 'Post cancel successfully' })
    } else {
        res.status(500);
        res.send({ message: 'Post cancel failed' })
    }
}


/* Schedule Store before system restart */
export const listSchedule = async () => {

    console.log('Schedule Store');

    let cronData = [];
    const jobs = Object.keys(schedule.scheduledJobs).map(key => schedule.scheduledJobs[key]);

    for (let job of jobs) {
        cronData.push({
            name: job.name,
            time: job.nextInvocation()._date.ts
        });
    }

    const jsonData = JSON.stringify(cronData);
    fs.writeFile('listSchedule.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data written to file successfully.');
        }
    });

    //console.log(JSON.stringify(schedule.scheduledJobs))
}


/* Schedule Triger after system restart */
export const reschduleAfterRestart = () => {
    console.log('Schedule Trigger')
    fs.readFile('listSchedule.json', 'utf8', (err, data) => {
        if (err) throw err;
        // Display the file content
        if (data) {
            let schdeuleData = JSON.parse(data);
            for (let element of schdeuleData) {
                scheduleData(element.name, element.tile);
            }
        }
    });
}