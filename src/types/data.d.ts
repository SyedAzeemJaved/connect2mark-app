type BasicUserProps = {
    id: number;
    full_name: string;
    email: string;
    additional_details: {
        phone: string | null;
        department:
            | 'not_specified'
            | 'biomedical'
            | 'computer_science'
            | 'electronics'
            | 'software'
            | 'telecom';
        designation:
            | 'not_specified'
            | 'chairman'
            | 'professor'
            | 'associate_professor'
            | 'assistant_professor'
            | 'lecturer'
            | 'junior_lecturer'
            | 'visiting';
    };
    created_at_in_utc: string;
    updated_at_in_utc: string | null;
};

export type UserProps = BasicUserProps & {
    hasSeenWelcome: boolean;
    isAuthenticated: boolean;
    token: string | null;
};

export type DeviceLocationProps = {
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

export type LocationProps = {
    id: number;
    title: string;
    bluetooth_address: string;
    created_at_in_utc: string;
    updated_at_in_utc: string | null;
};

type ScheduleProps = {
    id: number;
    title: string;
    start_time_in_utc: string;
    end_time_in_utc: string;
    is_reoccurring: boolean;
    staff_member: BasicUserProps;
    location: LocationProps;
    date: string | null;
    day: string;
    created_at_in_utc: string;
    updated_at_in_utc: string | null;
};

type ScheduleInstanceProps = {
    id: number;
    date: string;
    start_time_in_utc: string;
    end_time_in_utc: string;
    schedule: ScheduleProps;
    staff_member: BasicUserProps;
    location: LocationProps;
    created_at_in_utc: string;
    updated_at_in_utc: string | null;
};

export type StaffAttendanceResultProps = {
    schedule_instance: ScheduleInstanceProps;
    attendance_status: 'present' | 'late' | null;
    created_at_in_utc: string | null;
};

export type StaffAttendanceResultPropsWithClassStatusForTodayClasses = {
    class_status: 'current' | 'next' | 'past';
} & StaffAttendanceResultProps;
