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
            } rounded-2xl p-4`}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Text className="text-center text-xl font-semibold uppercase text-white">
                {title}
            </Text>
        </Pressable>
    );
};
