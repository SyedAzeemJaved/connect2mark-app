import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApiContext } from './Api.context';

import { ApiContextProps, UserContextProps, UserProps } from '@types';

import { ShowToast } from '@components';

export const AuthContext = createContext<UserContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loginUrl } = useContext(ApiContext) as ApiContextProps;

  const [_user, setUser] = useState<UserProps>({
    full_name: '',
    email: '',
    id: 0,
    additional_details: {
      phone: null,
      department: 'not_specified',
      designation: 'not_specified',
    },
    created_at_in_utc: '',
    updated_at_in_utc: null,

    hasSeenWelcome: false,
    isAuthenticated: false,
    token: null,
  });

  const user = useMemo(() => _user, [_user]);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${token}`);
          headers.append('accept', 'application/json');

          const apiResponse = await fetch(loginUrl, {
            method: 'GET',
            headers,
          });

          const res = await apiResponse.json();

          if (!apiResponse.ok) throw new Error(res?.detail);

          setUser({
            full_name: res?.full_name,
            email: res?.email,
            id: res?.id,
            additional_details: {
              phone: res?.additional_details?.phone,
              department: res?.additional_details?.department,
              designation: res?.additional_details?.designation,
            },
            created_at_in_utc: res?.created_at_in_utc,
            updated_at_in_utc: res?.updated_at_in_utc,

            hasSeenWelcome: false,
            isAuthenticated: true,
            token,
          });

          ShowToast({
            type: 'success',
            heading: 'Success',
            desc: 'Logged in successfully',
          });
        } else {
          await AsyncStorage.removeItem('token');
          setUser({
            id: 0,
            full_name: '',
            email: '',
            additional_details: {
              phone: null,
              designation: 'not_specified',
              department: 'not_specified',
            },
            created_at_in_utc: '',
            updated_at_in_utc: null,

            hasSeenWelcome: false,
            isAuthenticated: false,
            token: null,
          });
          throw new Error('Please sign in first');
        }
      } catch (err: any) {
        ShowToast({
          type: 'error',
          heading: 'Oops',
          desc:
            (typeof err?.message === 'string' && err?.message) ||
            'Something went wrong',
        });
      }
    })();
  }, []);

  const handleUser = useCallback((props: UserProps) => {
    setUser((prev) => ({ ...prev, ...props }));
  }, []);

  const handleLogout = useCallback(() => {
    try {
      setUser({
        id: 0,
        full_name: '',
        email: '',
        additional_details: {
          phone: null,
          designation: 'not_specified',
          department: 'not_specified',
        },

        hasSeenWelcome: false,
        created_at_in_utc: '',
        updated_at_in_utc: null,

        isAuthenticated: false,
        token: null,
      });
      AsyncStorage.removeItem('token');
      ShowToast({
        type: 'success',
        heading: 'Success',
        desc: 'Logged out successfully',
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
  }, []);

  const value: UserContextProps = {
    user,
    handleUser,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
