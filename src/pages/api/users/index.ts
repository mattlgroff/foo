import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { User } from '@/db/models/user';

const knex = getKnex();

type ResponseType = User[] | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed. Use GET.' });
    }

    try {
        const users = await knex('users').select('*');

        // Everything went well
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
