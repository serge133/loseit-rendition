import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SummaryScreen from '../../screens/SummaryScreen';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/colors';

const Stack = createStackNavigator();

const SummaryStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
        options={({ navigation, route }) => ({
          title: 'Summary',
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

export default SummaryStack;
