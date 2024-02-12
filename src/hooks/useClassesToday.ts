import { useEffect, useState, useContext } from 'react';

import { ApiContext, AuthContext } from '@contexts';

import {
    ApiContextProps,
    UserContextProps,
    StaffAttendanceResultProps,
    StaffAttendanceResultPropsWithClassStatusForTodayClasses,
} from '@types';

import { ShowToast } from '@components';

import {
    formatDateToApiFormatString,
    convertToDateFromTime,
    returnClassStatus,
} from '@utils';

export const useClassesToday = () => {
    const { attendanceResultUrl } = useContext(ApiContext) as ApiContextProps;
    const { user } = useContext(AuthContext) as UserContextProps;

    const [classesToday, setClassesToday] = useState<
        StaffAttendanceResultProps[]
    >([]);
    const [currentClass, setCurrentClass] =
        useState<StaffAttendanceResultPropsWithClassStatusForTodayClasses | null>(
            null
        );

    const today = new Date();

    const handleSetClassesToday = (
        allClassesToday: StaffAttendanceResultProps[]
    ) => {
        const allClassesTodayWithStatus: StaffAttendanceResultPropsWithClassStatusForTodayClasses[] =
            allClassesToday.map((item) => {
                const startDateTime = convertToDateFromTime(
                    item.schedule_instance.start_time_in_utc
                );
                const endDateTime = convertToDateFromTime(
                    item.schedule_instance.end_time_in_utc
                );

                // console.log({
                //     start: startDateTime,
                //     end: endDateTime,
                //     class_status: returnClassStatus(startDateTime, endDateTime),
                // });

                return {
                    ...item,
                    class_status: returnClassStatus(startDateTime, endDateTime),
                };
            });

        setClassesToday(allClassesToday);
        setCurrentClass(
            allClassesTodayWithStatus.find(
                (c) => c.class_status === 'current'
            ) ??
                allClassesTodayWithStatus.find(
                    (c) => c.class_status === 'next'
                ) ??
                null
        );
    };

    const handleSetCurrentClass = ({
        attendance_status,
        created_at_in_utc,
    }: {
        attendance_status: StaffAttendanceResultPropsWithClassStatusForTodayClasses['attendance_status'];
        created_at_in_utc: StaffAttendanceResultPropsWithClassStatusForTodayClasses['created_at_in_utc'];
    }) => {
        setCurrentClass((prev) => {
            if (prev) {
                return {
                    ...prev,
                    attendance_status: attendance_status,
                    created_at_in_utc: created_at_in_utc,
                };
            }
            return prev;
        });
    };

    useEffect(() => {
        (async () => {
            console.log('I have been executed again, which is a big NO NO');

            try {
                const headers = new Headers();
                headers.append('Authorization', `Bearer ${user.token}`);
                headers.append('accept', 'application/json');
                headers.append('Content-Type', 'application/json');

                const apiResponse = await fetch(attendanceResultUrl, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        start_date: formatDateToApiFormatString(today),
                        end_date: formatDateToApiFormatString(today),
                    }),
                });

                const res = await apiResponse.json();

                if (!apiResponse.ok) throw new Error(res?.detail);

                handleSetClassesToday(res.items);

                ShowToast({
                    type: 'success',
                    heading: 'Success',
                    desc: 'Classes fetched successfully',
                });
            } catch (err: any) {
                ShowToast({
                    type: 'error',
                    heading: 'Oops',
                    desc:
                        (typeof err?.message === 'string' && err?.message) ||
                        'Something went wrong',
                });
            }
        })();
    }, []);

    return {
        classesToday,
        handleSetClassesToday,
        currentClass,
        handleSetCurrentClass,
    };
};
