import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../utils/colors';
import Header from './Header.component';


const Settings = () => {
  const [formFields, setFormFields] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { threshold: 0 }
  );

  return (
    <View style={styles.container}>
      <Header text="Configure Alert" />
      <ScrollView styles={styles.formContainer}>
        <Text>{formFields.threshold}</Text>
        <Text>{formFields.threshold}</Text>
        <Text>{formFields.threshold}</Text>
      </ScrollView>
      <Text>Done</Text>
      <Text>Done</Text>
      <Text>Done</Text>
      <Text>Done</Text>
      <Text>Done</Text>
      <Text>Done</Text>
      <Text>Done</Text>
      <Text>Done</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: 'red',
    flex: 1,
    paddingHorizontal: 20,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default Settings;
