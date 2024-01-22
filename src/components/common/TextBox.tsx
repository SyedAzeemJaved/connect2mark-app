import { View, TextInput, TextInputProps } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { LoginScreenProps } from '@types';

type Props = {
    inputName: string;
    placeholder: string;
    iconName: 'email' | 'security';
    handleChange: React.Dispatch<React.SetStateAction<LoginScreenProps>>;
} & TextInputProps;

export const TextBox = ({
    inputName,
    placeholder,
    iconName,
    handleChange,
    ...rest
}: Props) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
                marginTop: 5,
            }}
        >
            <MaterialIcons
                name={iconName}
                size={28}
                color={'#333D55'}
                style={{
                    position: 'absolute',
                    right: 14,
                    zIndex: 10,
                }}
            />
            <TextInput
                placeholder={placeholder}
                className="bg-white-700 hover:bg-white-900 h-12 w-full rounded-lg border-2 border-secondary pl-4 text-secondary"
                onChangeText={(val) =>
                    handleChange((prev) => ({
                        ...prev,
                        [inputName]: val,
                    }))
                }
                {...rest}
            />
        </View>
    );
};
