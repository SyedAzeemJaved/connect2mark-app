import { useContext } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import { AuthContext } from '@contexts';

import { UserContextProps } from '@types';

import { AndroidSafeView, PrimaryButton } from '@components';

const image = require('../../assets/images/welcome/background.png');

export const WelcomeScreen = () => {
  const { user, handleUser } = useContext(AuthContext) as UserContextProps;

  return (
    <AndroidSafeView>
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="h-full w-full"
      >
        <View className="flex h-full w-full flex-col items-center justify-start space-y-2 p-6">
          <Text className="font-marcellus text-4xl text-primary">
            SafeCheck
          </Text>
          <Text className="font-marcellus text-xl text-black">
            Mobile Application
          </Text>
          <View className="rounded-2xl bg-primary">
            <Text className="px-4 py-2 font-poppins text-sm text-white">
              #present
            </Text>
          </View>
          <Text className="text-center font-poppins text-base font-semibold text-black">
            automatically mark your attendance by just walking into a classroom
          </Text>
          <View className="absolute bottom-10 w-full">
            <PrimaryButton
              title={'Get Started'}
              handlePress={() =>
                handleUser({
                  ...user,
                  hasSeenWelcome: true,
                })
              }
            />
          </View>
        </View>
      </ImageBackground>
    </AndroidSafeView>
  );
};
