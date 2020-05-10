import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserLogScreen from '../../screens/UserLogScreen';
import AddFoodScreen from '../../screens/AddFoodScreen';
import AddFoodManuallyScreen from '../../screens/AddFoodManuallyScreen';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/colors';
import MealTypeScreen from '../../screens/MealTypeScreen';

import BarcodeFoodScreen from '../../screens/BarcodeFoodScreen';
import DisplayFoodScreen from '../../screens/DisplayFoodScreen';
import { mealOrders } from '../../constants/food';

const Stack = createStackNavigator();

const UserLogStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="UserLog"
        component={UserLogScreen}
        options={({ navigation, route }) => ({
          title: 'Your Log',
          headerLeft: () => (
            <HeaderButton
              headerLeft
              onPress={navigation.toggleDrawer}
              iconName="ios-menu"
            />
          ),
          headerRight: () => (
            <HeaderButton
              headerRight
              onPress={() => navigation.navigate('MealType')}
              iconName="ios-add"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MealType"
        component={MealTypeScreen}
        options={({ navigation, route }) => ({
          title: 'Set Meal Time',
        })}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={({ navigation, route }) => ({
          title: `Add ${mealOrders[route.params.mealOrder]}`,
          headerRight: () => (
            <HeaderButton
              headerRight
              onPress={() =>
                navigation.navigate('FoodBarcodeScan', {
                  mealOrder: route.params.mealOrder,
                })
              }
              iconName="ios-barcode"
            />
          ),
          headerLeft: () => (
            <HeaderButton
              headerLeft
              iconName="ios-home"
              onPress={() => {
                navigation.navigate('UserLog');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="FoodBarcodeScan"
        component={BarcodeFoodScreen}
        options={{
          title: 'Find Food',
        }}
      />
      <Stack.Screen
        name="AddFoodManually"
        component={AddFoodManuallyScreen}
        options={({ navigation, route }) => ({
          title: 'Manually Add Food',
          headerRight: () => (
            <HeaderButton
              headerRight
              onPress={route.params.submitForm}
              iconName="ios-checkmark"
            />
          ),
        })}
      />
      <Stack.Screen
        name="DisplayFood"
        component={DisplayFoodScreen}
        options={({ navigation, route }) => ({
          title: route.params.foodName,
          headerRight:
            route.params.displayType === 'user'
              ? () => (
                  <HeaderButton
                    headerRight
                    onPress={route.params.saveFood}
                    iconName="ios-save"
                  />
                )
              : () => (
                  <HeaderButton
                    headerRight
                    onPress={route.params.submitForm}
                    iconName="ios-checkmark"
                  />
                ),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserLogStack;
