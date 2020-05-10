import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
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

const AddFoodManuallyScreen = props => {
  const dispatch = useDispatch();
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [gramsFat, setGramsFat] = useState('');
  const [gramsCarbs, setGramsCarbs] = useState('');
  const [gramsProtein, setGramsProtein] = useState('');
  const [gramsFiber, setGramsFiber] = useState('');
  const [gramsSugar, setGramsSugar] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [formType, setFormType] = useState('calories');
  const mealOrder = useRef(props.route.params.mealOrder);

  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  const submitForm = useCallback(() => {
    console.log('Submiting!');
    props.navigation.goBack();
  }, [
    foodName,
    mealOrder.current,
    foodDescription,
    foodCalories,
    gramsFat,
    gramsCarbs,
    gramsProtein,
    gramsFiber,
    gramsSugar,
    servingSize,
    formType,
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
            formType === 'macronutrients'
              ? styles.formSwitchButtonInactive
              : styles.formSwitchButton
          }
        >
          <ButtonComponent
            onPress={() => setFormType('calories')}
            disabled={formType === 'calories' && true}
          >
            <Text style={styles.inputSwitchButtonText}>Calories</Text>
          </ButtonComponent>
        </View>
        <View
          style={
            formType === 'calories'
              ? styles.formSwitchButtonInactive
              : styles.formSwitchButton
          }
        >
          <ButtonComponent
            onPress={() => setFormType('macronutrients')}
            disabled={formType === 'macronutrients' && true}
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
      {formType === 'calories' ? (
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
        placeholder="Grams of Fiber"
        onChangeText={text => setGramsFiber(text)}
        keyboardType="decimal-pad"
        returnKeyType="next"
      />
      <TextInput
        placeholder="Grams of Sugar"
        onChangeText={text => setGramsSugar(text)}
        keyboardType="decimal-pad"
        returnKeyType="next"
      />
      <TextInput
        placeholder="Serving Size (Grams)"
        onChangeText={text => setServingSize(text)}
        keyboardType="decimal-pad"
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
