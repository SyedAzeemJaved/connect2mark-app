import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '@contexts';
import { UserContextProps } from '@types';

import { LoginScreen, DashboardScreen } from '@screens';

const Stack = createStackNavigator();

export const Navigation = () => {
    const { user } = useContext(AuthContext) as UserContextProps;

    if (user?.isAuthenticated) {
        return (
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen
                    name="Dashboard"
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
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                options={{
                    headerShown: false,
                    statusBarStyle: 'dark',
                    statusBarTranslucent: true,
                }}
                component={LoginScreen}
            />
        </Stack.Navigator>
    );
};
