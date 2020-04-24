import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import Home from '../components/Home.component';
import Settings from '../components/Settings.component';

// utils
import { HOME_SCREEN, SETTINGS_SCREEN } from '../utils/constants';
import colors from '../utils/colors';


const Tab = createBottomTabNavigator();

function MainScreen() {
  const tabBarOptions = {
    activeTintColor: colors.BLACK,
    labelPosition: 'beside-icon',
  };

  const homeBarOptions = {
    tabBarIcon: ({ color, size }) => (
      <Icon name="home" color={color} size={size} />
    ),
    tabBarLabel: 'Home',
  };

  const settingsBarOptions = {
    tabBarIcon: ({ color, size }) => (
      <Icon name="settings-outline" color={color} size={size} />
    ),
    tabBarLabel: 'Settings',
  };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={HOME_SCREEN} tabBarOptions={tabBarOptions}>
        <Tab.Screen name={HOME_SCREEN} component={Home} options={homeBarOptions} />
        <Tab.Screen name={SETTINGS_SCREEN} component={Settings} options={settingsBarOptions} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainScreen;
