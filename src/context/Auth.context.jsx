import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../common';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const headers = new Headers();

	const [_user, setUser] = useState({
		isAuthenticated: null,
		email: null,
		imageURI: null,
		name: null,
		user_role: null,
		id: null,
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
						isAuthenticated: !!res?.email,
						email: res?.email,
						imageURI: null,
						name: res?.name,
						user_role: res?.user_role,
						id: res?.id,
						token,
					});

					return;
				}
				setUser({
					isAuthenticated: false,
					email: null,
					imageURI: null,
					name: null,
					user_role: null,
					id: null,
				});
			} catch (err) {
				setUser({
					isAuthenticated: false,
					email: null,
					imageURI: null,
					name: null,
					user_role: null,
					id: null,
				});
			}
		})();
	}, []);

	const handleUser = useCallback(props => {
		setUser(props);
	}, []);

	const setToken = useCallback(async token => {
		setUser(prev => ({
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
		AsyncStorage.removeItem('token')
			.then(() => {
				console.log('token removed');
			})
			.catch(() => {
				console.log('error occured during logout');
			});
	}, []);

	const value = {
		user,
		handleLogout,
		handleUser,
		setToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
