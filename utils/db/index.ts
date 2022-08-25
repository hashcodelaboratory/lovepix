import admin from 'firebase-admin';
import serviceAccount from './service-account-key.json';

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(JSON.stringify(serviceAccount))
        });
    } catch (error) {
        console.log('Firebase admin initialization error', error);
    }
}

export default admin.firestore();