import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Colors from '../constants/colors';

const CustomTextInput = props => {
  return (
    <View style={{ ...styles.inputContainer, ...props.style }}>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
});
