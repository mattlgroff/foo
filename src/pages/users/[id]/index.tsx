import { GetServerSideProps } from 'next';
import { User, userMetadata as modelMetadata, UserMetadata } from '@/db/models/user';
import Link from 'next/link';
import { getKnex } from '@/db';
import { useRouter } from 'next/router';

interface ShowUserPageProps {
    user: User;
}

const ShowUserPage = ({ user }: ShowUserPageProps) => {
    const router = useRouter();

    // Confirm deletion, then make request to delete endpoint
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                const res = await fetch(`/api/users/destroy/${user.id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Delete failed');
                alert('User deleted successfully');
                router.push('/users');
            } catch (error) {
                alert('An error occurred while deleting the user.');
            }
        }
    };

    const fieldData = (Object.keys(modelMetadata) as Array<keyof UserMetadata>).map(field => (
        <p key={field} className="my-5">
            <strong className="mb-1 block font-medium">{modelMetadata[field].label}</strong>
            {user[field] !== null && typeof user[field] !== 'undefined'
                ? typeof user[field] === 'boolean'
                    ? user[field]
                        ? 'Yes'
                        : 'No'
                    : String(user[field])
                : ''}
        </p>
    ));

    return (
        <main className="container mx-auto mt-28 flex min-h-screen px-5">
            <div className="mx-auto flex w-full md:w-2/3">
                <div className="mx-auto">
                    <div id="user">{fieldData}</div>

                    <Link href={`/users/${user.id}/edit`} className="mt-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                        Edit this user
                    </Link>

                    <div className="ml-2 inline-block">
                        <button onClick={handleDelete} className="mt-2 rounded-lg bg-gray-100 px-5 py-3 font-medium">
                            Destroy this user
                        </button>
                    </div>
                    <Link href={`/users`} className="ml-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                        Back to users
                    </Link>
                </div>
            </div>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const knex = getKnex();
    const user = await knex('users').where('id', context.params?.id).first();

    if (!user) {
        return {
            notFound: true,
        };
    }

    const serializedUser = {
        ...user,
        created_at: user.created_at?.toISOString(),
        updated_at: user.updated_at?.toISOString(),
    };

    return {
        props: {
            user: serializedUser,
        },
    };
};

export default ShowUserPage;
