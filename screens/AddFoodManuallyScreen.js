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

  const submitForm = useCallback(() => {
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
    props.navigation.goBack();
  }, [
    foodName,
    mealOrder.current,
    foodDescription,
    foodCalories,
    gramsFat,
    gramsCarbs,
    gramsProtein,
    servingSize,
    formType,
    formFoodNutrients,
    averageNutrientsFromCalories,
    date,
  ]);

  useEffect(() => {
    props.navigation.setParams({
      submitForm: submitForm,
    });
  }, [submitForm]);

  return (
    <View style={styles.screen}>
      <View style={styles.inputSwitch}>
        <View
          style={
            formType === 'macronutrient'
              ? styles.formSwitchButtonInactive
              : styles.formSwitchButton
          }
        >
          <ButtonComponent
            onPress={() => setFormType('calorie')}
            disabled={formType === 'calorie' && true}
          >
            <Text style={styles.inputSwitchButtonText}>Calories</Text>
          </ButtonComponent>
        </View>
        <View
          style={
            formType === 'calorie'
              ? styles.formSwitchButtonInactive
              : styles.formSwitchButton
          }
        >
          <ButtonComponent
            onPress={() => setFormType('macronutrient')}
            disabled={formType === 'macronutrient' && true}
          >
            <Text style={styles.inputSwitchButtonText}>Macronutrients</Text>
          </ButtonComponent>
        </View>
      </View>
      <TextInput
        placeholder="Food Name"
        onChangeText={text => setFoodName(text)}
        keyboardType="default"
        autoCapitalize="words"
        autoCorrect
        returnKeyType="next"
      />
      <Text>Food Catogory</Text>
      <TextInput
        placeholder="Food Description"
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
            onChangeText={text => setFoodCalories(text)}
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        </View>
      ) : (
        <View style={styles.macronutrientForm}>
          <TextInput
            placeholder="Grams of Fat"
            onChangeText={text => setGramsFat(text)}
            keyboardType="decimal-pad"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
          />
          <TextInput
            placeholder="Frams of Carbs"
            onChangeText={text => setGramsCarbs(text)}
            keyboardType="decimal-pad"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
          />
          <TextInput
            placeholder="Grams of Protein"
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
        onChangeText={text => setServingSize(text)}
        value={servingSize}
        keyboardType="decimal-pad"
        returnKeyType="done"
      />
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
  },
  formSwitchButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 10,
  },
  formSwitchButtonInactive: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 10,
    opacity: 0.3,
  },
  inputSwitchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
