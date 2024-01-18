import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { BluetoothProvider } from './src/context/Bluetooth.context';
import { AuthProvider } from './src/context/Auth.context';
import Navigation from './src/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
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
		<AuthProvider>
			<BluetoothProvider>
				<NavigationContainer onReady={onLayoutRootView}>
					<Navigation />
				</NavigationContainer>
			</BluetoothProvider>
		</AuthProvider>
	);
}
