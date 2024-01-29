import { View, Text, Image, ImageSourcePropType } from 'react-native';

import { ScheduleInstanceProps } from '@types';

import { BoxWithUnderLine, CircleSvg } from '../Common';

const LocationIcon = require('../../../assets/images/location.png');
const TimeIcon = require('../../../assets/images/time.png');

type ClassSchedulesProps = {
    totalClassesCount: number;
    totalCompletedCount: number;
};

type ItemWithIconProps = {
    text: string;
    icon: ImageSourcePropType;
};

const ItemWithIcon = ({ text, icon }: ItemWithIconProps) => {
    return (
        <View className="mt-2 flex flex-row items-center">
            <Image className="h-3 w-3" resizeMode="contain" source={icon} />
            <Text className="ml-4 text-xs text-zinc-700">{text}</Text>
        </View>
    );
};

export const ClassSchedules = ({
    totalClassesCount,
    totalCompletedCount,
}: ClassSchedulesProps) => {
    return (
        <View className="flex flex-row items-stretch justify-between space-x-6">
            <View className="flex-1">
                <BoxWithUnderLine
                    title={'Today'}
                    children={
                        <>
                            <View className="relative flex flex-col items-center justify-center">
                                <CircleSvg
                                    percentage={
                                        (totalCompletedCount /
                                            totalClassesCount) *
                                        100
                                    }
                                />
                                <View className="absolute">
                                    <Text className="text-lg font-bold text-zinc-600">
                                        {totalCompletedCount.toString()}
                                    </Text>
                                </View>
                            </View>
                            <Text className="mt-2 text-center text-xs text-zinc-600">
                                {`${totalCompletedCount.toString()} out of ${totalClassesCount.toString()}`}
                            </Text>
                        </>
                    }
                />
            </View>

            <View className="flex-1">
                <BoxWithUnderLine
                    title={'Next Class'}
                    children={
                        <>
                            <View className="flex flex-col">
                                <Text className="mb-2 text-sm text-zinc-700">
                                    Object Oriented Programming
                                </Text>
                                <ItemWithIcon
                                    text="Room GT-05"
                                    icon={LocationIcon}
                                />
                                <ItemWithIcon
                                    text="09:00 - 11:00"
                                    icon={TimeIcon}
                                />
                            </View>
                        </>
                    }
                />
            </View>
        </View>
    );
};
