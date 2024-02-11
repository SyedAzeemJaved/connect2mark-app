import { useEffect, useCallback } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import * as Network from 'expo-network';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import Toast from 'react-native-toast-message';

import { AuthProvider } from '@contexts';
import { Navigation } from '@navigations';

SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        (async () => {
            const pr = await Network.getNetworkStateAsync();
            console.log({
                pr,
            });

            const apiResponse = await fetch(
                'https://firebasestorage.googleapis.com/v0/b/connect2mark-3cebc.appspot.com/o/c943801f-8cdc-4307-8407-60a507e57f6e?alt=media&token=2ff8826c-1069-44f4-b9ea-f562d7f9c0f4',
                { method: 'GET' }
            );

            if (apiResponse.ok) {
                console.log('Worked');
            } else {
                console.log('Did not work');
            }
        })();
    }, []);

    const [fontsLoaded] = useFonts({
        Poppins: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
        MarcellusSc: require('./assets/fonts/Marcellus_SC/MarcellusSC-Regular.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <NavigationContainer onReady={onLayoutRootView}>
                    <Navigation />
                </NavigationContainer>
            </AuthProvider>
            <Toast />
        </GestureHandlerRootView>
    );
}
