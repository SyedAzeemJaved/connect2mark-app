import { View, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TextBox({ placeholder, iconName, onChange, secureText }) {
	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				position: 'relative',
				marginTop: 5,
			}}>
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
				className='w-full h-12 bg-white-700 hover:bg-white-900 text-secondary rounded-lg border-2 border-secondary pl-4'
				onChangeText={onChange}
				secureTextEntry={!!secureText}
			/>
		</View>
	);
}
