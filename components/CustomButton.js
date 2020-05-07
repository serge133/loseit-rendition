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
import Colors from '../constants/colors';

const CustomButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <ButtonComponent onPress={props.onPress} style={styles.buttonContainer}>
      <View style={styles.button}>
        <Ionicons color="white" size={30} name={props.iconName} />
      </View>
    </ButtonComponent>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: Colors.accent,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
