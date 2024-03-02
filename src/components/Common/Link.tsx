import { Pressable, Text } from 'react-native';

type Props = {
  title: string;
  handlePress: () => void;
};

export const Link = ({ title, handlePress }: Props) => {
  return (
    <Pressable onPress={handlePress}>
      <Text className="text-sm font-semibold text-purple-800">{title}</Text>
    </Pressable>
  );
};
