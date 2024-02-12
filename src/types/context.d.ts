import { UserProps } from './data';

export interface UserContextProps {
    user: UserProps;
    handleUser: (user: UserProps) => void;
    handleLogout: () => void;
}

export interface RouteProps {
    loginUrl: string;
    userMeUrl: string;
    // classesTodayUrl: string;
    markAttendanceUrl: string;
    attendanceResultUrl: string;
}

export interface ApiContextProps extends RouteProps {
    handleHost: (host: string) => void;
}
