export interface Favorite {
    id: string;
    name: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface FavoriteMetadata {
    id: { label: string };
    name: { label: string; inputType: string };
    user_id: { label: string; inputType: string };
    created_at: { label: string };
    updated_at: { label: string };
}

export const favoriteMetadata: FavoriteMetadata = {
    id: { label: 'ID' },
    name: { label: 'Name', inputType: 'text' },
    user_id: { label: 'User Id', inputType: 'text' },
    created_at: { label: 'Created At' },
    updated_at: { label: 'Updated At' },
};
