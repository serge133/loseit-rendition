import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UserLogStack from './Stacks/UserLogStack';
import ExerciseStack from './Stacks/ExercisesStack';
import SummaryStack from './Stacks/SummaryStack';
import {
  tabBarOptions,
  materialTabOptions,
} from '../constants/navigationStyle';
import colors from '../constants/colors';

let BottomTabs = createBottomTabNavigator();

if (Platform.OS === 'android') {
  BottomTabs = createMaterialBottomTabNavigator();
}

const MyPlanTabs = props => {
  return (
    <BottomTabs.Navigator
      tabBarOptions={tabBarOptions}
      options={materialTabOptions}
      activeColor="white"
      shifting={true}
      barStyle={{ backgroundColor: colors.primary }}
    >
      <BottomTabs.Screen
        name="UserLog"
        component={UserLogStack}
        options={{
          title: 'Your Log',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={23}
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Exercise"
        component={ExerciseStack}
        options={{
          title: 'Exercise',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={23}
              name={Platform.OS === 'android' ? 'md-bicycle' : 'ios-bicycle'}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Summary"
        component={SummaryStack}
        options={{
          title: 'Summary',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={23}
              name={
                Platform.OS === 'android' ? 'md-clipboard' : 'ios-clipboard'
              }
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default MyPlanTabs;
