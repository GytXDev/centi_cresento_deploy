// pages/api/incrementClick.js
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const clickDocRef = doc(db, 'clicks', 'playNowClicks');

        try {
            await runTransaction(db, async (transaction) => {
                const clickDoc = await transaction.get(clickDocRef);
                if (!clickDoc.exists()) {
                    throw new Error('Document does not exist');
                }

                const newClickCount = clickDoc.data().clickCount + 1;
                transaction.update(clickDocRef, { clickCount: newClickCount });
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
