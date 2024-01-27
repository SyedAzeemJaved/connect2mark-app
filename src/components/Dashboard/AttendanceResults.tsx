import { View, Text, TouchableOpacity } from 'react-native';

import { BoxWithUnderLine } from '../Common';

type GraphProps = {
    percentages: [number, number, number, number];
    dates: [string, string, string, string];
};

const Bar = ({ percentage, date }: { percentage: number; date: string }) => {
    return (
        <View className="flex h-full w-1/5 flex-col items-center justify-between">
            <View className="flex h-[90%] w-full flex-col justify-end rounded-xl bg-zinc-200">
                <View
                    className={`h-[${percentage}%] w-full bg-[#333D55] ${percentage === 100 ? 'rounded-xl' : 'rounded-b-xl'}`}
                />
            </View>
            <Text className="text-xs font-light">{date}</Text>
        </View>
    );
};

const Graph = ({ percentages, dates }: GraphProps) => {
    return (
        <View className="flex h-60 w-full flex-row justify-between">
            <Bar percentage={percentages[0]} date={dates[0]} />
            <Bar percentage={percentages[1]} date={dates[1]} />
            <Bar percentage={percentages[2]} date={dates[2]} />
            <Bar percentage={percentages[3]} date={dates[3]} />
        </View>
    );
};

export const AttendanceResults = () => {
    return (
        <BoxWithUnderLine
            title="Attendance"
            children={
                <>
                    <View className="mb-6 flex w-full flex-row items-center justify-between">
                        <Text className="text-sm font-light">January</Text>
                        <View className="flex flex-row items-center gap-6">
                            <TouchableOpacity>
                                <Text className="h-10 w-10 rounded-full border-2 border-gray-200 p-2 text-center">
                                    {'<'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text className="h-10 w-10 rounded-full border-2 border-gray-200 p-2 text-center">
                                    {'>'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Graph
                        percentages={[50, 60, 70, 100]}
                        dates={['01/01/24', '02/01/24', '03/01/24', '04/01/24']}
                    />
                </>
            }
        />
    );
};
