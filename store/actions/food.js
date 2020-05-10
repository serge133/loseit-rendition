import Axios from 'axios';
import FoodItem from '../../models/food-item';
export const GET_FOODS = 'GET_FOODS';
export const ADD_FOOD_ITEM = 'ADD_FOOD_ITEM';
export const GET_USER_FOODS = 'GET_USER_FOODS';
export const DELETE_FOOD_ITEM = 'DELETE_FOOD_ITEM';
export const EDIT_FOOD_ITEM = 'EDIT_FOOD_ITEM';

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
  foodAmount
) => {
  return async dispatch => {
    // * Call to database is here
    const response = await Axios.post(
      'https://central-rush-249500.firebaseio.com/userFoodList.json',
      {
        foodName: foodName,
        brandOwner: brandOwner,
        mealOrder: mealOrder,
        foodCategory: foodCategory,
        foodDescription: foodDescription,
        servingSize: servingSize,
        foodNutrients: foodNutrients,
        foodAmount: foodAmount,
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
      foodAmount
    );
    dispatch({
      type: ADD_FOOD_ITEM,
      foodItem: foodItem,
    });
  };
};

export const getUserFoods = () => {
  return async dispatch => {
    const response = await Axios.get(
      'https://central-rush-249500.firebaseio.com/userFoodList.json'
    );
    const rawUserFoodList = response.data;
    const userFoodListKeys = Object.keys(rawUserFoodList);
    const userFoodList = [];
    for (let key of userFoodListKeys) {
      const foodItem = rawUserFoodList[key];
      userFoodList.push({
        id: key,
        foodName: foodItem.foodName,
        brandOwner: foodItem.brandOwner,
        mealOrder: foodItem.mealOrder,
        foodCategory: foodItem.foodCategory,
        foodDescription: foodItem.foodDescription,
        servingSize: foodItem.servingSize,
        foodNutrients: foodItem.foodNutrients,
        foodAmount: foodItem.foodAmount,
      });
    }
    dispatch({
      type: GET_USER_FOODS,
      userFoodList: userFoodList,
    });
  };
};

export const deleteFoodItem = foodId => {
  Axios.delete(
    `https://central-rush-249500.firebaseio.com/userFoodList/${foodId}.json`
  );
  return {
    type: DELETE_FOOD_ITEM,
    foodId: foodId,
  };
};

export const editFoodItem = (foodId, foodAmount, foodNutrients) => {
  return async dispatch => {
    const response = await Axios.patch(
      `https://central-rush-249500.firebaseio.com/userFoodList/${foodId}.json`,
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
