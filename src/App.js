import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import Layout from './components/Layout.component';
import MainScreen from './screens/Main.screen';

const App = () => {
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
