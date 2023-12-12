import { memo } from 'react';
import { TouchableHighlight, View, Text, ActivityIndicator } from 'react-native';

function Button({ title, loading, ...props }) {
	const render = {
		text: <Text className='text-white font-bold'>{title}</Text>,
		loading: <ActivityIndicator size={22} color="#fff" />,
	};

	return (
		<TouchableHighlight
			className='w-full p-4 bg-blue-500 h-14 rounded-lg'
			activeOpacity={0.4}
			underlayColor=''
			{...props}>
			<View className='w-full h-full flex items-center justify-center'>
				{render[loading ? 'loading' : 'text']}
			</View>
		</TouchableHighlight>
	);
}

export default memo(Button);
