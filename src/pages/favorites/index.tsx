import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { Favorite, favoriteMetadata as modelMetadata } from '@/db/models/favorite';
import Link from 'next/link';
import { getKnex } from '@/db';

interface FavoritesPageProps {
    favorites: Favorite[];
    tables: Record<string, string>;
}

const FavoritesPage = ({ favorites, tables }: FavoritesPageProps) => {
    const fieldData = favorites.map(favorite => (
        <tr key={favorite.id}>
            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/favorites/${favorite.id}`}>
                        {favorite.id !== null && typeof favorite.id !== 'undefined' ? String(favorite.id) : ''}
                    </Link>
                ) : favorite.id !== null && typeof favorite.id !== 'undefined' ? (
                    typeof favorite.id === 'boolean' ? (
                        favorite.id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(favorite.id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['name'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/favorites/${favorite.id}`}>
                        {favorite.name !== null && typeof favorite.name !== 'undefined' ? String(favorite.name) : ''}
                    </Link>
                ) : favorite.name !== null && typeof favorite.name !== 'undefined' ? (
                    typeof favorite.name === 'boolean' ? (
                        favorite.name ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(favorite.name)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['user_id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/favorites/${favorite.id}`}>
                        {favorite.user_id !== null && typeof favorite.user_id !== 'undefined' ? String(favorite.user_id) : ''}
                    </Link>
                ) : favorite.user_id !== null && typeof favorite.user_id !== 'undefined' ? (
                    typeof favorite.user_id === 'boolean' ? (
                        favorite.user_id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(favorite.user_id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['created_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/favorites/${favorite.id}`}>
                        {favorite.created_at !== null && typeof favorite.created_at !== 'undefined' ? String(favorite.created_at) : ''}
                    </Link>
                ) : favorite.created_at !== null && typeof favorite.created_at !== 'undefined' ? (
                    typeof favorite.created_at === 'boolean' ? (
                        favorite.created_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(favorite.created_at)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['updated_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/favorites/${favorite.id}`}>
                        {favorite.updated_at !== null && typeof favorite.updated_at !== 'undefined' ? String(favorite.updated_at) : ''}
                    </Link>
                ) : favorite.updated_at !== null && typeof favorite.updated_at !== 'undefined' ? (
                    typeof favorite.updated_at === 'boolean' ? (
                        favorite.updated_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(favorite.updated_at)
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
                        <h1 className="text-4xl font-bold">Favorites</h1>
                        <Link href="/favorites/new" className="block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white">
                            New favorite
                        </Link>
                    </div>

                    <div id="favorites" className="min-w-full">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        ID
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Name
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
        const favoritesFromKnex = await knex('favorites');
        const favorites = favoritesFromKnex.map((favorite: Favorite) => ({
            ...favorite,
            created_at: favorite.created_at?.toISOString(),
            updated_at: favorite.updated_at?.toISOString(),
        }));

        const filePath = path.join(process.cwd(), 'src/db/schema.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const tables = JSON.parse(fileContent);

        return {
            props: {
                favorites,
                tables,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                favorites: [],
                tables: {},
            },
        };
    }
};

export default FavoritesPage;
