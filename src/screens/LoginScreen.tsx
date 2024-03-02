import { useState, useEffect, useContext } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { ApiContext, AuthContext } from '@contexts';

import { ApiContextProps, UserContextProps, LoginScreenProps } from '@types';

import {
  AndroidSafeView,
  TextBox,
  PrimaryButton,
  ShowToast,
  Logo,
} from '@components';

export const LoginScreen = () => {
  const { handleUser } = useContext(AuthContext) as UserContextProps;
  const { handleHost } = useContext(ApiContext) as ApiContextProps;

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [values, setValues] = useState<LoginScreenProps>({
    email: 't@email.com',
    password: 't@123',
    host: 'http://192.168.0.114:8000',
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
      if (!values.email || !values.password || !values.host) {
        throw new Error('Please fill all fields');
      }

      if (!values.email.includes('.com') || !values.email.includes('@')) {
        throw new Error('Invalid email');
      }

      handleHost(values.host);

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

      // This is important
      // Do not use loginUrl here, it's possible that it has not been loaded till now
      const res = await fetch(`${values.host}/token`, {
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
          designation: response?.user?.additional_details?.designation,
        },
        created_at_in_utc: response?.user?.created_at_in_utc,
        updated_at_in_utc: response?.user?.updated_at_in_utc,

        hasSeenWelcome: false,
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
      <View className="flex h-full w-full flex-col items-center p-6">
        {!isKeyboardOpen && <Logo />}

        <View className="mb-6 mt-6 w-full">
          <TextBox
            label="Email"
            inputName={'email'}
            placeholder={'email@connect2mark.com'}
            handleChange={setValues}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="mb-6 w-full">
          <TextBox
            label="Password"
            inputName={'password'}
            placeholder={'Enter your password here'}
            handleChange={setValues}
            secureTextEntry={true}
          />
        </View>
        <View className="w-full">
          <TextBox
            label="Server Host"
            inputName={'host'}
            placeholder={'Enter your host IP here'}
            handleChange={setValues}
            keyboardType="email-address"
          />
        </View>

        {!isKeyboardOpen && (
          <View className="absolute bottom-10 w-full">
            <PrimaryButton title={'Login'} handlePress={onPress} />
            <Text className="mt-2 text-center text-xs">
              Contact your admin if you do not have an account
            </Text>
          </View>
        )}
      </View>
    </AndroidSafeView>
  );
};
