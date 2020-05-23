import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

import colors from '../utils/colors';

const Notification = ({visible, onTimeout, type, text}) => {
  const [isVisible, setVisible] = useState(false);

  const duration = 5000;

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  const textStyle = {
    color: colors.WHITE,
    backgroundColor: type === 'success' ? colors.GREEN : colors.RED,
    textAlign: 'center',
    minWidth: 200,
    alignSelf: 'center',
    padding: 16,
  };

  if (duration) {
    setTimeout(() => {
      setVisible(false);

      if (onTimeout) {
        onTimeout(false);
      }
    }, duration);
  }

  return Boolean(text) && <Text style={textStyle}>{text}</Text>;
};

export default Notification;
