import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExercisesScreen from '../../screens/ExercisesScreen';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/colors';
import AddExerciseScreen from '../../screens/AddExerciseScreen';
import AddExerciseManuallyScreen from '../../screens/AddExerciseManually';

const Stack = createStackNavigator();

const ExercisesStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="Exercise"
        component={ExercisesScreen}
        options={({ navigation, route }) => ({
          title: 'Exercises',
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
              onPress={() => navigation.navigate('AddExercise')}
              iconName="ios-add"
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddExercise"
        component={AddExerciseScreen}
        options={{
          title: 'Add Exercise',
        }}
      />
      <Stack.Screen
        name="AddExerciseManually"
        component={AddExerciseManuallyScreen}
        options={{
          title: 'Add Exercise Manually',
        }}
      />
    </Stack.Navigator>
  );
};

export default ExercisesStack;
