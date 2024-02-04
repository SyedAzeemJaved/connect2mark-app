import { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { api } from '@constants';

import { AuthContext } from '@contexts';
import {
    UserContextProps,
    AttendanceDatesProps,
    StaffAttendanceResultProps,
} from '@types';

import {
    AndroidSafeView,
    Link,
    StaffDetails,
    ClassSchedules,
    AttendanceResults,
    ShowToast,
} from '@components';

import { useBluetooth, useLocation, useClassesToday } from '@hooks';

import {
    daysFromToday,
    daysFromDate,
    formatDateToApiFormatString,
} from '@utils';

export const DashboardScreen = () => {
    const { user, handleLogout } = useContext(AuthContext) as UserContextProps;
    const getLocation = useLocation();
    const getDevices = useBluetooth();

    const { classesToday, handleSetClassesToday, currentClass } =
        useClassesToday();

    const today = new Date();

    const [attendanceResults, setAttendanceResults] = useState<
        StaffAttendanceResultProps[]
    >([]);
    const [attendanceResultDates, setAttendanceResultDates] =
        useState<AttendanceDatesProps>({
            start_date: daysFromToday(-3),
            end_date: today,
        });

    const handleChangeDate = useCallback(
        (action: 'forward' | 'backward') => {
            if (action === 'backward') {
                setAttendanceResultDates({
                    start_date: daysFromDate(
                        attendanceResultDates.start_date,
                        -1
                    ),
                    end_date: daysFromDate(attendanceResultDates.end_date, -1),
                });
            } else {
                if (
                    today.getTime() <=
                    daysFromDate(attendanceResultDates.end_date, +1).getTime()
                ) {
                    ShowToast({
                        type: 'error',
                        heading: 'Oops',
                        desc: 'Date can not be greater than today',
                    });
                    return;
                }
                setAttendanceResultDates({
                    start_date: daysFromDate(
                        attendanceResultDates.start_date,
                        +1
                    ),
                    end_date: daysFromDate(attendanceResultDates.end_date, +1),
                });
            }
        },
        [attendanceResultDates]
    );

    // SET INTERVAL
    useEffect(() => {
        console.log('Classes changed so I am running');

        // Setting the interval
        const interval = setInterval(() => {
            handleSetClassesToday(classesToday);
        }, 30000);

        // Clearing the interval
        return () => clearTimeout(interval);
    }, [classesToday]);

    // ATTENDANCE RESULT
    useEffect(() => {
        (async () => {
            console.log('Attendance results executed');

            try {
                const headers = new Headers();
                headers.append('Authorization', `Bearer ${user.token}`);
                headers.append('accept', 'application/json');
                headers.append('Content-Type', 'application/json');

                const apiResponse = await fetch(api.ATTENDANCE_RESULT, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        start_date: formatDateToApiFormatString(
                            attendanceResultDates.start_date
                        ),
                        end_date: formatDateToApiFormatString(
                            attendanceResultDates.end_date
                        ),
                    }),
                });

                const res = await apiResponse.json();
                if (!apiResponse.ok) throw new Error(res?.detail);

                setAttendanceResults(res.items);
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
    }, [attendanceResultDates]);

    // const test = async () => {
    //     getDevices()
    //         .then((devices) => {
    //             console.log(devices);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    return (
        <AndroidSafeView>
            <ScrollView>
                <View className="mx-6 flex flex-col items-center space-y-6">
                    <View className="mt-6 w-full">
                        <StaffDetails
                            full_name={user.full_name}
                            email={user.email}
                            designation={user.additional_details.designation}
                            department={user.additional_details.department}
                        />
                    </View>
                    <View className="w-full">
                        <ClassSchedules
                            classesToday={classesToday}
                            currentClass={currentClass}
                        />
                    </View>
                    <View className="w-full">
                        <AttendanceResults
                            attendanceResults={attendanceResults}
                            handleSetAttendanceResultDates={handleChangeDate}
                        />
                    </View>
                    <View className="mb-6 w-full">
                        <View className="flex flex-row items-end justify-center">
                            <Text className="mr-1 text-sm text-black">
                                Change account?
                            </Text>
                            <Link title={'Logout'} handlePress={getLocation} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </AndroidSafeView>
    );
};
