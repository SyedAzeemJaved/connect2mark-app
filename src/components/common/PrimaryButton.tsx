import { useState } from 'react';
import { Text, Pressable } from 'react-native';

type Props = {
    title: string;
    handlePress: () => void;
};

export const PrimaryButton = ({ title, handlePress }: Props) => {
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
                isPressed ? 'bg-gray-800' : 'bg-primary'
            } ml-6 mr-6 rounded-2xl p-5`}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Text className="text-center text-[18px] text-white">{title}</Text>
        </Pressable>
    );
};
