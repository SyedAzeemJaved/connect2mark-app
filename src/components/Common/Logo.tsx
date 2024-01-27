import { View, Text, Image } from 'react-native';

export const Logo = () => {
    return (
        <View className="flex w-full flex-col items-center justify-center">
            <Image
                source={require('../../../assets/icons/Connect2Mark-colored.png')}
                resizeMode="contain"
                className="h-20 w-20"
            />
            <Text className="mt-4 font-marcellus text-4xl text-primary">
                Connect2Mark
            </Text>
        </View>
    );
};
