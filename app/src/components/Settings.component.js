import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RadioForm from 'react-native-simple-radio-button';

// components
import colors from '../utils/colors';
import Header from './Header.component';
import Button from './Button.component';
import Spinner from './Spinner.component';
import Notification from './Notification.component';

import {
  TRACKING_CHOICES,
  SUPPORTED_COINS,
  USER_SETTINGS,
  TRACKING_SYMBOLS
} from '../utils/constants';

// hooks
import useAsyncStorage from '../hooks/useAsyncStorage';


const Settings = () => {
  const radioButtonRef = useRef(null);
  const [settings, updateSettings] = useAsyncStorage(USER_SETTINGS);
  const monitoringOptions = TRACKING_CHOICES.map((choice, index) => ({
    label: choice,
    value: index
  }));

  const [monitoringOption, setMonitoringOption] = useState(0);
  const [threshold, setThreshold] = useState('');
  const [userCoinsToTrack, setUserCoinsToTrack] = useState([]);
  const [notification, setNotification] = useState({});

  const onSubmit = () => {
    const trackingOption = TRACKING_CHOICES[monitoringOption];

    const isThresholdNotInteger = isNaN(threshold);
    if (isThresholdNotInteger) {
      const text = 'Threshold is not an integer.'
      return setNotification({ type: 'error', text });
    }

    const integerThreshold = parseInt(threshold, 10);
    if (integerThreshold < 0) {
      const text = 'Threshold must be a positive integer'
      return setNotification({ type: 'error', text });
    }

    if (trackingOption === 'Percent' && integerThreshold > 100) {
      const text = 'Threshold cannot be more than 100%'
      return setNotification({ type: 'error', text });
    }

    updateSettings({
      ...settings,
      trackingOption,
      threshold: parseInt(threshold, 10),
      coinsToTrack: userCoinsToTrack
    });
    setNotification({ type: 'success', text: 'Update Successful' });
  };

  const onCheckChange = (coin, value) => {
    if (value) {
      return setUserCoinsToTrack([
        ...userCoinsToTrack,
        coin
      ]);
    }
    const newUserCoins = userCoinsToTrack.filter(userCoin => {
      return userCoin !== coin;
    });
    return setUserCoinsToTrack(newUserCoins)
  }

  useEffect(() => {
    if (settings) {
      const monitorOptionIdx = TRACKING_CHOICES.indexOf(settings.trackingOption);
      radioButtonRef.current.updateIsActiveIndex(monitorOptionIdx);
      setMonitoringOption(monitorOptionIdx);
      setThreshold(settings.threshold.toString());
      setUserCoinsToTrack(settings.coinsToTrack);
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
            initial={monitoringOption}
            ref={radioButtonRef}
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
            const isChecked = userCoinsToTrack.includes(coin.value);

            return (
              <View style={styles.coinsContainer} key={index}>
                <CheckBox value={isChecked} onValueChange={(value) => onCheckChange(coin.value, value)} />
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
        />
        <Notification {...notification} />
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
