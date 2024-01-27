import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '@contexts';
import { UserContextProps } from '@types';

import { LoginScreen, DashboardScreen, WelcomeScreen } from '@screens';

const Stack = createStackNavigator();

export const Navigation = () => {
    const { user } = useContext(AuthContext) as UserContextProps;

    if (user.isAuthenticated) {
        if (!user.hasSeenWelcome) {
            return (
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen
                        name="Welcome"
                        options={{
                            headerShown: false,
                        }}
                        component={WelcomeScreen}
                    />
                </Stack.Navigator>
            );
        } else {
            return (
                <Stack.Navigator initialRouteName="Dashboard">
                    <Stack.Screen
                        name="Dashboard"
                        options={{
                            headerShown: false,
                        }}
                        component={DashboardScreen}
                    />
                </Stack.Navigator>
            );
        }
    }

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                options={{
                    headerShown: false,
                }}
                component={LoginScreen}
            />
        </Stack.Navigator>
    );
};
