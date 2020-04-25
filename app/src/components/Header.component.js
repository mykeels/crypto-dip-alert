import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../utils/colors';


const Header = ({ text }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: colors.GREY,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default memo(Header);
