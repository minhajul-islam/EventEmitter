import {Alert} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendSMS = async (phone, message) => {
  SmsAndroid.autoSend(
    phone,
    message,
    fail => {
      Alert.alert(
        'SMS Alert',
        'Something went wrong. Maye be permission/mobile balance problem',
      );
      console.log('Failed with this error: ' + fail);
    },
    success => {
      console.log('SMS sent successfully');
    },
  );
};

export const getUserInfo = async () => {
  const userData = await AsyncStorage.getItem('user');
  return JSON.parse(userData);
};

export const saveUserInfo = async user => {
  if (user && user?.name && user?.phone && user?.body) {
    AsyncStorage.setItem('user', JSON.stringify(user));
    return true;
  } else {
    Alert.alert('User Info', 'Something went wrong.');
    return false;
  }
};
