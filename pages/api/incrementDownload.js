// pages/api/incrementDownload.js
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const downloadDocRef = doc(db, 'downloads', 'pAd9UmdalQuAcEeuXQm4');

        try {
            await runTransaction(db, async (transaction) => {
                const downloadDoc = await transaction.get(downloadDocRef);
                if (!downloadDoc.exists()) {
                    throw new Error('Document does not exist');
                }

                const newDownloadCount = downloadDoc.data().downloadCount + 1;
                transaction.update(downloadDocRef, { downloadCount: newDownloadCount });
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Transaction failed: ', error);
            res.status(500).json({ error: 'Error updating document' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
