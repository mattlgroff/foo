import { GetServerSideProps } from 'next';
import { Post, postMetadata as modelMetadata, PostMetadata } from '@/db/models/post';
import Link from 'next/link';
import { getKnex } from '@/db';
import { useRouter } from 'next/router';

interface ShowPostPageProps {
    post: Post;
}

const ShowPostPage = ({ post }: ShowPostPageProps) => {
    const router = useRouter();

    // Confirm deletion, then make request to delete endpoint
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            try {
                const res = await fetch(`/api/posts/destroy/${post.id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Delete failed');
                alert('Post deleted successfully');
                router.push('/posts');
            } catch (error) {
                alert('An error occurred while deleting the post.');
            }
        }
    };

    const fieldData = (Object.keys(modelMetadata) as Array<keyof PostMetadata>).map(field => (
        <p key={field} className="my-5">
            <strong className="mb-1 block font-medium">{modelMetadata[field].label}</strong>
            {post[field] !== null && typeof post[field] !== 'undefined'
                ? typeof post[field] === 'boolean'
                    ? post[field]
                        ? 'Yes'
                        : 'No'
                    : String(post[field])
                : ''}
        </p>
    ));

    return (
        <main className="container mx-auto mt-28 flex min-h-screen px-5">
            <div className="mx-auto flex w-full md:w-2/3">
                <div className="mx-auto">
                    <div id="post">{fieldData}</div>

                    <Link href={`/posts/${post.id}/edit`} className="mt-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                        Edit this post
                    </Link>

                    <div className="ml-2 inline-block">
                        <button onClick={handleDelete} className="mt-2 rounded-lg bg-gray-100 px-5 py-3 font-medium">
                            Destroy this post
                        </button>
                    </div>
                    <Link href={`/posts`} className="ml-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                        Back to posts
                    </Link>
                </div>
            </div>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const knex = getKnex();
    const post = await knex('posts').where('id', context.params?.id).first();

    if (!post) {
        return {
            notFound: true,
        };
    }

    const serializedPost = {
        ...post,
        created_at: post.created_at?.toISOString(),
        updated_at: post.updated_at?.toISOString(),
    };

    return {
        props: {
            post: serializedPost,
        },
    };
};

export default ShowPostPage;
