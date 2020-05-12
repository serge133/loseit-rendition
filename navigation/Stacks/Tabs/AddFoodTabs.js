import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddFoodScreen from '../../../screens/AddFoodScreen';
import AddFoodManuallyScreen from '../../../screens/AddFoodManuallyScreen';

const Tab = createMaterialTopTabNavigator();

const AddFoodTabs = props => {
  // console.log(props.navigation);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={AddFoodScreen} />
      <Tab.Screen name="AddFoodManually" component={AddFoodManuallyScreen} />
    </Tab.Navigator>
  );
};

export default AddFoodTabs;
