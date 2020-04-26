import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../utils/colors';


const CoinCard = (props) => {
  const {
    difference = null,
    price,
    label
  } = props;

  const isIncrease = difference > 0;
  const priceDiffColor = isIncrease ? colors.GREEN : colors.RED;
  const diffStyle = { color: priceDiffColor };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price}</Text>
        {difference && (
          <Text style={[styles.difference, diffStyle]}>
            {isIncrease && '+'}{difference}
          </Text>
        )}
      </View>
      <Text style={styles.coinLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: -10,
    padding: 30,
    shadowColor: colors.BLACK,
    borderWidth: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  coinLabel: {
    color: colors.GREY,
    fontSize: 18,
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginRight: 20
  },
  difference: {
    color: colors.GREEN,
    right: '20%',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default memo(CoinCard);
