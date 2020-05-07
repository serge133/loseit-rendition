import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseGoalsScreen from '../../screens/ExerciseGoalsScreen';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/colors';

const Stack = createStackNavigator();

const ExerciseGoalsStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="ExerciseGoals"
        component={ExerciseGoalsScreen}
        options={({ navigation, route }) => ({
          title: 'Exercise Goals',
          headerLeft: () => (
            <HeaderButton
              headerLeft
              iconName="ios-menu"
              onPress={navigation.toggleDrawer}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default ExerciseGoalsStack;
