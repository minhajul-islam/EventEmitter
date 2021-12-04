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
  const [user, setUser] = useState();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const userData = {
      name: 'Minhajul Islam',
      phone: '+8801515272948',
      body: 'Hello world',
    };
    saveUserInfo(userData).then(response => {
      console.log(response);
    });
  };

  // Get user info
  const onHandleGetUser = async () => {
    const userData = await getUserInfo();
    setUser(userData);
  };

  // Send message to user
  const onHandleSend = async () => {
    if (user) {
      const {phone, body} = user;
      await sendSMS(phone, body);
    }
  };

  // Update user info
  const updateUserInfo = deliveryStatus => {
    getUserInfo().then(userData => {
      userData.deliveryStatus = deliveryStatus;
      saveUserInfo(userData).then(response => {
        Alert.alert('SMS Alert', JSON.stringify(userData));
      });
    });
  };

  // Listener for sms delivery
  DeviceEventEmitter.addListener('sms_onDelivery', msg => {
    console.log(msg);
    if (msg.toString() === 'SMS delivered') {
      updateUserInfo(true);
    }
  });

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Header />
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={onHandleGetUser}>
            <Text>Get User</Text>
          </TouchableOpacity>
          <Text style={styles.status}>
            {user ? JSON.stringify(user) : 'Get use first'}
          </Text>
          {user && (
            <TouchableOpacity style={styles.sendButton} onPress={onHandleSend}>
              <Text>Send Message</Text>
            </TouchableOpacity>
          )}
        </View>
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
