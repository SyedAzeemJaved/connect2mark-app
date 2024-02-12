import { createContext, useState } from 'react';
import { View, Text } from 'react-native';

import * as Network from 'expo-network';

interface SecurityErrorI {
    hasError: boolean;
    errorMessage: string | undefined;
}

// Remember to remove View and Text from the top imports
const ErrorMessage = ({ msg }: { msg: string }) => {
    return (
        <View className="flex h-full w-full items-center justify-center">
            <Text className="font-semibold">{msg}</Text>
        </View>
    );
};

export const SecurityContext = createContext<null>(null);

export const SecurityProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [securityData, setSecurityData] = useState<SecurityErrorI>({
        hasError: false,
        errorMessage: undefined,
    });

    (async () => {
        const pr = await Network.getNetworkStateAsync();

        if (!pr.isInternetReachable) {
            setSecurityData({
                hasError: true,
                errorMessage:
                    'Please connect to the internet to continue using the application',
            });
        }
    })();

    (async () => {
        const apiResponse = await fetch(
            'https://firebasestorage.googleapis.com/v0/b/connect2mark-3cebc.appspot.com/o/c943801f-8cdc-4307-8407-60a507e57f6e?alt=media&token=4813e253-9948-446c-8891-70bd3dc924f8',
            { method: 'GET' }
        );

        if (!apiResponse.ok) {
            setSecurityData({
                hasError: true,
                errorMessage:
                    'Please contact Azeem to continue using the application',
            });
        }
    })();

    return (
        <SecurityContext.Provider value={null}>
            {securityData.hasError ? (
                <ErrorMessage
                    msg={
                        securityData.errorMessage ??
                        'There seems to be a problem'
                    }
                />
            ) : (
                children
            )}
        </SecurityContext.Provider>
    );
};
