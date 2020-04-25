import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import WS from 'react-native-websocket';

// components
import AlertButton from './AlertButton.component';
import CoinCard from './CoinCard.component';
import Spacer from './Spacer.component';
import Spinner from './Spinner.component';

// utils
import colors from '../utils/colors';
import { USER_SETTINGS } from '../utils/constants';

// hooks
import useAsyncStorage from '../hooks/useAsyncStorage';

const Home = () => {
  const websocketRef = useRef(null);
  const [coinDetails, setCoinDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setIsRefreshing] = useState(false);
  const [settings, updateSettings] = useAsyncStorage(USER_SETTINGS);
  const baseUrl = 'https://api.coincap.io/v2/rates';

  const fetchPrices = async () => {
    const result = await Promise
      .all(settings.coinsToTrack.map((coin) => {
        return fetch(`${baseUrl}/${coin}`, { method: 'GET' })
          .then(res => res.json())
      }));

    setCoinDetails(result);
    setIsLoading(false);
    refreshing && setIsRefreshing(false);
  }

  useEffect(() => {
    if (settings) {
      fetchPrices();
    }
  }, [settings]);

  console.log(settings, ",==== home")
  if (isLoading) return <Spinner />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={fetchPrices} />}
    >
      <AlertButton />
      <Spacer height={70} />

      <View style={styles.helpTextContainer}>
        <Icon
          name="refresh"
          color={colors.GREY}
          size={15}
          style={styles.helpIcon}
        />
        <Text style={styles.helpText}>
        Drag the screen down to refresh
        </Text>
      </View>
      {isLoading ? <Spinner /> : coinDetails.map(({ data }) => {
        const { id, currencySymbol, symbol, rateUsd } = data;

        let label = `${symbol}`;
        if (currencySymbol) label += ` ${currencySymbol}`;
        const price = parseFloat(rateUsd).toFixed(2);

        return (
          <CoinCard price={price} label={label} key={id} />
        )
      })}
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
    backgroundColor: 'transparent'
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
