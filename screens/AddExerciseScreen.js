import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';

const AddExerciseScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <CustomTextInput placeholder="Search Exercises" style={styles.input} />
        <CustomButton
          style={styles.searchButton}
          iconName="ios-search"
          onPress={() => {}}
        />
      </View>
      <Button
        color={colors.accent}
        title="Add Exercise Manually"
        onPress={() => {
          props.navigation.navigate('AddExerciseManually');
        }}
      />
    </View>
  );
};

export default AddExerciseScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    width: '80%',
  },
  search: {},
  searchButton: {
    backgroundColor: 'white',
    borderColor: colors.accent,
    borderBottomWidth: 1,
    flex: 1,
  },
});
