import { GetServerSideProps } from 'next';
import { Favorite, favoriteMetadata as modelMetadata, FavoriteMetadata } from '@/db/models/favorite';
import Link from 'next/link';
import { getKnex } from '@/db';
import { useRouter } from 'next/router';

interface ShowFavoritePageProps {
    favorite: Favorite;
}

const ShowFavoritePage = ({ favorite }: ShowFavoritePageProps) => {
    const router = useRouter();

    // Confirm deletion, then make request to delete endpoint
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this favorite?');
        if (confirmDelete) {
            try {
                const res = await fetch(`/api/favorites/destroy/${favorite.id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Delete failed');
                alert('Favorite deleted successfully');
                router.push('/favorites');
            } catch (error) {
                alert('An error occurred while deleting the favorite.');
            }
        }
    };

    const fieldData = (Object.keys(modelMetadata) as Array<keyof FavoriteMetadata>).map(field => (
        <p key={field} className="my-5">
            <strong className="mb-1 block font-medium">{modelMetadata[field].label}</strong>
            {favorite[field] !== null && typeof favorite[field] !== 'undefined'
                ? typeof favorite[field] === 'boolean'
                    ? favorite[field]
                        ? 'Yes'
                        : 'No'
                    : String(favorite[field])
                : ''}
        </p>
    ));

    return (
        <main className="container mx-auto mt-28 flex min-h-screen px-5">
            <div className="mx-auto flex w-full md:w-2/3">
                <div className="mx-auto">
                    <div id="favorite">{fieldData}</div>

                    <Link
                        href={`/favorites/${favorite.id}/edit`}
                        className="mt-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium"
                    >
                        Edit this favorite
                    </Link>

                    <div className="ml-2 inline-block">
                        <button onClick={handleDelete} className="mt-2 rounded-lg bg-gray-100 px-5 py-3 font-medium">
                            Destroy this favorite
                        </button>
                    </div>
                    <Link href={`/favorites`} className="ml-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                        Back to favorites
                    </Link>
                </div>
            </div>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const knex = getKnex();
    const favorite = await knex('favorites').where('id', context.params?.id).first();

    if (!favorite) {
        return {
            notFound: true,
        };
    }

    const serializedFavorite = {
        ...favorite,
        created_at: favorite.created_at?.toISOString(),
        updated_at: favorite.updated_at?.toISOString(),
    };

    return {
        props: {
            favorite: serializedFavorite,
        },
    };
};

export default ShowFavoritePage;
