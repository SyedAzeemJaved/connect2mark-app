import { View, Text } from 'react-native';

type BoxWithUnderLineProps = {
  title: string;
  children: React.ReactNode;
};

export const BoxWithUnderLine = ({
  title,
  children,
}: BoxWithUnderLineProps) => {
  return (
    <View className="rounded-xl bg-white px-6 py-6">
      <View>
        <Text className="text-xl font-semibold">{title}</Text>
        <View className="mb-6 mt-1 h-[2px] w-full rounded-full bg-zinc-600" />
      </View>
      {children}
    </View>
  );
};
