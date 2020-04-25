import React from 'react';
import { ActivityIndicator } from 'react-native';

import colors from '../utils/colors';


const Spinner = () => (
  <ActivityIndicator
    size="large"
    color={colors.BLACK}
  />
);

export default Spinner;
