import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { Post } from '@/db/models/post';

const knex = getKnex();

type ResponseType = Post | { message: string };

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
        const post = await knex('posts').where('id', id).first();

        // If the post with the given id doesn't exist, we return an error
        if (!post) {
            return res.status(404).json({ message: `Post with id ${id} not found` });
        }

        // Everything went well
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
