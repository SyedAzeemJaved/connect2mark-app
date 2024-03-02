import { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { ApiContext, AuthContext } from '@contexts';

import {
  ApiContextProps,
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
  const { attendanceResultUrl, markAttendanceUrl } = useContext(
    ApiContext
  ) as ApiContextProps;
  const { user, handleLogout } = useContext(AuthContext) as UserContextProps;

  const getLocation = useLocation();
  const getDevices = useBluetooth();

  const {
    classesToday,
    handleSetClassesToday,
    currentClass,
    handleSetCurrentClass,
  } = useClassesToday();

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
          start_date: daysFromDate(attendanceResultDates.start_date, -1),
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
          start_date: daysFromDate(attendanceResultDates.start_date, +1),
          end_date: daysFromDate(attendanceResultDates.end_date, +1),
        });
      }
    },
    [attendanceResultDates]
  );

  // SET INTERVAL
  useEffect(() => {
    // console.log('Classes changed so I am running');

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
      // console.log('Attendance results executed');

      try {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${user.token}`);
        headers.append('accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const apiResponse = await fetch(attendanceResultUrl, {
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

  // ATTENDANCE BASED ON CURRENT CLASS
  useEffect(() => {
    (async () => {
      // console.log('Trying to mark attendance');

      // Return if there is no class
      if (!currentClass) {
        // console.log('No class`');
        return;
      }

      // Return if attendance has already been marked
      if (currentClass.attendance_status) {
        // console.log('Attendance has already been marked');
        return;
      }

      // Return if class is not 'current', could be 'next' as well
      if (currentClass.class_status !== 'current') {
        // console.log('Class is not current');
        return;
      }

      try {
        const btDevices = await getDevices();
        const location = await getLocation();

        // if (
        //     !btDevices.includes(
        //         currentClass.schedule_instance.location
        //             .bluetooth_address
        //     )
        // ) {
        //     console.log('Bluetooth address does not match');
        //     return;
        // }

        // if (!location.coords.latitude) {
        //     console.log('Coordinates do not match');
        //     return;
        // }

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${user.token}`);
        headers.append('accept', 'application/json');

        const apiResponse = await fetch(
          markAttendanceUrl + `/${currentClass.schedule_instance.id}`,
          {
            method: 'POST',
            headers,
          }
        );

        const res = await apiResponse.json();

        if (!apiResponse.ok) throw new Error(res?.detail);

        handleSetCurrentClass({
          attendance_status: res.attendance_status,
          created_at_in_utc: res.created_at_in_utc,
        });

        ShowToast({
          type: 'success',
          heading: 'Success',
          desc: 'Attendance marked successfully',
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
  }, [currentClass]);

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
              <Text className="mr-1 text-sm text-black">Change account?</Text>
              <Link title={'Logout'} handlePress={handleLogout} />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              (async () => {
                await getDevices()
                  .then((resolve) => {
                    console.log(resolve);
                  })
                  .catch((err) => console.log(err));
              })();
            }}
          >
            <View className="mb-6 flex h-16 w-24 flex-col items-center justify-center rounded-2xl bg-red-300">
              <Text>Bluetooth</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AndroidSafeView>
  );
};
