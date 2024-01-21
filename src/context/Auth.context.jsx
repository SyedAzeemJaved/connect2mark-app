import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../common';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const headers = new Headers();

    const [_user, setUser] = useState({
        full_name: '',
        email: '',
        id: 0,
        is_admin: false,
        additional_details: {
            phone: null,
            department: 'not_specified',
            designation: 'not_specified',
        },
        created_at_in_utc: '',
        updated_at_in_utc: null,

        isAuthenticated: false,
        token: null,
    });

    const user = useMemo(() => _user, [_user]);

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                    headers.append('accept', 'application/json');

                    const apiResponse = await fetch(api.USERME, {
                        method: 'GET',
                        headers,
                    });

                    const res = await apiResponse.json();

                    if (!apiResponse.ok) throw new Error(res?.detail);

                    setUser({
                        full_name: res?.full_name,
                        email: res?.email,
                        id: res?.id,
                        is_admin: res?.is_admin,
                        additional_details: {
                            phone: res?.additional_details?.phone,
                            department: res?.additional_details?.department,
                            designation: res?.additional_details?.designation,
                        },
                        created_at_in_utc: res?.created_at_in_utc,
                        updated_at_in_utc: res?.updated_at_in_utc,

                        isAuthenticated: true,
                        token,
                    });

                    return;
                }
            } catch (err) {
                // Syed Azeem Javed
                // fireToast(
                //     'There seems to be a problem',
                //     (typeof err?.message === 'string' && err?.message) ||
                //       'Something went wrong',
                //     3,
                //   );
            }
        })();
    }, []);

    const handleUser = useCallback((props) => {
        setUser(props);
    }, []);

    const setToken = useCallback(async (token) => {
        setUser((prev) => ({
            ...prev,
            token,
        }));
        await AsyncStorage.setItem('token', token);
    }, []);

    const handleLogout = useCallback(() => {
        setUser({
            isAuthenticated: false,
            email: null,
            imageURI: null,
            name: null,
            user_role: null,
            id: null,
            token: null,
        });
        AsyncStorage.removeItem('token').catch(() => {
            console.log('error occured during logout');
        });
    }, []);

    const value = {
        user,
        handleLogout,
        handleUser,
        setToken,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
