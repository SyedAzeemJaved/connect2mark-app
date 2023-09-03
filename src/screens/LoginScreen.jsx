import { useState, useEffect } from "react";
import { View, Text, Keyboard } from "react-native";

import AndroidSafeView from "../components/AndroidSafeView";
import TextBox from "../components/TextBox";
import PrimaryButton from "../components/PrimaryButton";
import Link from "../components/Link";

import LoginVector from "../vectors/LoginVector";

export default function LoginScreen({ navigation }) {
  const textClasses = "font-poppins text-primary text-lg mt-5";
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const redirectToDashboardScreen = (navigation) => {
    if (navigation && navigation.hasOwnProperty("navigate")) {
      navigation.navigate("Dashboard");
    }
  };
  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <AndroidSafeView>
      <View className="w-full h-full bg-white pt-5">
        <LoginVector width={"100%"} height={"50%"} />
        <View className="flex gap-y-4 mr-6 ml-6">
          <Text className={textClasses}>Email</Text>
          <TextBox placeholder={"email@connect2mark.com"} iconName={"email"} />
          <Text className={textClasses}>Password</Text>
          <TextBox
            placeholder={"Enter your password here"}
            iconName={"security"}
          />
        </View>
        {!isKeyboardOpen && (
          <View className="absolute bottom-10 w-full">
            <PrimaryButton
              title={"Login"}
              handlePress={() => {
                redirectToDashboardScreen(navigation);
              }}
            />
            <View className="flex flex-row justify-center">
              <Text className="text-center text-[16px] text-black mr-1">
                Create an account?
              </Text>
              <Link title={"Contact Admin"} handlePress={() => {}} />
            </View>
          </View>
        )}
      </View>
    </AndroidSafeView>
  );
}
