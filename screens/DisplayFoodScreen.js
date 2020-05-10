import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import * as foodActions from '../store/actions/food';
import colors from '../constants/colors';
import Card from '../components/Card';
import calculateCaloriesFromNutrients from '../functions/calculateCaloriesFromNutrients';
import calculateNutrients from '../functions/calculateNutrients';
import CustomTextInput from '../components/CustomTextInput';

const DisplayFoodScreen = props => {
  const {
    foodId,
    foodName,
    brandOwner,
    mealOrder,
    foodCategory,
    servingSize,
    foodNutrients,
    ingredients,
    foodAmount,
    // adding or user
    displayType,
  } = props.route.params;
  const dispatch = useDispatch();

  const [nutrients, setNutrients] = useState(
    // ! calculateNutrients(foodAmount, servingSize, foodNutrients)
    foodNutrients
  );
  const [grams, setGrams] = useState(foodAmount);

  // Only if the food item is being added
  const submitForm = useCallback(() => {
    dispatch(
      foodActions.addFoodItem(
        foodName,
        brandOwner,
        mealOrder,
        'foodCategory',
        '',
        servingSize,
        nutrients,
        grams
      )
    );
    props.navigation.goBack();
  }, [foodName, brandOwner, mealOrder, grams, nutrients, servingSize]);

  // Only if the user has the food
  const saveFood = useCallback(() => {
    dispatch(foodActions.editFoodItem(foodId, grams, nutrients));
    props.navigation.goBack();
  }, [foodId, grams, nutrients]);

  useEffect(() => {
    props.navigation.setParams({
      submitForm: submitForm,
      saveFood: saveFood,
    });
  }, [submitForm, saveFood]);

  const handleChangeFoodAmount = text => {
    setNutrients(calculateNutrients(parseInt(text), foodAmount, foodNutrients));
    setGrams(text);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.nutritionLabel}>
        <Text>{foodCategory}</Text>
        <Text style={styles.foodCalories}>
          {calculateCaloriesFromNutrients(nutrients)}
        </Text>
        <Text>Serving Size: {servingSize} grams/ml</Text>
        <ScrollView style={styles.macronutrients}>
          {nutrients.map(fn => (
            <Text key={fn.nutrientName} style={styles[fn.nutrientName]}>
              {fn.nutrientName}: {Math.round(fn.value)} grams
            </Text>
          ))}
          <Text>Ingredients: {ingredients}</Text>
          <CustomTextInput
            keyboardType="decimal-pad"
            value={grams.toString()}
            style={styles.input}
            onChangeText={text => handleChangeFoodAmount(text)}
          />
        </ScrollView>
      </Card>
    </View>
  );
};

export default DisplayFoodScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutritionLabel: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foodCalories: {
    color: colors.primary,
    fontSize: 20,
  },
  macronutrients: {
    padding: 10,
  },
  Calories: {
    fontSize: 20,
    color: colors.primary,
  },
  servingSizeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
  },
});
