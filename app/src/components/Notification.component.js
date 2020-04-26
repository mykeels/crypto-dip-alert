import React from 'react';
import { Text } from 'react-native';

import colors from '../utils/colors';


const Notification = ({ type, text }) => {
  const textStyle = {
    color: colors.WHITE,
    backgroundColor: type === 'success' ? colors.GREEN : colors.RED,
    textAlign: 'center',
    minWidth: 150,
    alignSelf: 'center',
    padding: 10,
  };

  return Boolean(text) && (
    <Text style={textStyle}>{text}</Text>
  );
};

export default Notification
