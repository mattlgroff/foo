import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { Favorite } from '@/db/models/favorite';

const knex = getKnex();

type ResponseType = Favorite | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is PUT
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed. Use PUT.' });
    }

    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: 'Missing ID' });
    }

    const updatedFavorite: Favorite = req.body;
    updatedFavorite['updated_at'] = new Date();

    try {
        const [updatedEntry] = await knex('favorites').where('id', id).update(updatedFavorite).returning('*');
        // If update is successful, we return the updated record
        if (updatedEntry) {
            return res.status(200).json(updatedEntry);
        } else {
            // If the record with the given id doesn't exist, we return an error
            return res.status(404).json({ message: `Favorite with id ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
