import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { User } from '@/db/models/user';

const knex = getKnex();

type ResponseType = User | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed. Use GET.' });
    }

    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: 'Missing ID' });
    }

    try {
        const user = await knex('users').where('id', id).first();

        // If the user with the given id doesn't exist, we return an error
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        // Everything went well
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
