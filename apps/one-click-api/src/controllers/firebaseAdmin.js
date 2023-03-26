import * as admin from 'firebase-admin';
import serviceAccount from '../one-click-desk-stage-firebase-adminsdk-wymg0-9ee2910ec1.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-click-desk-stage-default-rtdb.firebaseio.com"
});

export default admin;