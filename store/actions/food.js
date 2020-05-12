import Axios from 'axios';
import FoodItem from '../../models/food-item';
export const GET_FOODS = 'GET_FOODS';
export const ADD_FOOD_ITEM = 'ADD_FOOD_ITEM';
export const GET_USER_FOODS = 'GET_USER_FOODS';
export const DELETE_FOOD_ITEM = 'DELETE_FOOD_ITEM';
export const EDIT_FOOD_ITEM = 'EDIT_FOOD_ITEM';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const getFoods = (search, pageSize) => {
  return async dispatch => {
    // const searchQuery = search.split(' ').join('-');
    const response = await Axios.post(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=dPgkKhhR7j8QVxIrzEIvjtgJRfMZ88QoshAZ1pef`,
      {
        query: search,
        pageSize: pageSize,
        // dataType: ['Branded', 'Foundation', 'SR Legacy', 'Survey (FNDDS)'],
        sortOrder: 'asc',
      }
    );
    dispatch({
      type: GET_FOODS,
      foodList: response.data.foods,
    });
  };
};

export const addFoodItem = (
  foodName,
  brandOwner,
  mealOrder,
  foodCategory,
  foodDescription,
  servingSize,
  foodNutrients,
  foodAmount,
  servingUnit,
  date
) => {
  return async dispatch => {
    // * Call to database is here
    const response = await Axios.post(
      `https://central-rush-249500.firebaseio.com/userFoodList/${date}.json`,
      {
        foodName: foodName,
        brandOwner: brandOwner,
        mealOrder: mealOrder,
        foodCategory: foodCategory,
        foodDescription: foodDescription,
        servingSize: servingSize,
        foodNutrients: foodNutrients,
        foodAmount: foodAmount,
        servingUnit: servingUnit,
        isFavorite: false,
      }
    );

    const id = response.data.name;

    const foodItem = new FoodItem(
      id,
      foodName,
      brandOwner,
      mealOrder,
      foodCategory,
      foodDescription,
      servingSize,
      foodNutrients,
      foodAmount,
      servingUnit,
      false
    );
    dispatch({
      type: ADD_FOOD_ITEM,
      foodItem: foodItem,
    });
  };
};

export const getUserFoods = (date /** moment format */) => {
  return async dispatch => {
    try {
      const response = await Axios.get(
        `https://central-rush-249500.firebaseio.com/userFoodList/${date}.json`
      );
      const rawUserFoodList = response.data;
      const userFoodListKeys = Object.keys(rawUserFoodList);
      const userFoodList = [];
      for (let key of userFoodListKeys) {
        const foodItem = rawUserFoodList[key];
        userFoodList.push(
          new FoodItem(
            key,
            foodItem.foodName,
            foodItem.brandOwner,
            foodItem.mealOrder,
            foodItem.foodCategory,
            foodItem.foodDescription,
            foodItem.servingSize,
            foodItem.foodNutrients,
            foodItem.foodAmount,
            foodItem.servingUnit,
            foodItem.isFavorite
          )
        );
      }
      dispatch({
        type: GET_USER_FOODS,
        userFoodList: userFoodList,
        date: date,
      });
    } catch (err) {
      /**
       * If there is not entries under the date in the database
       * then it goes here and makes an empty array under the new date
       */
      dispatch({
        type: GET_USER_FOODS,
        userFoodList: [],
        date: date,
      });
    }
  };
};

export const deleteFoodItem = (foodId, date) => {
  Axios.delete(
    `https://central-rush-249500.firebaseio.com/userFoodList/${date}/${foodId}.json`
  );
  return {
    type: DELETE_FOOD_ITEM,
    foodId: foodId,
  };
};

export const editFoodItem = (foodId, foodAmount, foodNutrients, date) => {
  return async dispatch => {
    const response = await Axios.patch(
      `https://central-rush-249500.firebaseio.com/userFoodList/${date}/${foodId}.json`,
      {
        foodAmount: foodAmount,
        foodNutrients: foodNutrients,
      }
    );
    dispatch({
      type: EDIT_FOOD_ITEM,
      foodId: foodId,
      foodAmount: foodAmount,
      foodNutrients: foodNutrients,
    });
  };
};

export const toggleFavorite = (foodId, isFavorite, date) => {
  Axios.patch(
    `https://central-rush-249500.firebaseio.com/userFoodList/${date}/${foodId}.json`,
    { isFavorite: !isFavorite }
  );

  return {
    type: TOGGLE_FAVORITE,
    foodId: foodId,
  };
};
