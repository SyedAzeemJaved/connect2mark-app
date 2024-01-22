import { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
} from 'react-native';

import { AuthContext } from '@contexts';
import { UserContextProps } from '@types';

import { AndroidSafeView, PrimaryButton } from '@components';

import * as Location from 'expo-location';

export const DashboardScreen = () => {
    const { user, handleLogout } = useContext(AuthContext) as UserContextProps;

    // const [location, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setLocation(location);
    //     })();
    // }, []);
    // console.log(location);

    return (
        <AndroidSafeView>
            <ScrollView className="h-full w-full bg-[#F9F9F9]">
                <View className="flex w-full flex-col items-center px-5 py-5">
                    {/* Account Card component start */}
                    <View className="flex h-60 w-full flex-col items-center justify-center rounded-xl bg-white p-3">
                        <Image
                            source={require('../../assets/images/ssuet-logo.png')}
                            resizeMode="contain"
                            className="h-24 w-24 drop-shadow-2xl"
                        />
                        <Text className="pt-2 font-poppins text-[24px] font-semibold">
                            {user.full_name}
                        </Text>
                        <Text className="-mt-3 font-poppins text-[16px] font-light text-[#606060]">
                            {user?.additional_details?.department ?? 'Teacher'}
                        </Text>
                    </View>
                    <View className="mt-8 flex w-full flex-row items-center justify-between">
                        <View className="flex h-52 w-[45%] flex-col justify-between rounded-xl  bg-white  p-4">
                            <View>
                                <Text className="text-[24px] font-semibold">
                                    Today
                                </Text>
                                <View className="mt-1 h-[2px] w-full rounded-full bg-zinc-600" />
                            </View>
                            <View className="relative mt-4 flex w-full flex-col items-center justify-center">
                                <Image
                                    source={require('../../assets/images/Circle.png')}
                                    resizeMode="cover"
                                    className="h-20 w-20"
                                />
                                <View className="absolute">
                                    <Text className="text-lg font-bold text-zinc-600">
                                        04
                                    </Text>
                                </View>
                            </View>
                            <View className="mt-2 flex w-full items-center">
                                <Text className="font-semibold text-zinc-600">
                                    3 Out of 4
                                </Text>
                            </View>
                        </View>

                        <View className="flex h-52 w-[45%] items-center rounded-xl bg-white p-4">
                            <View className="w-full">
                                <Text className="text-[24px] font-semibold">
                                    Next Class
                                </Text>
                                <View className="mt-1 h-[2px] w-full rounded-full bg-zinc-600" />
                            </View>
                            <View className="mt-4 flex w-full flex-col">
                                <Text className="font-semibold text-zinc-700">
                                    Object Oriented Programming
                                </Text>
                                <View className="mt-2 flex flex-row items-center">
                                    <Image
                                        className="h-4 w-4"
                                        resizeMode="contain"
                                        source={require('../../assets/images/location.png')}
                                    />
                                    <Text className="ml-2 text-zinc-700">
                                        Room GT-05
                                    </Text>
                                </View>
                                <View className="mt-2 flex flex-row items-center">
                                    <Image
                                        className="h-4 w-4"
                                        resizeMode="contain"
                                        source={require('../../assets/images/time.png')}
                                    />
                                    <Text className="ml-2 text-zinc-700">
                                        9:00 am - 11:00 am
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="mt-10 flex h-[40rem] w-full flex-col rounded-xl bg-white p-4">
                        <View className="w-full">
                            <Text className="text-[24px] font-semibold">
                                Attendance
                            </Text>
                            <View className="mt-1 h-[2px] w-full rounded-full bg-zinc-600" />
                        </View>
                        <View className="mt-4 flex w-full flex-row items-center justify-between">
                            <View className="flex h-12 w-1/2 flex-row items-center justify-between  rounded-md border-2 border-gray-200 px-2">
                                <Text className="font-semibold text-zinc-600">
                                    August
                                </Text>
                                <Text className="rotate-90 text-xl">{'>'}</Text>
                            </View>
                            <View className="flex flex-row items-center gap-2">
                                <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200">
                                    <Text className="text-xl">{'<'}</Text>
                                </View>
                                <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200">
                                    <Text className="text-xl">{'>'}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="mt-4 flex w-full flex-row items-center">
                            <View className="flex h-60 w-20 flex-col justify-end bg-zinc-200">
                                <View className="h-[10%] w-full bg-[#333D55]"></View>
                            </View>
                            <View className="ml-2 flex h-60 w-20 flex-col justify-end bg-zinc-200">
                                <View className="h-[20%] w-full bg-[#333D55]"></View>
                            </View>
                            <View className="ml-2 flex h-60 w-20 flex-col justify-end bg-zinc-200">
                                <View className="h-[30%] w-full bg-[#333D55]"></View>
                            </View>
                            <View className="ml-2 flex h-60 w-20 flex-col justify-end bg-zinc-200">
                                <View className="h-[45%] w-full bg-[#333D55]"></View>
                            </View>
                        </View>
                    </View>
                    <View className="w-full">
                        <PrimaryButton
                            title={'Logout'}
                            handlePress={handleLogout}
                        />
                    </View>
                </View>
            </ScrollView>
        </AndroidSafeView>
    );
};
