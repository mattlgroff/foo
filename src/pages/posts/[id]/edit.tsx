import { GetServerSideProps } from 'next';
import { Post, postMetadata as modelMetadata, PostMetadata } from '@/db/models/post';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getKnex } from '@/db';

interface EditPostPageProps {
    post: Post;
}

const EditPostPage = ({ post }: EditPostPageProps) => {
    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`/api/posts/update/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            router.push('/posts');
        } else {
            const error = await response.json();

            alert(`There was a problem updating your post. ${error.message}`);
        }
    }

    return (
        <main className="container mx-auto mt-28 flex min-h-screen px-5">
            <div className="mx-auto w-full md:w-2/3">
                <h1 className="text-4xl font-bold">Edit post</h1>

                <form onSubmit={onSubmit}>
                {(Object.keys(modelMetadata) as Array<keyof PostMetadata>).map(key => {
                  // Omitted 'id' field for editing as it should not be changed
                  if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                      // Omitted input elements are similar to NewPostPage, but include 'defaultValue' props for pre-fill
                      if (modelMetadata[key].inputType === 'text') {
                          return (
                              <div key={key} className="my-5">
                                  <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                  <input
                                      name={key}
                                      type="text"
                                      defaultValue={post[key] as string}
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
                                      defaultValue={post[key] as string}
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
                                      defaultValue={post[key] as number}
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
                                      defaultValue={post[key] as string}
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
                                      name={key}
                                      type="checkbox"
                                      defaultChecked={post[key] as boolean}
                                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                  />
                              </div>
                          );
                      }
                      if (modelMetadata[key].inputType === 'date') {
                          return (
                              <div key={key} className="my-5">
                                  <label className="mb-2 block font-bold text-gray-700">{modelMetadata[key].label}</label>
                                  <input
                                      name={key}
                                      type="date"
                                      defaultValue={post[key] as string}
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
                            Update post
                        </button>
                    </div>
                </form>

                <Link href="/posts" className="ml-2 inline-block rounded-lg bg-gray-100 px-5 py-3 font-medium">
                    Back to posts
                </Link>
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

export default EditPostPage;
