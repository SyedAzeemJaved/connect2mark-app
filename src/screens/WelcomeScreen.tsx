import { View, Text, ImageBackground } from 'react-native';

import { AndroidSafeView, PrimaryButton, Link } from '@components';

const image = require('../../assets/images/welcome/background.png');

export const WelcomeScreen = ({ navigation }) => {
    const redirectToLoginScreen = (navigation) => {
        if (navigation && navigation.hasOwnProperty('navigate')) {
            navigation.navigate('Login');
        }
    };

    return (
        <AndroidSafeView>
            {/* <View className="min-h-screen"> */}
            <ImageBackground
                source={image}
                resizeMode="cover"
                className="h-full w-full"
            >
                <View className="mt-10 items-center">
                    <Text className="font-marcellus text-[36px] text-primary">
                        Connect2Mark
                    </Text>
                    <Text className="font-marcellus text-[24px] text-black">
                        Mobile Application
                    </Text>
                    <Text className="mt-2 rounded-2xl bg-primary pb-2 pl-4 pr-4 pt-2 font-poppins text-[15px] text-white">
                        #present
                    </Text>
                    <Text className="-mt-2 px-5 py-5 text-center font-poppins text-[16px] text-black">
                        automatically mark your attendance by just walking into
                        a classroom
                    </Text>
                </View>
                <View className="absolute bottom-10 w-full">
                    <PrimaryButton
                        title={'Get Started'}
                        handlePress={() => {
                            redirectToLoginScreen(navigation);
                        }}
                    />
                    <View className="flex flex-row justify-center">
                        <Text className="mr-1 text-center text-[16px] text-black">
                            Have an account?
                        </Text>
                        <Link
                            title={'Login'}
                            handlePress={() => {
                                redirectToLoginScreen(navigation);
                            }}
                        />
                    </View>
                </View>
            </ImageBackground>
            {/* </View> */}
        </AndroidSafeView>
    );
};
