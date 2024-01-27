import { useState, useEffect } from 'react';

import { LocationProps } from '@types';

import * as Location from 'expo-location';

type useLocationReturnProps = {
    success: boolean;
    msg: string;
    location: LocationProps;
};

export const useLocation = () => {
    const [data, setData] = useState<useLocationReturnProps>({
        success: false,
        msg: 'Permission to access location was denied',
        location: {
            coords: {
                accuracy: null,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: 0,
                longitude: 0,
                speed: null,
            },
            timestamp: 0,
        },
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            setData({
                success: true,
                msg: 'Location fetched successfully',
                location: await Location.getCurrentPositionAsync({}),
            });
        })();
    }, []);

    return data;
};
