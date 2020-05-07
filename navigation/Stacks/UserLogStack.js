import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserLogScreen from '../../screens/UserLogScreen';
import AddFoodScreen from '../../screens/AddFoodScreen';
import AddFoodManuallyScreen from '../../screens/AddFoodManuallyScreen';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/colors';
import MealTypeScreen from '../../screens/MealTypeScreen';
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
          title: `Add ${route.params.mealType}`,
          headerRight: () => (
            <HeaderButton
              headerRight
              onPress={() => console.log('Barcode Camera Scan!')}
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
        name="AddFoodManually"
        component={AddFoodManuallyScreen}
        options={({ navigation, route }) => ({
          title: 'Manually Add Food',
          headerRight: () => (
            <HeaderButton
              headerRight
              onPress={() => route.params.submitForm()}
              iconName="ios-checkmark"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserLogStack;
