import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FoodGoalsScreen from '../../screens/FoodGoalsScreen';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/colors';

const Stack = createStackNavigator();

const FoodGoalsStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="FoodGoals"
        component={FoodGoalsScreen}
        options={({ navigation, route }) => ({
          title: 'Food Goals',
          headerLeft: () => (
            <HeaderButton
              headerLeft
              onPress={navigation.toggleDrawer}
              iconName="ios-menu"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default FoodGoalsStack;
