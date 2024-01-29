import { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { api } from '@constants';

import { AuthContext } from '@contexts';
import {
    UserContextProps,
    ScheduleInstanceProps,
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

// import { useBluetooth, useLocation } from '@hooks';

import { formatDateToApiFormatString } from '@utils';

export const DashboardScreen = () => {
    const { user, handleLogout } = useContext(AuthContext) as UserContextProps;
    // const location = useLocation();
    // const btList = useBluetooth();

    const today = new Date();
    const [classesToday, setClassesToday] = useState<ScheduleInstanceProps[]>(
        []
    );
    const [attendanceResults, setAttendanceResults] = useState<
        StaffAttendanceResultProps[]
    >([]);
    const [attendanceResultDates, setAttendanceResultDates] =
        useState<AttendanceDatesProps>({
            // 86400000 - number of milliseconds in a day
            start_date: new Date(today.getTime() - 3 * 86400000),
            end_date: today,
        });

    const handleChangeDate = useCallback(
        (action: 'forward' | 'backward') => {
            if (action === 'backward') {
                setAttendanceResultDates({
                    start_date: new Date(
                        attendanceResultDates.start_date.getTime() -
                            1 * 86400000
                    ),
                    end_date: new Date(
                        attendanceResultDates.end_date.getTime() - 1 * 86400000
                    ),
                });
            } else {
                const checkDate = new Date(
                    attendanceResultDates.end_date.getTime() + 1 * 86400000
                );
                console.log('i am here');
                if (today.getTime() < checkDate.getTime()) {
                    ShowToast({
                        type: 'error',
                        heading: 'Oops',
                        desc: 'Date can not be greater than today',
                    });
                    return;
                }
                setAttendanceResultDates({
                    start_date: new Date(
                        attendanceResultDates.start_date.getTime() +
                            1 * 86400000
                    ),
                    end_date: new Date(
                        attendanceResultDates.end_date.getTime() + 1 * 86400000
                    ),
                });
            }
        },
        [attendanceResultDates]
    );

    // Agar chal raha ho toh condition laga dena
    // Waise nahe chalna chahiye
    useEffect(() => {
        (async () => {
            console.log('I have been executed again, which is a big NO NO');

            try {
                const headers = new Headers();
                headers.append('Authorization', `Bearer ${user.token}`);
                headers.append('accept', 'application/json');

                const apiResponse = await fetch(api.USERME, {
                    method: 'GET',
                    headers,
                });

                const res = await apiResponse.json();

                if (!apiResponse.ok) throw new Error(res?.detail);

                setClassesToday(res.items);

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

    // Attendance Results
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
                            totalClassesCount={4}
                            totalCompletedCount={2}
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
                            <Link title={'Logout'} handlePress={handleLogout} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </AndroidSafeView>
    );
};
