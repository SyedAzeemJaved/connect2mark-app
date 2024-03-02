import { useState } from 'react';

import { BleManager, Device, BleError } from 'react-native-ble-plx';

export const useBluetooth = () => {
  const [scannedDevices, setScannedDevices] = useState<string[]>([]);

  const startScanning = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const _BleManager = new BleManager();

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
        // console.log('Scanning has been stopped');
        _BleManager.stopDeviceScan();
        // _BleManager.destroy();
      };

      // Reset the list and start scanning
      setScannedDevices([]);

      // console.log('Scanning started');
      _BleManager.startDeviceScan(
        null,
        { allowDuplicates: false },
        handleDeviceScan
      );

      // Keep scanning for 5 seconds
      setTimeout(() => {
        stopScanning();
        resolve(scannedDevices); // Resolve with the list of scanned devices
      }, 15000);
    });
  };

  return startScanning;
};
