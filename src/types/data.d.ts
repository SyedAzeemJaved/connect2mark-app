export type UserProps = {
    id: number;
    full_name: string;
    email: string;
    additional_details: {
        phone: string | null;
        department: 'not_specified';
        designation: 'not_specified';
    };
    created_at_in_utc: string;
    updated_at_in_utc: string | null;

    isAuthenticated: boolean;
    token: string | null;
};
