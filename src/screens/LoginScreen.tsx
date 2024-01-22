import { useState, useEffect, useContext } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { api } from '@constants';

import { AuthContext } from '@contexts';
import { UserContextProps, LoginScreenProps } from '@types';

import {
    AndroidSafeView,
    TextBox,
    PrimaryButton,
    ShowToast,
} from '@components';

import LoginVector from '../vectors/LoginVector';

const textClasses = 'font-poppins text-primary text-lg mt-5';

export const LoginScreen = () => {
    const { handleUser } = useContext(AuthContext) as UserContextProps;

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [values, setValues] = useState<LoginScreenProps>({
        email: '',
        password: '',
    });

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
            if (!values.email || !values.password) {
                throw new Error('Please fill all fields');
            }

            if (!values.email.includes('.com') || !values.email.includes('@')) {
                throw new Error('Invalid email');
            }

            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('username', values.email.toLowerCase());
            params.append('password', values.password);
            params.append('client_id', '');
            params.append('client_secret', '');

            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('accept', 'application/json');

            ShowToast({
                type: 'info',
                heading: 'Information',
                desc: 'Attempting to log in',
            });

            const res = await fetch(api.LOGIN, {
                method: 'POST',
                headers,
                body: params.toString(),
            });

            const response = await res.json();

            if (!res.ok) {
                throw new Error('Invalid credentials');
            }

            if (response?.user?.is_admin) {
                throw new Error('Admins can not use the mobile app');
            }

            handleUser({
                id: response?.user?.id,
                full_name: response?.user?.full_name,
                email: response.user?.email,
                additional_details: {
                    phone: response?.user?.additional_details?.phone,
                    department: response?.user?.additional_details?.department,
                    designation:
                        response?.user?.additional_details?.designation,
                },
                created_at_in_utc: response?.user?.created_at_in_utc,
                updated_at_in_utc: response?.user?.updated_at_in_utc,

                isAuthenticated: true,
                token: response?.access_token,
            });

            ShowToast({
                type: 'success',
                heading: 'Success',
                desc: 'Logged in successfully',
            });
        } catch (err: any) {
            ShowToast({
                type: 'error',
                heading: 'Oops',
                desc:
                    (typeof err?.message === 'string' && err?.message) ||
                    'Something went wrong',
            });
        }
    };

    return (
        <AndroidSafeView>
            <View className="h-full w-full bg-white pt-5">
                <LoginVector width={'100%'} height={'50%'} />
                <View className="ml-6 mr-6 flex gap-y-4">
                    <Text className={textClasses}>Email</Text>
                    <TextBox
                        inputName={'email'}
                        placeholder={'email@connect2mark.com'}
                        iconName={'email'}
                        handleChange={setValues}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text className={textClasses}>Password</Text>
                    <TextBox
                        inputName={'password'}
                        placeholder={'Enter your password here'}
                        iconName={'security'}
                        handleChange={setValues}
                        secureTextEntry={true}
                    />
                </View>
                {!isKeyboardOpen && (
                    <View className="absolute bottom-10 w-full">
                        <PrimaryButton title={'Login'} handlePress={onPress} />
                        <View className="flex flex-row justify-center">
                            <Text className="mt-2 text-center text-[12px] text-black">
                                Contact your admin if you do not have an account
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </AndroidSafeView>
    );
};
