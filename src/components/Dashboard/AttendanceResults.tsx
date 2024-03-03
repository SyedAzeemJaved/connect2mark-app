import { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ApiContext, AuthContext } from '@contexts';

import {
  ApiContextProps,
  UserContextProps,
  StaffAttendanceResultProps,
  AttendanceDatesProps,
} from '@types';

import { BoxWithUnderLine } from '../Common/BoxWithUnderLine';
import { ShowToast } from '../Common/ShowToast';

import {
  daysFromToday,
  daysFromDate,
  formatDateToApiFormatString,
  formatDateToMobileAppFormatString,
} from '@utils';

type GraphProps = {
  date: string;
  percentage: number;
};

const today = new Date();

const Bar = ({ date, percentage }: GraphProps) => {
  return (
    <View className="flex h-full w-1/5 flex-col items-center justify-between">
      <View className="flex h-[90%] w-full flex-col justify-end rounded-xl bg-zinc-200">
        <View
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
  apiData: StaffAttendanceResultProps[]
): Record<string, StaffAttendanceResultProps[]> => {
  const groupedByDate: Record<string, StaffAttendanceResultProps[]> = {};

  apiData.forEach((item) => {
    const date: string = item.schedule_instance.date;

    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }

    groupedByDate[date].push(item);
  });

  return groupedByDate;
};

export const AttendanceResults = ({
  classesToday,
}: {
  classesToday: StaffAttendanceResultProps[];
}) => {
  const { attendanceResultUrl } = useContext(ApiContext) as ApiContextProps;
  const { user } = useContext(AuthContext) as UserContextProps;

  const [dates, setDate] = useState<AttendanceDatesProps>({
    start_date: daysFromToday(-3),
    end_date: today,
  });

  const [graphData, setGraphData] = useState<GraphProps[]>([]);

  const handleChangeDate = (action: 'forward' | 'backward') => {
    if (action === 'backward') {
      setDate({
        start_date: daysFromDate(dates.start_date, -1),
        end_date: daysFromDate(dates.end_date, -1),
      });
    } else {
      if (today.getTime() <= daysFromDate(dates.end_date, +1).getTime()) {
        ShowToast({
          type: 'error',
          heading: 'Oops',
          desc: 'Date can not be greater than today',
        });
        return;
      }
      setDate({
        start_date: daysFromDate(dates.start_date, +1),
        end_date: daysFromDate(dates.end_date, +1),
      });
    }
  };

  // Get API data when dates change
  useEffect(() => {
    (async () => {
      try {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${user.token}`);
        headers.append('accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const apiResponse = await fetch(attendanceResultUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            start_date: formatDateToApiFormatString(dates.start_date),
            end_date: formatDateToApiFormatString(dates.end_date),
          }),
        });

        const res = await apiResponse.json();
        if (!apiResponse.ok) throw new Error(res?.detail);

        const results = res.items;

        // set graph data
        const groupedDates = groupAttendanceResultsByDate(results);
        const resultArr: GraphProps[] = [];

        Object.entries(groupedDates).forEach(([key, value]) => {
          resultArr.push({
            date: formatDateToMobileAppFormatString(new Date(key)),
            percentage: calculatePercentageForADate(value),
          });
        });
        setGraphData(resultArr);
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
  }, [dates, classesToday]);

  return (
    <BoxWithUnderLine
      title="Attendance"
      children={
        <>
          <View className="mb-6 flex w-full flex-row items-center justify-between">
            <Text className="text-sm font-light">Results</Text>
            <View className="flex flex-row items-center gap-6">
              <TouchableOpacity onPress={() => handleChangeDate('backward')}>
                <Text className="h-10 w-10 rounded-full border-2 border-gray-200 p-2 text-center">
                  {'<'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                id="forward"
                onPress={() => handleChangeDate('forward')}
              >
                <Text className="h-10 w-10 rounded-full border-2 border-gray-200 p-2 text-center">
                  {'>'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex h-60 w-full flex-row justify-between">
            {graphData.slice(0, 4).map((item) => {
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
