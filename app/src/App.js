import React, { Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import Layout from './components/Layout.component';
import MainScreen from './screens/Main.screen';
import useAsyncStorage from './hooks/useAsyncStorage';
import { USER_SETTINGS, INITIAL_USER_SETTINGS } from './utils/constants';

const App = () => {
  const initializeSettings = async () => {
    const settings = await AsyncStorage.getItem(USER_SETTINGS);
    if (!settings) {
      const payload = JSON.stringify(INITIAL_USER_SETTINGS);
      await AsyncStorage.setItem(USER_SETTINGS, payload);
    }
    // await AsyncStorage.removeItem(USER_SETTINGS);
  };

  useEffect(() => {
    initializeSettings();
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <Layout>
        <MainScreen />
      </Layout>
    </Fragment>
  );
};

export default App;
