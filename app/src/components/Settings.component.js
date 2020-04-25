import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RadioForm from 'react-native-simple-radio-button';

import colors from '../utils/colors';
import Header from './Header.component';
import Button from './Button.component';


const Settings = () => {
  const choices = ['Cents', 'Percent'];
  const disabled = false;
  const monitoringOptions = choices.map((choice, index) => ({
    label: choice,
    value: index
  }));

  const [monitoringOption, setMonitoringOption] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const coinsToTrack = [
    { abbreviation: 'BTC', value: 'bitcoin' },
    { abbreviation: 'ETH', value: 'ethereum' },
    { abbreviation: 'MIN', value: 'minero' },
    { abbreviation: 'LTC', value: 'litecoin' },
  ];

  const onSubmit = () => {
    console.log('submitting')
  };

  console.log({ threshold, monitoringOption })

  return (
    <View style={styles.container}>
      <Header text="Configure Alert" />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.optionBlock}>
          <Text style={styles.settingsText}>
            How would you like to monitor prices?
          </Text>
          <RadioForm
            initial={0}
            radio_props={monitoringOptions}
            onPress={(value) => setMonitoringOption(value)}
            buttonColor={colors.BLACK}
            labelColor={colors.BLACK}
          />
        </View>

        <View style={styles.optionBlock}>
          <Text style={styles.settingsText}>
            How much dip should we tell you of?
          </Text>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter a number'
              onChangeText={(value) => setThreshold(value)}
              textContentType={'oneTimeCode'}
              keyboardType={'decimal-pad'}
              enablesReturnKeyAutomatically
            />
            <Text style={styles.activeOption}>
              {choices[monitoringOption]}
            </Text>
          </View>
        </View>

        <View style={styles.optionBlock}>
          <Text style={styles.settingsText}>
            What coins do you want to track?
          </Text>
          {coinsToTrack.map((coin, index) => (
            <View style={styles.coinsContainer} key={index}>
              <CheckBox
                value={true}
                disabled={false}
              />
              <Text>
                {coin.abbreviation} ({coin.value})
              </Text>
            </View>
          ))}
        </View>

        <Button
          label={'UPDATE'}
          btnStyle={styles.updateBtn}
          onPress={onSubmit}
          disabled={disabled}
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
  textInput: {
    borderWidth: 2,
    paddingHorizontal: 10,
    marginRight: 5,
    flex: 1
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  activeOption: {
    fontWeight: 'bold',
    fontSize: 20
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Settings;
