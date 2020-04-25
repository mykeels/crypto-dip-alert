import React, { memo } from 'react';
import { View } from 'react-native';

const Spacer = ({ width = 50, height = 50 }) => (
  <View style={{ width, height }} />
);

export default memo(Spacer);
