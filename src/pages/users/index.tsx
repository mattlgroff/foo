import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { User, userMetadata as modelMetadata } from '@/db/models/user';
import Link from 'next/link';
import { getKnex } from '@/db';

interface UsersPageProps {
    users: User[];
    tables: Record<string, string>;
}

const UsersPage = ({ users, tables }: UsersPageProps) => {
    const fieldData = users.map(user => (
        <tr key={user.id}>
            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['id'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/users/${user.id}`}>
                        {user.id !== null && typeof user.id !== 'undefined' ? String(user.id) : ''}
                    </Link>
                ) : user.id !== null && typeof user.id !== 'undefined' ? (
                    typeof user.id === 'boolean' ? (
                        user.id ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(user.id)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['name'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/users/${user.id}`}>
                        {user.name !== null && typeof user.name !== 'undefined' ? String(user.name) : ''}
                    </Link>
                ) : user.name !== null && typeof user.name !== 'undefined' ? (
                    typeof user.name === 'boolean' ? (
                        user.name ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(user.name)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['email'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/users/${user.id}`}>
                        {user.email !== null && typeof user.email !== 'undefined' ? String(user.email) : ''}
                    </Link>
                ) : user.email !== null && typeof user.email !== 'undefined' ? (
                    typeof user.email === 'boolean' ? (
                        user.email ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(user.email)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['created_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/users/${user.id}`}>
                        {user.created_at !== null && typeof user.created_at !== 'undefined' ? String(user.created_at) : ''}
                    </Link>
                ) : user.created_at !== null && typeof user.created_at !== 'undefined' ? (
                    typeof user.created_at === 'boolean' ? (
                        user.created_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(user.created_at)
                    )
                ) : (
                    ''
                )}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {modelMetadata['updated_at'].label === 'ID' ? (
                    <Link className="text-blue-500" href={`/users/${user.id}`}>
                        {user.updated_at !== null && typeof user.updated_at !== 'undefined' ? String(user.updated_at) : ''}
                    </Link>
                ) : user.updated_at !== null && typeof user.updated_at !== 'undefined' ? (
                    typeof user.updated_at === 'boolean' ? (
                        user.updated_at ? (
                            'Yes'
                        ) : (
                            'No'
                        )
                    ) : (
                        String(user.updated_at)
                    )
                ) : (
                    ''
                )}
            </td>
        </tr>
    ));

    return (
        <div className="flex flex-col min-h-screen">
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
        <main className="container mx-auto  flex min-h-screen px-5">


            <div className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Users</h1>
                    <Link href="/users/new" className="block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white">
                        New user
                    </Link>
                </div>

                <div id="users" className="min-w-full">
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
                                    Email
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
        const usersFromKnex = await knex('users');
        const users = usersFromKnex.map((user: User) => ({
            ...user,
            created_at: user.created_at?.toISOString(),
            updated_at: user.updated_at?.toISOString(),
        }));

        const filePath = path.join(process.cwd(), 'src/db/schema.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const tables = JSON.parse(fileContent);

        return {
            props: {
                users,
                tables,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                users: [],
                tables: {},
            },
        };
    }
};

export default UsersPage;
