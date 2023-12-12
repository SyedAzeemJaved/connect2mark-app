import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { BluetoothProvider } from './src/context/Bluetooth.context';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

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
		<BluetoothProvider>
			<NavigationContainer onReady={onLayoutRootView}>
				<Stack.Navigator initialRouteName='Dashboard'>
					<Stack.Screen
						name='Welcome'
						options={{
							headerShown: false,
							statusBarStyle: 'dark',
							statusBarTranslucent: true,
						}}
						component={WelcomeScreen}></Stack.Screen>
					<Stack.Screen
						name='Login'
						options={{
							headerShown: false,
							statusBarStyle: 'dark',
							statusBarTranslucent: true,
						}}
						component={LoginScreen}></Stack.Screen>
					<Stack.Screen
						name='Dashboard'
						options={{
							headerShown: false,
							statusBarStyle: 'dark',
							statusBarTranslucent: true,
						}}
						component={DashboardScreen}></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</BluetoothProvider>
	);
}
