import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { Favorite } from '@/db/models/favorite';

const knex = getKnex();

type ResponseType = Favorite | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }

    const newFavorite: Favorite = req.body;

    try {
        const [insertedFavorite] = await knex('favorites').insert(newFavorite).returning('*');

        // Everything went well
        return res.status(201).json(insertedFavorite);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
