import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { AuthContext } from '../context/Auth.context';

const Stack = createStackNavigator();

function Navigation() {
	const { user } = useContext(AuthContext);

	if (user?.isAuthenticated) {
		return (
			<Stack.Navigator initialRouteName='Dashboard'>
				<Stack.Screen
					name='Dashboard'
					options={{
						headerShown: false,
						statusBarStyle: 'dark',
						statusBarTranslucent: true,
					}}
					component={DashboardScreen}
				/>
			</Stack.Navigator>
		);
	}

	return (
		<Stack.Navigator initialRouteName='Login'>
			<Stack.Screen
				name='Login'
				options={{
					headerShown: false,
					statusBarStyle: 'dark',
					statusBarTranslucent: true,
				}}
				component={LoginScreen}
			/>
		</Stack.Navigator>
	);
}

export default Navigation;
