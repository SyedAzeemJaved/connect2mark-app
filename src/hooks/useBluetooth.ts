import { useState, useEffect } from 'react';

import { BleManager, Device, BleError } from 'react-native-ble-plx';

const _BleManager = new BleManager();

export const useBluetooth = () => {
    const [scannedDevices, setScannedDevices] = useState<string[]>([]);

    useEffect(() => {
        // Clean up
        return () => {
            _BleManager.destroy();
        };
    }, []);

    const startScanning = (): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            const handleDeviceScan = (
                error: BleError | null,
                device: Device | null
            ) => {
                if (error) {
                    stopScanning();
                    reject(error);
                }
                if (device) {
                    setScannedDevices((prevDevices) => {
                        // Add the device ID to the list if not already present
                        if (!prevDevices.includes(device.id)) {
                            return [...prevDevices, device.id];
                        }
                        return prevDevices;
                    });
                }
            };

            const stopScanning = () => {
                console.log('Scanning has been stopped');
                _BleManager.stopDeviceScan();
            };

            console.log('Scanning started');

            // Reset the list and start scanning
            setScannedDevices([]);
            _BleManager.startDeviceScan(
                null,
                { allowDuplicates: false },
                handleDeviceScan
            );

            // Keep scanning for 5 seconds
            setTimeout(() => {
                stopScanning();
                resolve(scannedDevices); // Resolve with the list of scanned devices
            }, 6000);
        });
    };

    return startScanning;
};
