import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import colors from '../constants/colors';
import CustomButton from '../components/CustomButton';

const AddFoodScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <CustomTextInput placeholder="Search Food" style={styles.input} />
        <CustomButton iconName="ios-search" onPress={() => {}} />
      </View>
      <Button
        title="Add Food Manually"
        color={colors.accent}
        onPress={() => {
          props.navigation.navigate('AddFoodManually');
        }}
      />
    </View>
  );
};

export default AddFoodScreen;

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
});
