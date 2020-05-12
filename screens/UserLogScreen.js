import React, { useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as foodActions from '../store/actions/food';
import colors from '../constants/colors';
import FoodItem from '../components/FoodItem';
import { getUserFoods } from '../store/actions/food';
import { mealOrders } from '../constants/food';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { dateFormat } from '../constants/food';

const MyPlanScreen = props => {
  const userFoodList = useSelector(state => state.food.userFoodList);
  const dispatch = useDispatch();
  const date = useSelector(state => state.food.displayUserFoodListDate);
  // * Database call to get user foods
  useEffect(() => {
    dispatch(getUserFoods(moment().format(dateFormat)));
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
                  servingUnit: itemData.item.servingUnit,
                });
              }}
              description={itemData.item.foodName}
              brandOwner={itemData.item.brandOwner}
              calories={itemData.item.calories}
              handleDelete={() => {
                dispatch(foodActions.deleteFoodItem(itemData.item.id, date));
              }}
              handleFavorite={() =>
                dispatch(
                  foodActions.toggleFavorite(
                    itemData.item.id,
                    itemData.item.isFavorite,
                    date
                  )
                )
              }
              isFavorite={itemData.item.isFavorite}
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
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  seperatorText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
