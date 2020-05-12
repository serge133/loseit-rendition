import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as foodActions from '../store/actions/food';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import TextInput from '../components/CustomTextInput';
import colors from '../constants/colors';
import {
  averageNutrientsFromCalories,
  formFoodNutrients,
} from '../functions/food';
import CustomButton from '../components/CustomButton';

const AddFoodManuallyScreen = props => {
  const dispatch = useDispatch();
  const date = useSelector(state => state.food.displayUserFoodListDate);
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [gramsFat, setGramsFat] = useState('');
  const [gramsCarbs, setGramsCarbs] = useState('');
  const [gramsProtein, setGramsProtein] = useState('');
  const [servingSize, setServingSize] = useState('100');
  const [formType, setFormType] = useState('calorie');
  const mealOrder = useRef(props.route.params.mealOrder);

  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  const submitForm = () => {
    let foodNutrients = averageNutrientsFromCalories(parseInt(foodCalories));
    if (formType === 'macronutrient') {
      foodNutrients = formFoodNutrients(gramsFat, gramsCarbs, gramsProtein);
    }
    dispatch(
      foodActions.addFoodItem(
        foodName,
        '',
        mealOrder.current,
        '',
        foodDescription,
        servingSize,
        foodNutrients,
        servingSize,
        'grams',
        date
      )
    );
    setFoodName('');
    setFoodDescription('');
    setFoodCalories('');
    setGramsFat('');
    setGramsCarbs('');
    setGramsProtein('');
    setServingSize('100');
    props.navigation.navigate('Search');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputSwitch}>
        <CustomButton
          onPress={() => setFormType('calorie')}
          disabled={formType === 'calorie' && true}
          style={
            formType === 'macronutrient'
              ? styles.formSwitchButtonInactive
              : styles.formSwitchButton
          }
          title="Calories"
        />

        <CustomButton
          onPress={() => setFormType('macronutrient')}
          disabled={formType === 'macronutrient' && true}
          style={
            formType === 'calorie'
              ? styles.formSwitchButtonInactive
              : styles.formSwitchButton
          }
          title="Macronutrients"
        />
      </View>
      <TextInput
        placeholder="Food Name"
        value={foodName}
        onChangeText={text => setFoodName(text)}
        keyboardType="default"
        autoCapitalize="words"
        autoCorrect
        returnKeyType="next"
      />
      <Text>Food Catogory</Text>
      <TextInput
        placeholder="Food Description"
        value={foodDescription}
        onChangeText={text => setFoodDescription(text)}
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
      />
      {formType === 'calorie' ? (
        <View style={styles.caloriesForm}>
          <TextInput
            placeholder="Calories"
            value={foodCalories}
            onChangeText={text => setFoodCalories(text)}
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        </View>
      ) : (
        <View style={styles.macronutrientForm}>
          <TextInput
            placeholder="Grams of Fat"
            value={gramsFat}
            onChangeText={text => setGramsFat(text)}
            keyboardType="decimal-pad"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
          />
          <TextInput
            placeholder="Frams of Carbs"
            value={gramsCarbs}
            onChangeText={text => setGramsCarbs(text)}
            keyboardType="decimal-pad"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
          />
          <TextInput
            placeholder="Grams of Protein"
            value={gramsProtein}
            onChangeText={text => setGramsProtein(text)}
            keyboardType="decimal-pad"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
          />
        </View>
      )}
      <TextInput
        placeholder="Serving Size (Grams)"
        value={servingSize}
        onChangeText={text => setServingSize(text)}
        value={servingSize}
        keyboardType="decimal-pad"
        returnKeyType="done"
      />
      <CustomButton title="Ok" onPress={submitForm} />
    </View>
  );
};

export default AddFoodManuallyScreen;

const styles = StyleSheet.create({
  inputSwitch: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
  },
  formSwitchButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accent,
    // paddingVertical: 20,
  },
  formSwitchButtonInactive: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accent,
    // paddingVertical: 20,
    opacity: 0.3,
  },
  inputSwitchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
