import {
  GET_FOODS,
  ADD_FOOD_ITEM,
  GET_USER_FOODS,
  DELETE_FOOD_ITEM,
  EDIT_FOOD_ITEM,
} from '../actions/food';

const initialState = {
  foodList: [],
  userFoodList: [],
};

const getFoods = (state, action) => {
  const { foodList } = action;
  return {
    ...state,
    foodList: foodList,
  };
};

const addFoodItem = (state, action) => {
  const { foodItem } = action;
  // console.log(foodItem);
  return {
    ...state,
    userFoodList: state.userFoodList.concat(foodItem),
  };
};

const getUserFoods = (state, action) => {
  const { userFoodList } = action;
  // console.log(userFoodList);
  return {
    ...state,
    userFoodList: userFoodList,
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

    default:
      return state;
  }
};
