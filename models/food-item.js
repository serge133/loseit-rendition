import { nutrientNames } from '../constants/food';

class FoodItem {
  constructor(
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
    isFavorite
  ) {
    this.id = id;
    this.foodName = foodName;
    this.brandOwner = brandOwner;
    this.mealOrder = mealOrder;
    this.foodCategory = foodCategory;
    this.foodDescription = foodDescription;
    this.servingSize = servingSize;
    this.foodNutrients = foodNutrients;
    this.foodAmount = foodAmount;
    this.servingUnit = servingUnit;
    this.isFavorite = isFavorite; // bool
  }

  get calories() {
    return this.calcCalories();
  }

  calcCalories() {
    let calories = 0;

    this.foodNutrients.forEach(fn => {
      if (fn.nutrientName === nutrientNames.fat) {
        calories += fn.value * 9;
      }
      if (fn.nutrientName === nutrientNames.carbohydrates) {
        calories += fn.value * 4;
      }
      if (fn.nutrientName === nutrientNames.protein) {
        calories += fn.value * 4;
      }
      if (fn.nutrientName === nutrientNames.alcohol) {
        calories += fn.value * 7;
      }
    });

    return Math.round(calories);
  }
}

export default FoodItem;
