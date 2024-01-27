import { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { AuthContext } from '@contexts';
import { UserContextProps } from '@types';

import {
    AndroidSafeView,
    PrimaryButton,
    Link,
    StaffDetails,
    ClassSchedules,
    AttendanceResults,
} from '@components';

// import { useBluetooth, useLocation } from '@hooks';

export const DashboardScreen = () => {
    const { user, handleLogout } = useContext(AuthContext) as UserContextProps;
    // const location = useLocation();
    // const btList = useBluetooth();

    // console.log(location, btList);

    useEffect(() => {
        console.log('I have been executed again, which is a big NO NO');
    }, []);

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
                        <ClassSchedules />
                    </View>
                    <View className="w-full">
                        <AttendanceResults />
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
