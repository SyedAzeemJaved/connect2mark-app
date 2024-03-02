import Toast from 'react-native-toast-message';

type ShowToastProps = {
  type: 'success' | 'error' | 'info';
  heading: string;
  desc: string;
};

export const ShowToast = ({ type, heading, desc }: ShowToastProps) => {
  return Toast.show({
    type,
    text1: heading,
    text2: desc,
    position: 'bottom',
    visibilityTime: 1500,
  });
};
