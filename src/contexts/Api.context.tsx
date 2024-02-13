import { createContext, useState, useCallback } from 'react';

import { ApiContextProps, RouteProps } from '@types';

export const ApiContext = createContext<ApiContextProps | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [routes, setRoutes] = useState<RouteProps>({
        loginUrl: '',
        userMeUrl: '',
        // classesTodayUrl: '',
        markAttendanceUrl: '',
        attendanceResultUrl: '',
    });

    const handleHost = useCallback((host: string) => {
        setRoutes({
            loginUrl: `${host}/token`,
            userMeUrl: `${host}/common/me`,
            // classesTodayUrl: `${host}/staff/schedule-instances/today?page=1&size=50`
            markAttendanceUrl: `${host}/staff/attendance/mark`,
            attendanceResultUrl: `${host}/staff/attendance-result`,
        });
    }, []);

    return (
        <ApiContext.Provider
            value={{
                handleHost,
                loginUrl: routes.loginUrl,
                userMeUrl: routes.userMeUrl,
                markAttendanceUrl: routes.markAttendanceUrl,
                attendanceResultUrl: routes.attendanceResultUrl,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};
