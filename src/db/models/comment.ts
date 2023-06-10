export interface Comment {
    id: string;
    text: string;
    user_id: string;
    post_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface CommentMetadata {
    id: { label: string };
    text: { label: string; inputType: string };
    user_id: { label: string; inputType: string };
    post_id: { label: string; inputType: string };
    created_at: { label: string };
    updated_at: { label: string };
}

export const commentMetadata: CommentMetadata = {
    id: { label: 'ID' },
    text: { label: 'Text', inputType: 'text' },
    user_id: { label: 'User Id', inputType: 'text' },
    post_id: { label: 'Post Id', inputType: 'text' },
    created_at: { label: 'Created At' },
    updated_at: { label: 'Updated At' },
};
