import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { Post, postMetadata as modelMetadata } from '@/db/models/post';
import Link from 'next/link';
import { getKnex } from '@/db';

interface PostsPageProps {
    posts: Post[];
    tables: Record<string, string>;
}

const PostsPage = ({ posts, tables }: PostsPageProps) => {
    const fieldData = posts.map(post => (
        <tr key={post.id}>
            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/posts/${post.id}`}>
                        {post.id !== null && typeof post.id !== 'undefined' ? String(post.id) : ''}
                    </Link>
                ) : post.id !== null && typeof post.id !== 'undefined' ? (
                    typeof post.id === 'boolean' ? (
                        post.id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(post.id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['title'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/posts/${post.id}`}>
                        {post.title !== null && typeof post.title !== 'undefined' ? String(post.title) : ''}
                    </Link>
                ) : post.title !== null && typeof post.title !== 'undefined' ? (
                    typeof post.title === 'boolean' ? (
                        post.title ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(post.title)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['body'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/posts/${post.id}`}>
                        {post.body !== null && typeof post.body !== 'undefined' ? String(post.body) : ''}
                    </Link>
                ) : post.body !== null && typeof post.body !== 'undefined' ? (
                    typeof post.body === 'boolean' ? (
                        post.body ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(post.body)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['user_id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/posts/${post.id}`}>
                        {post.user_id !== null && typeof post.user_id !== 'undefined' ? String(post.user_id) : ''}
                    </Link>
                ) : post.user_id !== null && typeof post.user_id !== 'undefined' ? (
                    typeof post.user_id === 'boolean' ? (
                        post.user_id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(post.user_id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['created_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/posts/${post.id}`}>
                        {post.created_at !== null && typeof post.created_at !== 'undefined' ? String(post.created_at) : ''}
                    </Link>
                ) : post.created_at !== null && typeof post.created_at !== 'undefined' ? (
                    typeof post.created_at === 'boolean' ? (
                        post.created_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(post.created_at)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['updated_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/posts/${post.id}`}>
                        {post.updated_at !== null && typeof post.updated_at !== 'undefined' ? String(post.updated_at) : ''}
                    </Link>
                ) : post.updated_at !== null && typeof post.updated_at !== 'undefined' ? (
                    typeof post.updated_at === 'boolean' ? (
                        post.updated_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(post.updated_at)
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
                        <h1 className="text-4xl font-bold">Posts</h1>
                        <Link href="/posts/new" className="block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white">
                            New post
                        </Link>
                    </div>

                    <div id="posts" className="min-w-full">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        ID
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Body
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        User Id
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
        const postsFromKnex = await knex('posts');
        const posts = postsFromKnex.map((post: Post) => ({
            ...post,
            created_at: post.created_at?.toISOString(),
            updated_at: post.updated_at?.toISOString(),
        }));

        const filePath = path.join(process.cwd(), 'src/db/schema.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const tables = JSON.parse(fileContent);

        return {
            props: {
                posts,
                tables,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                posts: [],
                tables: {},
            },
        };
    }
};

export default PostsPage;
