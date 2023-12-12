import { createContext, useCallback, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export const BluetoothContext = createContext(null);

export const BluetoothProvider = ({ children }) => {
	const [manager, setManager] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const manager = new BleManager();
				setManager(manager);
				ToastAndroid.show('Bluetooth initilized', 1000);
			} catch (err) {
        ToastAndroid.show("Bluetoother error occured during init", 1000)

				console.log(err?.message);
				console.log('error at initilizing');
			}
		})();
	}, []);

	const handleStartScanning = useCallback(async () => {
		console.log('handleStartScanning');
		if (!manager) return;
		console.log('im here');
		manager.startDeviceScan((error, scannedDevices) => {
			if (error) {
				console.log('error occured while scanning devices');

				return;
			}

			console.log(scannedDevices);
		});
	}, []);

	const value = {
		name: 'harisiqbal',
		handleStartScanning,
	};

	return (
		<BluetoothContext.Provider value={value}>
			{children}
		</BluetoothContext.Provider>
	);
};
