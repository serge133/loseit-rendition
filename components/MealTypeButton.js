import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
} from 'react-native';
import Colors from '../constants/colors';

const MealTypeButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <ButtonComponent onPress={props.onPress} style={styles.buttonContainer}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.mealType}</Text>
      </View>
    </ButtonComponent>
  );
};

export default MealTypeButton;

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 120,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  // button: {},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
