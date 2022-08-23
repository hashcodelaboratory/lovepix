import db from '../../../utils/db';

/*
    In this code, we imported the db object from /utils/db in order to use it
    to establish communication with the database.
    Firestore has collections, and each collection has multiple documents.

    We’ll use the slug key’s value to check if there is already another entry with the same slug value.
    If so, we’ll end the request with a 400 status code.
 */
export default async (req: any, res: any) => {
    try {
        const { slug } = req.body;
        const entries = await db.collection('entries').get();
        const entriesData = entries.docs.map(entry => entry.data());

        if (entriesData.some(entry => entry.slug === slug)) {
            res.status(400).end();
        } else {
            const { id } = await db.collection('entries').add({
                ...req.body,
                created: new Date().toISOString(),
            });
            res.status(200).json({ id });
        }
    } catch (e) {
        res.status(400).end();
    }
}