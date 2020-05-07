import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { tabBarOptions } from '../constants/navigationStyle';
import FoodGoalsStack from './Stacks/FoodGoalsStack';
import ExerciseGoalsStack from './Stacks/ExerciseGoalsStack';

const BottomTabs = createBottomTabNavigator();

const MyGoalsTabs = props => {
  return (
    <BottomTabs.Navigator tabBarOptions={tabBarOptions}>
      <BottomTabs.Screen
        name="FoodGoals"
        component={FoodGoalsStack}
        options={{
          title: 'Food Goals',
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="ios-beer" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ExerciseGoals"
        component={ExerciseGoalsStack}
        options={{
          title: 'Exercise Goals',
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="ios-bicycle" />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default MyGoalsTabs;
