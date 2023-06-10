import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { Comment, commentMetadata as modelMetadata } from '@/db/models/comment';
import Link from 'next/link';
import { getKnex } from '@/db';

interface CommentsPageProps {
    comments: Comment[];
    tables: Record<string, string>;
}

const CommentsPage = ({ comments, tables }: CommentsPageProps) => {
    const fieldData = comments.map(comment => (
        <tr key={comment.id}>
            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/comments/${comment.id}`}>
                        {comment.id !== null && typeof comment.id !== 'undefined' ? String(comment.id) : ''}
                    </Link>
                ) : comment.id !== null && typeof comment.id !== 'undefined' ? (
                    typeof comment.id === 'boolean' ? (
                        comment.id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(comment.id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['text'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/comments/${comment.id}`}>
                        {comment.text !== null && typeof comment.text !== 'undefined' ? String(comment.text) : ''}
                    </Link>
                ) : comment.text !== null && typeof comment.text !== 'undefined' ? (
                    typeof comment.text === 'boolean' ? (
                        comment.text ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(comment.text)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['user_id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/comments/${comment.id}`}>
                        {comment.user_id !== null && typeof comment.user_id !== 'undefined' ? String(comment.user_id) : ''}
                    </Link>
                ) : comment.user_id !== null && typeof comment.user_id !== 'undefined' ? (
                    typeof comment.user_id === 'boolean' ? (
                        comment.user_id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(comment.user_id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['post_id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/comments/${comment.id}`}>
                        {comment.post_id !== null && typeof comment.post_id !== 'undefined' ? String(comment.post_id) : ''}
                    </Link>
                ) : comment.post_id !== null && typeof comment.post_id !== 'undefined' ? (
                    typeof comment.post_id === 'boolean' ? (
                        comment.post_id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(comment.post_id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['created_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/comments/${comment.id}`}>
                        {comment.created_at !== null && typeof comment.created_at !== 'undefined' ? String(comment.created_at) : ''}
                    </Link>
                ) : comment.created_at !== null && typeof comment.created_at !== 'undefined' ? (
                    typeof comment.created_at === 'boolean' ? (
                        comment.created_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(comment.created_at)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['updated_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/comments/${comment.id}`}>
                        {comment.updated_at !== null && typeof comment.updated_at !== 'undefined' ? String(comment.updated_at) : ''}
                    </Link>
                ) : comment.updated_at !== null && typeof comment.updated_at !== 'undefined' ? (
                    typeof comment.updated_at === 'boolean' ? (
                        comment.updated_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(comment.updated_at)
                    )
                ) : (
                    ''
                )}
            </td>
        </tr>
    ));

    return (
        <div className="flex min-h-screen flex-col">
            <nav className="m-6 flex items-center space-x-4 lg:space-x-6">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                    home
                </Link>
                {Object.keys(tables).map(table => (
                    <Link href={`/${table}`} key={table} className="text-sm font-medium transition-colors hover:text-primary">
                        {table}
                    </Link>
                ))}
            </nav>
            <main className="container mx-auto flex min-h-screen px-5">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-bold">Comments</h1>
                        <Link href="/comments/new" className="block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white">
                            New comment
                        </Link>
                    </div>

                    <div id="comments" className="min-w-full">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        ID
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Text
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        User Id
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Post Id
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Created At
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Updated At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">{fieldData}</tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const knex = getKnex();
        const commentsFromKnex = await knex('comments');
        const comments = commentsFromKnex.map((comment: Comment) => ({
            ...comment,
            created_at: comment.created_at?.toISOString(),
            updated_at: comment.updated_at?.toISOString(),
        }));

        const filePath = path.join(process.cwd(), 'src/db/schema.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const tables = JSON.parse(fileContent);

        return {
            props: {
                comments,
                tables,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                comments: [],
                tables: {},
            },
        };
    }
};

export default CommentsPage;
