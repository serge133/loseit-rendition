import React, { useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as foodActions from '../store/actions/food';
import colors from '../constants/colors';
import FoodItem from '../components/FoodItem';
import { getUserFoods } from '../store/actions/food';
import { mealOrders } from '../constants/food';
import { Ionicons } from '@expo/vector-icons';
import calculateCaloriesFromNutrients from '../functions/calculateCaloriesFromNutrients';

const MyPlanScreen = props => {
  const userFoodList = useSelector(state => state.food.userFoodList);
  const dispatch = useDispatch();
  // * Database call to get user foods
  useEffect(() => {
    dispatch(getUserFoods());
  }, []);

  const sortUserFoodListByMealOrder = userFoodList.sort(
    (a, b) => a.mealOrder - b.mealOrder
  );

  const renderSeperator = (index, mealOrder) => {
    if (index === 0)
      return (
        <View style={styles.seperator}>
          <Text style={styles.seperatorText}>{mealOrders[mealOrder]}</Text>
        </View>
      );
    if (sortUserFoodListByMealOrder[index - 1].mealOrder !== mealOrder) {
      return (
        <View style={styles.seperator}>
          <Text style={styles.seperatorText}>{mealOrders[mealOrder]}</Text>
        </View>
      );
    }
    return;
  };

  if (userFoodList.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Ionicons name="ios-beer" size={40} color={colors.accent} />
        <Text style={styles.emptyScreenText}>START THE DAY</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={sortUserFoodListByMealOrder}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <Fragment>
            {renderSeperator(itemData.index, itemData.item.mealOrder)}
            <FoodItem
              handlePress={() => {
                props.navigation.navigate('DisplayFood', {
                  foodId: itemData.item.id,
                  foodName: itemData.item.foodName,
                  brandOwner: itemData.item.brandOwner,
                  servingSize: itemData.item.servingSize,
                  foodNutrients: itemData.item.foodNutrients,
                  ingredients: '',
                  foodAmount: itemData.item.foodAmount,
                  displayType: 'user',
                });
              }}
              description={itemData.item.foodName}
              brandOwner={itemData.item.brandOwner}
              calories={calculateCaloriesFromNutrients(
                itemData.item.foodNutrients
              )}
              handleDelete={() => {
                dispatch(foodActions.deleteFoodItem(itemData.item.id));
              }}
            />
          </Fragment>
        )}
      />
    </View>
  );
};

export default MyPlanScreen;

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyScreenText: {
    color: '#ccc',
  },
  screen: {
    flex: 1,
  },
  seperator: {
    width: '100%',
    backgroundColor: colors.accent,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  seperatorText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
