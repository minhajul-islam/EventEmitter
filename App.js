/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {getUserInfo, saveUserInfo, sendSMS} from './service/SmsService';
import SmsListener from 'react-native-android-sms-listener';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
  Alert,
} from 'react-native';

const App: () => Node = () => {
  useEffect(() => {
    let subscription = SmsListener.addListener(message => {
      Alert.alert('', JSON.stringify({message}, null, 2));
      let verificationCodeRegex = /Your verification code: ([\d]{6})/;

      if (verificationCodeRegex.test(message.body)) {
        let verificationCode = message.body.match(verificationCodeRegex)[1];
        Alert.alert('', JSON.stringify({verificationCode}, null, 2));
      }
    });
    return subscription.remove();
  }, []);

  // Listener for sms delivery
  DeviceEventEmitter.addListener('sms_onDelivery', msg => {
    console.log(msg);
  });

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Header />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    flex: 1,
    paddingHorizontal: 24,
  },
  backgroundStyle: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  sendButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 32,
  },
  status: {
    color: 'red',
  },
});

export default App;
