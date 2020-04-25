import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import colors from '../utils/colors';
import Header from './Header.component';
import Button from './Button.component';


const Settings = () => {
  const onSubmit = () => {
    console.log('submitting')
  };

  return (
    <View style={styles.container}>
      <Header text="Configure Alert" />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.optionBlock}>
          <Text style={styles.settingsText}>
            How would you like to monitor prices?
          </Text>
        </View>

        <View style={styles.optionBlock}>
          <Text style={styles.settingsText}>
            How much dip should we tell you of?
          </Text>
        </View>

        <View style={styles.optionBlock}>
          <Text style={styles.settingsText}>
            What coins do you want to track?
          </Text>
        </View>

        <Button
          label={'UPDATE'}
          btnStyle={styles.updateBtn}
          onPress={onSubmit}
          disabled
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 10,
  },
  updateBtn: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  settingsText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  optionBlock: {
    marginVertical: 20,
  },
});

export default Settings;
