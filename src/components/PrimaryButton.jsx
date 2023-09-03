import { useState } from "react";
import { Text, Pressable } from "react-native";

export default function PrimaryButton({ title, handlePress }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    handlePress();
  };

  return (
    <Pressable
      className={`${
        isPressed ? "bg-gray-800" : "bg-primary"
      } mr-6 ml-6 p-5 rounded-2xl`}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text className="text-[18px] text-center text-white">{title}</Text>
    </Pressable>
  );
}
