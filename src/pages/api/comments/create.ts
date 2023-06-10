import type { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/db';
import { Comment } from '@/db/models/comment';

const knex = getKnex();

type ResponseType = Comment | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    // Check if request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }

    const newComment: Comment = req.body;

    try {
        const [insertedComment] = await knex('comments').insert(newComment).returning('*');

        // Everything went well
        return res.status(201).json(insertedComment);
    } catch (error) {
        console.error(error);

        // Unexpected error
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}
