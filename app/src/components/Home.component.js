import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AlertButton from './AlertButton.component';
import CoinCard from './CoinCard.component';
import Spacer from './Spacer.component';
import colors from '../utils/colors';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <AlertButton />
      <Spacer height={50} />
      <CoinCard />
      <CoinCard />
      <View style={styles.helpTextContainer}>
        <Icon
          name="help-circle"
          color={colors.GREY}
          size={15}
          style={styles.helpIcon}
        />
        <Text style={styles.helpText}>
          Go to settings to configure notifications.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  helpText: {
    color: colors.GREY,
    textAlign: 'center'
  },
  helpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpIcon: {
    marginRight: 5,
  },
});

export default Home;
