import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as foodActions from '../../store/actions/food';
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

import moment from 'moment';
import { dateFormat } from '../../constants/food';
import AddFoodTabs from './Tabs/AddFoodTabs';

const Stack = createStackNavigator();

const UserLogStack = props => {
  const date = useSelector(state => state.food.displayUserFoodListDate);
  const dispatch = useDispatch();
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
          title: date,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View style={styles.headerRow}>
              <HeaderButton
                onPress={navigation.toggleDrawer}
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              />
              <HeaderButton
                style={{ marginLeft: 10 }}
                iconName={
                  Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'
                }
                onPress={() => {
                  const decrementedDate = moment(date, dateFormat)
                    .subtract(1, 'days')
                    .format(dateFormat);
                  dispatch(foodActions.getUserFoods(decrementedDate));
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRow}>
              <HeaderButton
                style={{ marginRight: 10 }}
                iconName={
                  Platform.OS === 'android'
                    ? 'md-arrow-forward'
                    : 'ios-arrow-forward'
                }
                onPress={() => {
                  const incrementedDate = moment(date, dateFormat)
                    .add(1, 'days')
                    .format(dateFormat);
                  dispatch(foodActions.getUserFoods(incrementedDate));
                }}
              />
              <HeaderButton
                onPress={() => navigation.navigate('MealType')}
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="MealType"
        component={MealTypeScreen}
        options={({ navigation, route }) => ({
          title: 'Set Meal Time',
          headerBackTitle: 'Your Log',
        })}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={({ navigation, route }) => ({
          title: `Add ${mealOrders[route.params.mealOrder]}`,
          headerRight: () => (
            <HeaderButton
              onPress={() =>
                navigation.navigate('FoodBarcodeScan', {
                  mealOrder: route.params.mealOrder,
                })
              }
              iconName={
                Platform.OS === 'android' ? 'md-barcode' : 'ios-barcode'
              }
            />
          ),
          headerLeft: () => (
            <HeaderButton
              iconName={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
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
              onPress={route.params.submitForm}
              iconName={
                Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
              }
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
                    onPress={route.params.saveFood}
                    iconName={
                      Platform.OS === 'android' ? 'md-save' : 'ios-save'
                    }
                  />
                )
              : () => (
                  <HeaderButton
                    onPress={route.params.submitForm}
                    iconName={
                      Platform.OS === 'android'
                        ? 'md-checkmark'
                        : 'ios-checkmark'
                    }
                  />
                ),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserLogStack;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
  },
});
