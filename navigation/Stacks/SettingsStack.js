import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/SettingsScreen';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/colors';

const Stack = createStackNavigator();

const SettingsStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation, route }) => ({
          title: 'Settings',
          headerLeft: () => (
            <HeaderButton
              iconName="ios-menu"
              onPress={navigation.toggleDrawer}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
