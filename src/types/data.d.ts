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

    hasSeenWelcome: boolean;
    isAuthenticated: boolean;
    token: string | null;
};

export type LocationProps = {
    coords: {
        accuracy: number | null;
        altitude: number | null;
        altitudeAccuracy: number | null;
        heading: number | null;
        latitude: number;
        longitude: number;
        speed: number | null;
    };
    mocked?: boolean | undefined;
    timestamp: number;
};
