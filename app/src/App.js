import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import Layout from './components/Layout.component';
import MainScreen from './screens/Main.screen';
import useAsyncStorage from './hooks/useAsyncStorage';
import { USER_SETTINGS, INITIAL_USER_SETTINGS } from './utils/constants';

const App = () => {
  // const [settings, setSettings] = useAsyncStorage(USER_SETTINGS);
  // console.log(settings, 'setttt')
  // if (!settings) setSettings(INITIAL_USER_SETTINGS);

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
