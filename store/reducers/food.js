import moment from 'moment';
import { dateFormat } from '../../constants/food';
import {
  GET_FOODS,
  ADD_FOOD_ITEM,
  GET_USER_FOODS,
  DELETE_FOOD_ITEM,
  EDIT_FOOD_ITEM,
  TOGGLE_FAVORITE,
} from '../actions/food';

const initialState = {
  foodList: [],
  userFoodList: [],
  displayUserFoodListDate: moment().format(dateFormat),
};

const getFoods = (state, action) => {
  const { foodList } = action;
  return {
    ...state,
    foodList: foodList,
  };
};

const addFoodItem = (state, { foodItem }) => {
  return {
    ...state,
    userFoodList: state.userFoodList.concat(foodItem),
  };
};

const getUserFoods = (state, { userFoodList, date }) => {
  return {
    ...state,
    userFoodList: userFoodList,
    displayUserFoodListDate: date,
  };
};

const deleteFoodItem = (state, action) => {
  const { foodId } = action;
  const userFoodListCopy = [...state.userFoodList];
  const deleteIndex = userFoodListCopy.findIndex(food => food.id === foodId);
  userFoodListCopy.splice(deleteIndex, 1);
  return {
    ...state,
    userFoodList: userFoodListCopy,
  };
};

const editFoodItem = (state, action) => {
  const { foodId, foodAmount, foodNutrients } = action;
  const updatedUserFoodList = [...state.userFoodList];
  const editIndex = updatedUserFoodList.findIndex(uf => uf.id === foodId);
  if (editIndex < 0) return state;
  updatedUserFoodList[editIndex].foodAmount = foodAmount;
  updatedUserFoodList[editIndex].foodNutrients = foodNutrients;
  return {
    ...state,
    userFoodList: updatedUserFoodList,
  };
};

const toggleFavorite = (state, { foodId }) => {
  const updatedUserFoodList = [...state.userFoodList];
  const toggleIndex = updatedUserFoodList.findIndex(
    foodItem => foodItem.id === foodId
  );
  if (toggleIndex < 0) throw Error('TOGGLE favorite is not working');
  updatedUserFoodList[toggleIndex].isFavorite = !updatedUserFoodList[
    toggleIndex
  ].isFavorite;
  return {
    ...state,
    userFoodList: updatedUserFoodList,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOODS:
      return getFoods(state, action);
    case ADD_FOOD_ITEM:
      return addFoodItem(state, action);
    case GET_USER_FOODS:
      return getUserFoods(state, action);
    case DELETE_FOOD_ITEM:
      return deleteFoodItem(state, action);
    case EDIT_FOOD_ITEM:
      return editFoodItem(state, action);
    case TOGGLE_FAVORITE:
      return toggleFavorite(state, action);
    default:
      return state;
  }
};
