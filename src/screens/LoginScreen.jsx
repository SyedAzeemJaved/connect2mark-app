import { useState, useEffect, useContext } from 'react';
import { View, Text, Keyboard, ToastAndroid } from 'react-native';

import AndroidSafeView from '../components/AndroidSafeView';
import TextBox from '../components/TextBox';
import PrimaryButton from '../components/PrimaryButton';
import Link from '../components/Link';

import LoginVector from '../vectors/LoginVector';
import { AuthContext } from '../context/Auth.context';
import { api } from '../common';

export default function LoginScreen({ navigation }) {
    const { user, handleLogout, handleUser, setToken } =
        useContext(AuthContext);
    const textClasses = 'font-poppins text-primary text-lg mt-5';
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleValues = (type) => (text) => {
        setValues((prev) => ({ ...prev, [type]: text }));
    };

    const redirectToDashboardScreen = (navigation) => {
        if (navigation && navigation.hasOwnProperty('navigate')) {
            navigation.navigate('Dashboard');
        }
    };

    useEffect(() => {
        const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardOpen(true);
        });
        const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false);
        });

        return () => {
            showKeyboard.remove();
            hideKeyboard.remove();
        };
    }, []);

    const onPress = async () => {
        try {
            if (
                !values?.email?.includes('.com') ||
                !values?.email?.includes('@')
            ) {
                throw new Error('Invalid enail');
            }

            const headers = new Headers();
            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('username', values.email.toLowerCase());
            params.append('password', values.password ?? '');
            params.append('client_id', '');
            params.append('client_secret', '');

            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('accept', 'application/json');

            ToastAndroid.show('Logging in', 500);
            const res = await fetch(api.LOGIN, {
                method: 'POST',
                headers,
                body: params.toString(),
            });

            const response = await res.json();

            ToastAndroid.show('Logged in', 500);
            handleUser({
                isAuthenticated: true,
                email: values.email,
                imageURI: null,
                name: response?.user?.full_name,
                user_role: null,
                id: response?.user?.id,
            });

            setToken(response?.access_token);
        } catch (err) {
            ToastAndroid.show(err?.message, 500);
        }
    };

    return (
        <AndroidSafeView>
            <View className="h-full w-full bg-white pt-5">
                <LoginVector width={'100%'} height={'50%'} />
                <View className="ml-6 mr-6 flex gap-y-4">
                    <Text className={textClasses}>Email</Text>
                    <TextBox
                        placeholder={'email@connect2mark.com'}
                        iconName={'email'}
                        onChange={handleValues('email')}
                    />
                    <Text className={textClasses}>Password</Text>
                    <TextBox
                        placeholder={'Enter your password here'}
                        iconName={'security'}
                        onChange={handleValues('password')}
                        secureText
                    />
                </View>
                {!isKeyboardOpen && (
                    <View className="absolute bottom-10 w-full">
                        <PrimaryButton title={'Login'} handlePress={onPress} />
                        <View className="flex flex-row justify-center">
                            <Text className="mr-1 text-center text-[16px] text-black">
                                Create an account?
                            </Text>
                            <Link
                                title={'Contact Admin'}
                                handlePress={() => {}}
                            />
                        </View>
                    </View>
                )}
            </View>
        </AndroidSafeView>
    );
}
