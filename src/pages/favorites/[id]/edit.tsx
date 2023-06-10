import { GetServerSideProps } from "next";
import { Favorite, favoriteMetadata as modelMetadata, FavoriteMetadata } from '@/db/models/favorite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getKnex } from '@/db';

interface EditFavoritePageProps {
    favorite: Favorite;
}

const EditFavoritePage = ({ favorite }: EditFavoritePageProps) => {
    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/api/favorites/update/' + favorite.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            router.push('/favorites');
        } else {
            const error = await response.json();

            alert(`There was a problem updating your favorite. ${error.message}`);
        }
    }

    return (
        <main className="container mx-auto mt-28 flex min-h-screen px-5">
            <div className="mx-auto w-full md:w-2/3">
                <h1 className="text-4xl font-bold">Edit favorite</h1>

                <form onSubmit={onSubmit}>
                    {(Object.keys(modelMetadata) as Array<keyof FavoriteMetadata>).map(key => {
                        if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                            return (
                                <div key={key} className="my-5">
                                    <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                    <input
                                        name={key}
                                        type={modelMetadata[key].inputType}
                                        defaultValue={favorite[key]}
                                        className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 shadow outline-none"
                                    />
                                </div>
                            );
                        }
                    })}
                    <div className="inline">
                        <button
                            type="submit"
                            className="inline-block cursor-pointer rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
                        >
                            Update favorite
                        </button>
                    </div>
                </form>

                <Link href="/favorites" className="ml-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                    Back to favorites
                </Link>
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

export default EditFavoritePage;
