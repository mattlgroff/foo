export interface User {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserMetadata {
    id: { label: string };
    name: { label: string; inputType: string };
    email: { label: string; inputType: string };
    created_at: { label: string };
    updated_at: { label: string };
}

export const userMetadata: UserMetadata = {
    id: { label: 'ID' },
    name: { label: 'Name', inputType: 'text' },
    email: { label: 'Email', inputType: 'email' },
    created_at: { label: 'Created At' },
    updated_at: { label: 'Updated At' },
};
