import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FoodItem from '../components/FoodItem';

const FavoriteFoodsScreen = props => {
  // const dispatch = useDispatch();
  const foodList = useSelector(state => state.food.userFoodList);

  // ! TEMPORARY
  const favoriteFoodsList = foodList.filter(foodItem => foodItem.isFavorite);
  // !

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={item => item.id}
        data={favoriteFoodsList}
        renderItem={itemData => (
          <FoodItem
            description={itemData.item.foodName}
            brandOwner={itemData.item.brandOwner}
            calories={itemData.item.calories}
            handlePress={() => {
              props.navigation.navigate('DisplayFood', {
                // mealOrder: props.route.params.mealOrder,
                foodName: itemData.item.foodName,
                brandOwner: itemData.item.brandOwner,
                servingSize: itemData.item.servingSize,
                foodNutrients: itemData.item.foodNutrients,
                ingredients: itemData.item.ingredients,
                foodAmount: itemData.item.foodAmount,
                displayType: 'adding',
                servingUnit: itemData.item.servingUnit,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default FavoriteFoodsScreen;

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
