import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import colors from '../constants/colors';

const MealTypeButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.mealType}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MealTypeButton;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 80,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // button: {},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
  },
});
