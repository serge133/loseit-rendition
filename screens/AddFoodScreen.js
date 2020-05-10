import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextInput from '../components/CustomTextInput';
import colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import * as foodActions from '../store/actions/food';
import { extractNutrientsFromFoodCentral } from '../functions/extractNutrients';
import FoodItem from '../components/FoodItem';
import calculateCaloriesFromNutrients from '../functions/calculateCaloriesFromNutrients';

const AddFoodScreen = props => {
  const [foodSearch, setFoodSearch] = useState('');
  const dispatch = useDispatch();
  const foodList = useSelector(state => state.food.foodList);

  const searchFood = () => {
    dispatch(foodActions.getFoods(foodSearch, 50));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <CustomTextInput
          placeholder="Search Food"
          style={styles.input}
          onChangeText={text => setFoodSearch(text)}
        />
        <CustomButton
          style={styles.searchButton}
          iconName="ios-search"
          onPress={searchFood}
        />
      </View>
      <Button
        title="Add Food Manually"
        color={colors.accent}
        onPress={() => {
          props.navigation.navigate('AddFoodManually', {
            submitForm: () => {},
            mealOrder: props.route.params.mealOrder,
          });
        }}
      />
      <Text>Serving size is 100g</Text>
      <FlatList
        keyExtractor={item => item.fdcId.toString()}
        data={foodList}
        renderItem={itemData => {
          const calories = calculateCaloriesFromNutrients(
            extractNutrientsFromFoodCentral(itemData.item.foodNutrients)
          );
          return (
            <FoodItem
              description={itemData.item.description}
              brandOwner={itemData.item.brandOwner}
              calories={calories}
              handlePress={() => {
                props.navigation.navigate('DisplayFood', {
                  mealOrder: props.route.params.mealOrder,
                  foodName: itemData.item.description,
                  brandOwner: itemData.item.brandOwner,
                  servingSize: 100,
                  foodNutrients: extractNutrientsFromFoodCentral(
                    itemData.item.foodNutrients
                  ),
                  ingredients: itemData.item.ingredients,
                  foodAmount: 100,
                  displayType: 'adding',
                });
              }}
            />
          );
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
    justifyContent: 'space-between',
  },
  input: {
    width: '80%',
  },
  search: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: 'white',
    borderColor: colors.accent,
    borderBottomWidth: 1,
  },
  // foodSearchItem: {
  //   paddingHorizontal: 5,
  //   paddingVertical: 10,
  //   backgroundColor: 'white',
  //   borderBottomColor: colors.accent,
  //   borderBottomWidth: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // foodDetails: {
  //   flex: 3,
  //   borderRightColor: colors.accent,
  //   borderRightWidth: 1,
  // },
  // brandOwner: {
  //   color: colors.primary,
  // },
  // calories: {
  //   flex: 1,
  //   color: colors.primary,
  //   textAlign: 'center',
  //   fontSize: 16,
  // },
});
