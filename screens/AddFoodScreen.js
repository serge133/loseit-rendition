import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextInput from '../components/CustomTextInput';
import * as foodActions from '../store/actions/food';
import { extractNutrientsFromFoodCentral } from '../functions/extractNutrients';
import FoodItem from '../components/FoodItem';
import { calculateCaloriesFromNutrients } from '../functions/food';

const AddFoodScreen = props => {
  const dispatch = useDispatch();
  const foodList = useSelector(state => state.food.foodList);

  const searchFood = search => {
    // setFoodSearch(search);
    dispatch(foodActions.getFoods(search, 25));
  };

  return (
    <View style={styles.screen}>
      <CustomTextInput
        placeholder="Search Food"
        style={styles.input}
        // value={foodSearch}
        onChangeText={text => searchFood(text)}
      />
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
              displayOnly
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
                  servingUnit: 'grams',
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
  input: {
    width: '100%',
  },
  // search: {
  //   flex: 1,
  // },
  // searchButton: {
  //   borderColor: colors.accent,
  //   borderBottomWidth: 1,
  // },
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
