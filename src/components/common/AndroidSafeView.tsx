import { SafeAreaView, StatusBar, Platform } from 'react-native';

export const AndroidSafeView = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <SafeAreaView
            style={{
                paddingTop:
                    Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            {children}
        </SafeAreaView>
    );
};
