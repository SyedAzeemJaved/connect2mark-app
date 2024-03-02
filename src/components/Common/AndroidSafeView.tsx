import { SafeAreaView, StatusBar, Platform } from 'react-native';

export const AndroidSafeView = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#F9F9F9',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
