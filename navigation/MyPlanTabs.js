import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UserLogStack from './Stacks/UserLogStack';
import ExerciseStack from './Stacks/ExercisesStack';
import SummaryStack from './Stacks/SummaryStack';
import { tabBarOptions } from '../constants/navigationStyle';

const BottomTabs = createBottomTabNavigator();

const MyPlanTabs = props => {
  return (
    <BottomTabs.Navigator tabBarOptions={tabBarOptions}>
      <BottomTabs.Screen
        name="UserLog"
        component={UserLogStack}
        options={{
          title: 'Your Log',
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="ios-create" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Exercise"
        component={ExerciseStack}
        options={{
          title: 'Exercise',
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="ios-bicycle" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Summary"
        component={SummaryStack}
        options={{
          title: 'Summary',
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="ios-clipboard" />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default MyPlanTabs;
