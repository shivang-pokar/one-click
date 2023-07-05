import * as admin from 'firebase-admin';
import serviceAccount from '../one-click-desk-stage-firebase-adminsdk-wymg0-9ee2910ec1.json';
import serviceAccountProd from '../oneclick-sch-firebase-adminsdk-vrx59-a40db4b4b6.json';

admin.initializeApp({
    credential: admin.credential.cert((process.env.IS_PROD == 'true') ? serviceAccountProd : serviceAccount),
    databaseURL: process.env.DATABASEURL
});

export default admin;