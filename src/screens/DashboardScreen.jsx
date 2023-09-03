import { View, Text, Image, ScrollView } from 'react-native';

import AndroidSafeView from '../components/AndroidSafeView';

export default function DashboardScreen() {
	const ssuetLogo = require('../../assets/images/ssuet-logo.png');
	return (
		<AndroidSafeView>
			<ScrollView className='w-full h-full bg-[#F9F9F9]'>
				<View className='items-center py-10 mt-2 w-full flex flex-col px-5'>
					{/* Account Card component start */}
					<View className='flex justify-center items-center bg-white rounded-xl w-full h-60 p-3'>
						<Image
							source={ssuetLogo}
							resizeMode='contain'
							className='w-2/4 h-2/4 drop-shadow-2xl'
						/>
						<Text className='font-poppins font-semibold text-[24px] pt-2'>
							Wania Khan
						</Text>
						<Text className='font-poppins font-light text-[#606060] text-[16px] -mt-3'>
							Computer Science Teacher
						</Text>
					</View>
					<View className='w-full flex flex-row items-center justify-between mt-8'>
						<View className='flex p-4 bg-white rounded-xl w-[45%] h-52  flex-col  justify-between'>
							<View>
								<Text className='font-semibold text-[24px]'>Today</Text>
								<View className='w-full h-[2px] bg-zinc-600 rounded-full mt-1' />
							</View>
							<View className='w-full flex items-center justify-center mt-4 relative flex-col'>
								<Image
									source={require('../../assets/images/Circle.png')}
									resizeMode='cover'
									className='w-20 h-20'
								/>
								<View className='absolute'>
									<Text className='font-bold text-lg text-zinc-600'>03</Text>
								</View>
							</View>
							<View className='w-full flex mt-2 items-center'>
								<Text className='text-zinc-600 font-semibold'>3 Out of 4</Text>
							</View>
						</View>

						<View className='flex items-center bg-white rounded-xl w-[45%] h-52 p-4'>
							<View className='w-full'>
								<Text className='font-semibold text-[24px]'>Next Class</Text>
								<View className='w-full h-[2px] bg-zinc-600 rounded-full mt-1' />
							</View>
							<View className='w-full mt-4 flex flex-col'>
								<Text className='font-semibold text-zinc-700'>
									Object Oriented Programming
								</Text>
								<View className='flex flex-row items-center mt-2'>
									<Image
										className='w-4 h-4'
										resizeMode='contain'
										source={require('../../assets/images/location.png')}
									/>
									<Text className='text-zinc-700 ml-2'>Room GT-05</Text>
								</View>
								<View className='flex flex-row items-center mt-2'>
									<Image
										className='w-4 h-4'
										resizeMode='contain'
										source={require('../../assets/images/time.png')}
									/>
									<Text className='text-zinc-700 ml-2'>9:00 am - 11:00 am</Text>
								</View>
							</View>
						</View>
					</View>
					<View className='w-full bg-white flex flex-col mt-10 h-[40rem] rounded-xl p-4'>
						<View className='w-full'>
							<Text className='font-semibold text-[24px]'>Attendance</Text>
							<View className='w-full h-[2px] bg-zinc-600 rounded-full mt-1' />
						</View>
						<View className='w-full flex flex-row items-center justify-between mt-4'>
							<View className='w-1/2 flex h-12 rounded-md border-2 border-gray-200  items-center flex-row px-2 justify-between'>
								<Text className='font-semibold text-zinc-600'>August</Text>
								<Text className='text-xl rotate-90'>{'>'}</Text>
							</View>
							<View className='flex flex-row items-center gap-2'>
								<View className='w-10 h-10 rounded-full border-2 border-gray-200 items-center justify-center'>
									<Text className='text-xl'>{'<'}</Text>
								</View>
								<View className='w-10 h-10 rounded-full border-2 border-gray-200 items-center justify-center'>
									<Text className='text-xl'>{'>'}</Text>
								</View>
							</View>
						</View>
						<View className='w-full flex flex-row items-center mt-4'>
							<View className='w-20 h-60 bg-zinc-200 flex flex-col justify-end'>
								<View className='w-full h-[80%] bg-[#333D55]'></View>
							</View>
							<View className='w-20 h-60 bg-zinc-200 flex flex-col justify-end ml-2'>
								<View className='w-full h-[70%] bg-[#333D55]'></View>
							</View>
							<View className='w-20 h-60 bg-zinc-200 flex flex-col justify-end ml-2'>
								<View className='w-full h-[50%] bg-[#333D55]'></View>
							</View>
							<View className='w-20 h-60 bg-zinc-200 flex flex-col justify-end ml-2'>
								<View className='w-full h-[55%] bg-[#333D55]'></View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</AndroidSafeView>
	);
}
