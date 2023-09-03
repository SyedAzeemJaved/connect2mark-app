import { SafeAreaView, StatusBar, Platform } from "react-native";

export default function AndroidSafeView({ children }) {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
