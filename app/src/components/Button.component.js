import React, { memo } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View
} from 'react-native';

import colors from '../utils/colors';


const Button = ({ label, onPress, btnStyle, disabled }) => {
  const buttonColor = btnStyle.color || colors.BLACK;
  const btnStyleProps = {
    backgroundColor: disabled ? colors.GREY : buttonColor,
    opacity: disabled ? 0.3 : 1,
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={[styles.button, btnStyle, btnStyleProps]}>
        <Text style={styles.buttonText}>
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    padding: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: colors.WHITE
  },
});

export default memo(Button);
