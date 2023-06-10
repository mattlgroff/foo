import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { User } from '@/db/models/user';

const knex = getKnex();

type ResponseType = User | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }

    const newUser: User = req.body;

    try {
        const [insertedUser] = await knex('users').insert(newUser).returning('*');

        // Everything went well
        return res.status(201).json(insertedUser);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
