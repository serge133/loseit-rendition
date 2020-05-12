import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyPlanTabs from './MyPlanTabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import SettingsStack from './Stacks/SettingsStack';
import MyGoalsTabs from './MyGoalsTabs';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: colors.accent,
      }}
    >
      <Drawer.Screen
        name="MyPlan"
        component={MyPlanTabs}
        options={{
          title: 'My Plan',
          drawerIcon: ({ color }) => (
            <Ionicons
              color={color}
              size={23}
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MyGoals"
        component={MyGoalsTabs}
        options={{
          title: 'My Goals',
          drawerIcon: ({ color }) => (
            <Ionicons
              color={color}
              size={23}
              name={
                Platform.OS === 'android'
                  ? 'md-checkmark-circle-outline'
                  : 'ios-checkmark-circle-outline'
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => (
            <Ionicons
              color={color}
              size={23}
              name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
