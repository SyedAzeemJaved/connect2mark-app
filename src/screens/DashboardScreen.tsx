import { useContext, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { AuthContext } from '@contexts';

import { constants } from '@constants';

import { UserContextProps } from '@types';

import {
  AndroidSafeView,
  Link,
  StaffDetails,
  ClassSchedules,
  AttendanceResults,
  ShowToast,
} from '@components';

import { useBluetooth, useLocation, useClassesToday } from '@hooks';

import { distanceInMeters } from '@utils';

export const DashboardScreen = () => {
  const { user, handleLogout } = useContext(AuthContext) as UserContextProps;

  const getLocation = useLocation();
  const getDevices = useBluetooth();

  const {
    classesToday,
    handleSetClassesToday,
    currentClass,
    handleSetCurrentClass,
    fetchClassesToday,
  } = useClassesToday();

  // SET INTERVAL
  // Continuously check against class timings
  // Needs to be done to check if class status
  useEffect(() => {
    const interval = setInterval(() => {
      handleSetClassesToday(classesToday);
    }, 30000);

    // Clearing the interval
    return () => clearTimeout(interval);
  }, [classesToday]);

  useEffect(() => {
    (async () => {
      try {
        if (!currentClass) {
          // console.log('No class');
          return;
        }

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${user.token}`);
        headers.append('accept', 'application/json');

        const res = await fetch(
          constants.MARK_ATTENDANCE_TRACKING +
            `/${currentClass.schedule_instance.id}`,
          {
            method: 'POST',
            headers,
          }
        );

        if (!res.ok) {
          s;
          throw new Error('Can not mark tracking result');
        }

        ShowToast({
          type: 'success',
          heading: 'Success',
          desc: 'Tracking attendance successfully',
        });
      } catch (err: unknown) {}
    })();
  }, [currentClass]);

  // ATTENDANCE BASED ON CURRENT CLASS
  useEffect(() => {
    (async () => {
      // Return if there is no class
      if (!currentClass) {
        // console.log('No class');
        return;
      }

      // Return if class is not 'current', could be 'next' as well
      if (currentClass.class_status !== 'current') {
        // console.log('Class is not current');
        return;
      }

      // Return if attendance has already been marked
      if (currentClass.attendance_status !== null) {
        // console.log('Attendance has already been marked');
        return;
      }

      try {
        const bleDevices = await getDevices();
        const location = await getLocation();

        if (!location.coords.latitude || !location.coords.longitude) {
          return;
        }

        const distance = distanceInMeters(
          parseFloat(
            currentClass.schedule_instance.location.coordinates.split(',')[0] ??
              0
          ),
          parseFloat(
            currentClass.schedule_instance.location.coordinates.split(',')[1] ??
              0
          ),
          location.coords.latitude,
          location.coords.longitude
        );

        if (
          bleDevices.includes(
            currentClass.schedule_instance.location.bluetooth_address
          ) &&
          distance <= 5
        ) {
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${user.token}`);
          headers.append('accept', 'application/json');

          // await fetch(
          //   constants.MARK_ATTENDANCE_TRACKING +
          //     `/${currentClass.schedule_instance.id}`,
          //   {
          //     method: 'POST',
          //     headers,
          //   }
          // );

          const apiResponse = await fetch(
            constants.MARK_ATTENDANCE + `/${currentClass.schedule_instance.id}`,
            {
              method: 'POST',
              headers,
            }
          );

          const res = await apiResponse.json();

          if (!apiResponse.ok) {
            throw new Error(res?.detail);
          }

          handleSetCurrentClass({
            attendance_status: res.attendance_status,
            created_at_in_utc: res.created_at_in_utc,
          });

          fetchClassesToday();

          ShowToast({
            type: 'success',
            heading: 'Success',
            desc: 'Attendance marked successfully',
          });
        }
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
            <AttendanceResults classesToday={classesToday} />
          </View>
          <View className="mb-6 w-full">
            <View className="flex flex-row items-end justify-center">
              <Text className="mr-1 text-sm text-black">Change account?</Text>
              <Link title={'Logout'} handlePress={handleLogout} />
            </View>
          </View>
        </View>
      </ScrollView>
    </AndroidSafeView>
  );
};
