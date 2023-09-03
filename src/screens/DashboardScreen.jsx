import { View, Text, Image } from "react-native";

import AndroidSafeView from "../components/AndroidSafeView";

export default function DashboardScreen() {
  const ssuetLogo = require("../../assets/images/ssuet-logo.png");
  return (
    <AndroidSafeView>
      <View className="w-full h-full bg-[#F9F9F9]">
        <View className="items-center gap-10 mt-2">
          {/* Account Card component start */}
          <View className="flex justify-center items-center bg-white rounded-xl w-3/4 h-1/4 p-3">
            <Image
              source={ssuetLogo}
              resizeMode="contain"
              className="w-2/4 h-2/4 drop-shadow-2xl"
            />
            <Text className="font-poppins font-semibold text-[24px] pt-2">
              Wania Khan
            </Text>
            <Text className="font-poppins font-light text-[#606060] text-[16px] -mt-3">
              Computer Science Teacher
            </Text>
          </View>
          {/* Account Card component end */}
          {/* Today and Next Card component start */}
          <View>
            {/* Today Card component start */}
            <View className="flex justify-center items-center bg-white rounded-xl w-3/4 h-2/4">
              <Text>Today</Text>
            </View>
            {/* Today Card component end */}
          </View>
          {/* Today and Next Card component end */}
        </View>
      </View>
    </AndroidSafeView>
  );
}
