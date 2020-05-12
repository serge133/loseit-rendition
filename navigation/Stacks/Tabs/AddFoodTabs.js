import React from 'react';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddFoodScreen from '../../../screens/AddFoodScreen';
import AddFoodManuallyScreen from '../../../screens/AddFoodManuallyScreen';
import FavoriteFoodsScreen from '../../../screens/FavoriteFoodsScreen';

import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/colors';

const Tab = createMaterialTopTabNavigator();

const AddFoodTabs = props => {
  // console.log(props.navigation);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: colors.accent,
        // pressColor: colors.accent,
        inactiveTintColor: colors.primary,
        indicatorStyle: {
          backgroundColor: colors.accent,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={AddFoodScreen}
        options={{
          // title: 'Add Food',
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={23}
              color={color}
              name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
            />
          ),
        }}
        initialParams={{
          mealOrder: props.route.params.mealOrder,
        }}
      />
      <Tab.Screen
        name="FavoriteFoods"
        component={FavoriteFoodsScreen}
        options={{
          // title: 'Add Food',
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={23}
              color={color}
              name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
            />
          ),
        }}
        initialParams={{
          mealOrder: props.route.params.mealOrder,
        }}
      />
      <Tab.Screen
        name="AddFoodManually"
        component={AddFoodManuallyScreen}
        options={{
          // title: 'Add Food',
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={23}
              color={color}
              name={
                Platform.OS === 'android'
                  ? 'md-add-circle-outline'
                  : 'ios-add-circle-outline'
              }
            />
          ),
        }}
        initialParams={{
          mealOrder: props.route.params.mealOrder,
        }}
      />
    </Tab.Navigator>
  );
};

export default AddFoodTabs;
