import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Button from './Button.component';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Button />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  }
})

export default Home;
