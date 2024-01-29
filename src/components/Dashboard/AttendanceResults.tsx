import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StaffAttendanceResultProps } from '@types';

import { BoxWithUnderLine } from '../Common';

import { formatDateToMobileAppFormatString } from '@utils';

type AttendanceResultsProps = {
    attendanceResults: StaffAttendanceResultProps[];
    handleSetAttendanceResultDates: (action: 'forward' | 'backward') => void;
};

type GraphProps = {
    date: string;
    percentage: number;
};

const Bar = ({ date, percentage }: GraphProps) => {
    return (
        <View className="flex h-full w-1/5 flex-col items-center justify-between">
            <View className="flex h-[90%] w-full flex-col justify-end rounded-xl bg-zinc-200">
                <View
                    // className={`h-[${percentage}%] w-full bg-[#333D55] ${percentage === 100 ? 'rounded-xl' : 'rounded-b-xl'}`}
                    className={`w-full bg-[#333D55] ${percentage === 100 ? 'rounded-xl' : 'rounded-b-xl'}`}
                    style={{
                        height: `${percentage}%`,
                    }}
                />
            </View>
            <Text className="text-[10px] font-light">{date}</Text>
        </View>
    );
};

const calculatePercentageForADate = (
    data: StaffAttendanceResultProps[]
): number => {
    const valuesArr = data.map((i) => i.attendance_status);
    const countOfNonNullValues = valuesArr.filter(
        (value) => value !== null
    ).length;

    return (countOfNonNullValues / valuesArr.length) * 100;
};

const groupAttendanceResultsByDate = (
    attendanceResults: StaffAttendanceResultProps[]
): Record<string, StaffAttendanceResultProps[]> => {
    const groupedByDate: Record<string, StaffAttendanceResultProps[]> = {};

    attendanceResults.forEach((item) => {
        const date: string = item.schedule_instance.date;

        if (!groupedByDate[date]) {
            groupedByDate[date] = [];
        }

        groupedByDate[date].push(item);
    });

    return groupedByDate;
};

export const AttendanceResults = ({
    attendanceResults,
    handleSetAttendanceResultDates,
}: AttendanceResultsProps) => {
    const [graphValues, setGraphValues] = useState<GraphProps[]>([]);

    useEffect(() => {
        const data = groupAttendanceResultsByDate(attendanceResults);

        const resultArr: GraphProps[] = [];

        Object.entries(data).forEach(([key, value]) => {
            resultArr.push({
                date: formatDateToMobileAppFormatString(new Date(key)),
                percentage: calculatePercentageForADate(value),
            });
        });

        setGraphValues(resultArr);
    }, [attendanceResults]);

    return (
        <BoxWithUnderLine
            title="Attendance"
            children={
                <>
                    <View className="mb-6 flex w-full flex-row items-center justify-between">
                        <Text className="text-sm font-light">Results</Text>
                        <View className="flex flex-row items-center gap-6">
                            <TouchableOpacity
                                onPress={() =>
                                    handleSetAttendanceResultDates('backward')
                                }
                            >
                                <Text className="h-10 w-10 rounded-full border-2 border-gray-200 p-2 text-center">
                                    {'<'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                id="forward"
                                onPress={() =>
                                    handleSetAttendanceResultDates('forward')
                                }
                            >
                                <Text className="h-10 w-10 rounded-full border-2 border-gray-200 p-2 text-center">
                                    {'>'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex h-60 w-full flex-row justify-between">
                        {graphValues.slice(0, 4).map((item) => {
                            return (
                                <Bar
                                    key={item.date}
                                    percentage={item.percentage}
                                    date={item.date}
                                />
                            );
                        })}
                    </View>
                </>
            }
        />
    );
};
