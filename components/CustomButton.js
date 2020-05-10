import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const CustomButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>
          <Ionicons color={colors.accent} size={30} name={props.iconName} />
        </View>
      </ButtonComponent>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  button: {
    // backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
