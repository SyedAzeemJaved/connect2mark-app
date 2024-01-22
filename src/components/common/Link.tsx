import { Pressable, Text } from 'react-native';

type Props = {
    title: string;
    handlePress: () => void;
};

export const Link = ({ title, handlePress }: Props) => {
    return (
        <Pressable onPress={handlePress}>
            <Text className="text-center text-[16px] font-bold text-primary">
                {title}
            </Text>
        </Pressable>
    );
};
