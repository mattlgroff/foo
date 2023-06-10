import { favoriteMetadata as modelMetadata, FavoriteMetadata } from '@/db/models/favorite';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NewFavoritePage = () => {
    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/api/favorites/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            router.push('/favorites');
        } else {
            const error = await response.json();

            alert(`There was a problem creating your favorite. ${error.message}`);
        }
    }

    return (
        <main className="container mx-auto mt-28 flex min-h-screen px-5">
            <div className="mx-auto w-full md:w-2/3">
                <h1 className="text-4xl font-bold">New favorite</h1>

                <form onSubmit={onSubmit}>
                    {(Object.keys(modelMetadata) as Array<keyof FavoriteMetadata>).map(key => {
                        if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                            if (modelMetadata[key].inputType === 'text') {
                                return (
                                    <div key={key} className="my-5">
                                        <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                        <input
                                            name={key}
                                            type="text"
                                            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 shadow outline-none"
                                        />
                                    </div>
                                );
                            }

                            if (modelMetadata[key].inputType === 'textarea') {
                                return (
                                    <div key={key} className="my-5">
                                        <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                        <textarea
                                            name={key}
                                            rows={4}
                                            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 shadow outline-none"
                                        />
                                    </div>
                                );
                            }

                            if (modelMetadata[key].inputType === 'number') {
                                return (
                                    <div key={key} className="my-5">
                                        <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                        <input
                                            name={key}
                                            type="number"
                                            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 shadow outline-none"
                                        />
                                    </div>
                                );
                            }

                            if (modelMetadata[key].inputType === 'email') {
                                return (
                                    <div key={key} className="my-5">
                                        <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                        <input
                                            name={key}
                                            type="email"
                                            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 shadow outline-none"
                                        />
                                    </div>
                                );
                            }

                            if (modelMetadata[key].inputType === 'password') {
                                return (
                                    <div key={key} className="my-5">
                                        <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                        <input
                                            name={key}
                                            type="password"
                                            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 shadow outline-none"
                                        />
                                    </div>
                                );
                            }

                            if (modelMetadata[key].inputType === 'checkbox') {
                                return (
                                    <div key={key} className="my-5">
                                        <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                );
                            }

                            if (modelMetadata[key].inputType === 'date') {
                                return (
                                    <div key={key} className="my-5">
                                        <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                        <input
                                            type="date"
                                            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 shadow outline-none"
                                        />
                                    </div>
                                );
                            }
                        }
                    })}
                    <div className="inline">
                        <button
                            type="submit"
                            className="inline-block cursor-pointer rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
                        >
                            Create favorite
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

export default NewFavoritePage;
