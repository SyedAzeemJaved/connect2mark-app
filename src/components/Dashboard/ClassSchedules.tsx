import { View, Text, Image, ImageSourcePropType } from 'react-native';

import {
  StaffAttendanceResultProps,
  StaffAttendanceResultPropsWithClassStatusForTodayClasses,
} from '@types';

import { BoxWithUnderLine, CircleSvg } from '../Common';

const LocationIcon = require('../../../assets/images/location.png');
const TimeIcon = require('../../../assets/images/time.png');

import { convertToDateFromTime } from '@utils';

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

const formatTimeLocal = (t: string): string => {
  return convertToDateFromTime(t).toString().slice(16, 21);
};

const returnClassStatusHeading = (
  currentClass: StaffAttendanceResultPropsWithClassStatusForTodayClasses | null
): string => {
  if (!currentClass) {
    return 'Phew 🥳';
  }
  return currentClass.class_status === 'current'
    ? 'Current'
    : currentClass.class_status === 'next'
      ? 'Next Class'
      : 'Past Class';
};

export const ClassSchedules = ({
  classesToday,
  currentClass,
}: {
  classesToday: StaffAttendanceResultProps[];
  currentClass: StaffAttendanceResultPropsWithClassStatusForTodayClasses | null;
}) => {
  const totalClassesCount = classesToday.length;
  const totalCompletedCount = classesToday.filter(
    (c) => c.attendance_status !== null
  ).length;

  return (
    <View className="flex flex-row items-stretch justify-between space-x-6">
      <View className="flex-1">
        <BoxWithUnderLine
          title={'Today'}
          children={
            <>
              <View className="relative flex flex-col items-center justify-center">
                <CircleSvg
                  percentage={(totalCompletedCount / totalClassesCount) * 100}
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
          title={returnClassStatusHeading(currentClass)}
          children={
            <View className="flex flex-col">
              <Text className="mb-2 text-sm text-zinc-700">
                {currentClass
                  ? currentClass.schedule_instance.schedule.title
                  : 'No classes today, sit back and relax!'}
              </Text>
              {currentClass && (
                <>
                  <ItemWithIcon
                    text={currentClass.schedule_instance.location.title}
                    icon={LocationIcon}
                  />
                  <ItemWithIcon
                    text={`${formatTimeLocal(currentClass.schedule_instance.start_time_in_utc)} - ${formatTimeLocal(currentClass.schedule_instance.end_time_in_utc)}`}
                    icon={TimeIcon}
                  />
                </>
              )}
            </View>
          }
        />
      </View>
    </View>
  );
};
