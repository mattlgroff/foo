import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { Post } from '@/db/models/post';

const knex = getKnex();

type ResponseType = Post | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }

    const newPost: Post = req.body;

    try {
        const [insertedPost] = await knex('posts').insert(newPost).returning('*');

        // Everything went well
        return res.status(201).json(insertedPost);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
