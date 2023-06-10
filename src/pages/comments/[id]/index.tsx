import { GetServerSideProps } from 'next';
import { Comment, commentMetadata as modelMetadata, CommentMetadata } from '@/db/models/comment';
import Link from 'next/link';
import { getKnex } from '@/db';
import { useRouter } from 'next/router';

interface ShowCommentPageProps {
    comment: Comment;
}

const ShowCommentPage = ({ comment }: ShowCommentPageProps) => {
    const router = useRouter();

    // Confirm deletion, then make request to delete endpoint
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (confirmDelete) {
            try {
                const res = await fetch(`/api/comments/destroy/${comment.id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Delete failed');
                alert('Comment deleted successfully');
                router.push('/comments');
            } catch (error) {
                alert('An error occurred while deleting the comment.');
            }
        }
    };

    const fieldData = (Object.keys(modelMetadata) as Array<keyof CommentMetadata>).map(field => (
        <p key={field} className="my-5">
            <strong className="mb-1 block font-medium">{modelMetadata[field].label}</strong>
            {comment[field] !== null && typeof comment[field] !== 'undefined'
                ? typeof comment[field] === 'boolean'
                    ? comment[field]
                        ? 'Yes'
                        : 'No'
                    : String(comment[field])
                : ''}
        </p>
    ));

    return (
        <main className="container mx-auto mt-28 flex min-h-screen px-5">
            <div className="mx-auto flex w-full md:w-2/3">
                <div className="mx-auto">
                    <div id="comment">{fieldData}</div>

                    <Link href={`/comments/${comment.id}/edit`} className="mt-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                        Edit this comment
                    </Link>

                    <div className="ml-2 inline-block">
                        <button onClick={handleDelete} className="mt-2 rounded-lg bg-gray-100 px-5 py-3 font-medium">
                            Destroy this comment
                        </button>
                    </div>
                    <Link href={`/comments`} className="ml-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                        Back to comments
                    </Link>
                </div>
            </div>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const knex = getKnex();
    const comment = await knex('comments').where('id', context.params?.id).first();

    if (!comment) {
        return {
            notFound: true,
        };
    }

    const serializedComment = {
        ...comment,
        created_at: comment.created_at?.toISOString(),
        updated_at: comment.updated_at?.toISOString(),
    };

    return {
        props: {
            comment: serializedComment,
        },
    };
};

export default ShowCommentPage;
