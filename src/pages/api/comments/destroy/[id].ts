import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';

const knex = getKnex();

type ResponseType = { success: boolean; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is DELETE
    if (req.method !== 'DELETE') {
        return res.status(405).json({ success: false, message: 'Method not allowed. Use DELETE.' });
    }

    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ success: false, message: 'Missing ID' });
    }

    try {
        const deleteCount = await knex('comments').where('id', id).del();
        // If delete is successful, we return a success message
        if (deleteCount > 0) {
            return res.status(200).json({ success: true, message: `Comment with id ${id} deleted successfully` });
        } else {
            // If the comment with the given id doesn't exist, we return an error
            return res.status(404).json({ success: false, message: `Comment with id ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        // Unexpected error
        return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
}
