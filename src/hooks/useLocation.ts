import { DeviceLocationProps } from '@types';

import * as Location from 'expo-location';

export const useLocation = () => {
  const fetchLocation = async (): Promise<DeviceLocationProps> => {
    // console.log('Starting to fetch location');
    return new Promise(async (resolve, reject) => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        reject('Insufficient permissions to get device location');
      }
      const location = await Location.getCurrentPositionAsync({});
      resolve(location);
    });
  };

  return fetchLocation;
};
