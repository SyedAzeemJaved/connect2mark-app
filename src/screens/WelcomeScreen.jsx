import { View, Text, ImageBackground } from "react-native";

import AndroidSafeView from "../components/AndroidSafeView";
import PrimaryButton from "../components/PrimaryButton";
import Link from "../components/Link";

const image = require("../../assets/images/welcome/background.png");

export default function WelcomeScreen({ navigation }) {
  const redirectToLoginScreen = (navigation) => {
    if (navigation && navigation.hasOwnProperty("navigate")) {
      navigation.navigate("Login");
    }
  };
  const redirectToDashboardScreen = (navigation) => {
    if (navigation && navigation.hasOwnProperty("navigate")) {
      navigation.navigate("Dashboard");
    }
  };

  return (
    <AndroidSafeView>
      {/* <View className="min-h-screen"> */}
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="w-full h-full"
      >
        <View className="items-center mt-10">
          <Text className="font-marcellus text-primary text-[36px]">
            Connect2Mark
          </Text>
          <Text className="font-marcellus text-black text-[24px]">
            Mobile Application
          </Text>
          <Text className="font-poppins text-white bg-primary text-[15px] rounded-2xl mt-2 pt-2 pb-2 pr-4 pl-4">
            #present
          </Text>
          <Text className="font-poppins text-black text-center text-[16px] -mt-2 px-5 py-5">
            automatically mark your attendance by just walking into a classroom
          </Text>
        </View>
        <View className="absolute bottom-10 w-full">
          <PrimaryButton
            title={"Get Started"}
            handlePress={() => {
              redirectToLoginScreen(navigation);
            }}
          />
          <View className="flex flex-row justify-center">
            <Text className="text-center text-[16px] text-black mr-1">
              Have an account?
            </Text>
            <Link
              title={"Login"}
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
}
