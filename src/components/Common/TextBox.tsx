import { View, Text, TextInput, TextInputProps } from 'react-native';

import { LoginScreenProps } from '@types';

type Props = {
    label: string;
    inputName: string;
    placeholder: string;
    handleChange: React.Dispatch<React.SetStateAction<LoginScreenProps>>;
} & TextInputProps;

export const TextBox = ({
    label,
    inputName,
    placeholder,
    handleChange,
    ...rest
}: Props) => {
    return (
        <View className="flex flex-col items-start">
            <Text className="font-poppins text-lg font-semibold text-primary">
                {label}
            </Text>
            <TextInput
                placeholder={placeholder}
                className="h-12 w-full rounded-2xl border-2 border-zinc-200 bg-white px-6 text-sm font-light focus:border-zinc-400"
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
