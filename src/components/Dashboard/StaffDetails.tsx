import { View, Text, Image } from 'react-native';

import { setText } from '@utils';

type StaffDetailsProps = {
  full_name: string;
  email: string;
  department: string;
  designation: string;
};

export const StaffDetails = ({
  full_name,
  email,
  department,
  designation,
}: StaffDetailsProps) => {
  return (
    <View className="flex flex-col items-center rounded-xl bg-white py-6">
      <Image
        source={require('../../../assets/images/bahria-logo.png')}
        resizeMode="contain"
        className="h-30 w-30"
      />
      <View className="mt-2 flex flex-col items-center font-poppins">
        <Text className="text-2xl font-bold text-blue-800">{full_name}</Text>
        <Text className="-mt-1 text-xs font-light italic text-gray-500">
          {email}
        </Text>
        <Text className="mt-2 text-lg font-semibold">
          {setText(designation)}
        </Text>
        <Text className="-mt-1 text-sm font-light">{setText(department)}</Text>
      </View>
    </View>
  );
};
