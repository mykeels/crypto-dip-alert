import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../utils/colors';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { USER_SETTINGS } from '../utils/constants';
import Spinner from './Spinner.component';

const Button = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // console.log(alerting, '<=== button')
  const errorStyle = { backgroundColor: true ? colors.NONE : colors.RED };
  const successStyle = { backgroundColor: true ? colors.GREEN : colors.NONE };

  // useEffect(() => {
  //   // const [{ alerting }] = useAsyncStorage(USER_SETTINGS);
  //   console.log(alerting);
  //   setIsLoading(false);
  // }, [isLoading]);

  if (true) return <Spinner />;

  return (
    <View style={styles.container}>
      <View style={[styles.btn, errorStyle]} />
      <View style={[styles.btn, successStyle]} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    // paddingVertical: 2,
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

export default Button;
