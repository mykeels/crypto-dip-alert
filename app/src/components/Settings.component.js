import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RadioForm from 'react-native-simple-radio-button';

import colors from '../utils/colors';
import Header from './Header.component';
import Button from './Button.component';
import {
  TRACKING_CHOICES,
  SUPPORTED_COINS,
  USER_SETTINGS,
  TRACKING_SYMBOLS
} from '../utils/constants';
import useAsyncStorage from '../hooks/useAsyncStorage';
import Spinner from './Spinner.component';


const Settings = () => {
  const [settings, updateSettings] = useAsyncStorage(USER_SETTINGS);

  const disabled = false;
  const monitoringOptions = TRACKING_CHOICES.map((choice, index) => ({
    label: choice,
    value: index
  }));

  const [monitoringOption, setMonitoringOption] = useState(0);
  const [threshold, setThreshold] = useState('');

  const onSubmit = () => {
    console.log('submitting')
  };

  useEffect(() => {
    if (settings) {
      setMonitoringOption(TRACKING_CHOICES.indexOf(settings.trackingOption));
      setThreshold(settings.threshold.toString());
    }
  }, [settings]);

  if (!settings) {
    return (
      <View style={{flex: 1}}>
        <Spinner />
      </View>
    )
  }

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
              value={threshold}
            />
            <Text style={styles.activeOption}>
              {TRACKING_SYMBOLS[monitoringOption]}
            </Text>
          </View>
        </View>

        <View style={styles.optionBlock}>
          <Text style={styles.settingsText}>
            What coins do you want to track?
          </Text>
          {SUPPORTED_COINS.map((coin, index) => {
            const isChecked = settings.coinsToTrack.includes(coin.value);
            return (
              <View style={styles.coinsContainer} key={index}>
                <CheckBox value={isChecked} />
                <Text>
                  {coin.abbreviation} ({coin.value})
                </Text>
              </View>
            );
          })}
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
    fontSize: 20,
    width: 15,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Settings;
