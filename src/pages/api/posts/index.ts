import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { Post } from '@/db/models/post';

const knex = getKnex();

type ResponseType = Post[] | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed. Use GET.' });
    }

    try {
        const posts = await knex('posts').select('*');

        // Everything went well
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
