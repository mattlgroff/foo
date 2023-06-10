export interface Post {
    id: string;
    title: string;
    body: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface PostMetadata {
    id: { label: string };
    title: { label: string; inputType: string };
    body: { label: string; inputType: string };
    user_id: { label: string; inputType: string };
    created_at: { label: string };
    updated_at: { label: string };
}

export const postMetadata: PostMetadata = {
    id: { label: 'ID' },
    title: { label: 'Title', inputType: 'text' },
    body: { label: 'Body', inputType: 'textarea' },
    user_id: { label: 'User Id', inputType: 'text' },
    created_at: { label: 'Created At' },
    updated_at: { label: 'Updated At' },
};
