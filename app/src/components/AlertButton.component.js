import React, { memo, useEffect, useState, Fragment } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

import colors from '../utils/colors';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { USER_SETTINGS } from '../utils/constants';
import Spinner from './Spinner.component';

const AlerButton = () => {
  const [isAlertOn, setAlertStatus] = useState(false);
  const errorStyle = { backgroundColor: isAlertOn ? colors.NONE : colors.RED };
  const successStyle = { backgroundColor: isAlertOn ? colors.GREEN : colors.NONE };

  const toggleAlerting = () => setAlertStatus(!isAlertOn);

  return (
    <View style={styles.container}>
      <Text style={styles.alertText}>Alert {isAlertOn ? 'ON' : 'OFF'}</Text>
      <TouchableHighlight style={styles.btnContainer} onPress={toggleAlerting}>
        <Fragment>
          <View style={[styles.btn, errorStyle]} />
          <View style={[styles.btn, successStyle]} />
        </Fragment>
      </TouchableHighlight>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  alertText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  btnContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    height: 30,
    width: 80,
    display: 'flex',
    flexDirection: 'row'
  },
  btn: {
    height: 28,
    width: 40,
  }
})

export default AlerButton;
