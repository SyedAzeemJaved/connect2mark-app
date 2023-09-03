import { Pressable, Text } from "react-native";

export default function Link({ title, handlePress }) {
  return (
    <Pressable onPress={handlePress}>
      <Text className="text-center font-bold text-[16px] text-primary">
        {title}
      </Text>
    </Pressable>
  );
}
