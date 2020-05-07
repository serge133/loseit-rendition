import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const HeaderButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View
      style={{
        marginLeft: props.headerLeft && 10,
        marginRight: props.headerRight && 10,
      }}
    >
      <ButtonComponent onPress={props.onPress}>
        <Ionicons name={props.iconName} color={Colors.primary} size={30} />
      </ButtonComponent>
    </View>
  );
};

export default HeaderButton;

// const styles = StyleSheet.create({});
