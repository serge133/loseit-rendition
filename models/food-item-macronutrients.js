class FoodItem {
  constructor(
    foodName,
    foodCategory,
    foodDescription,
    calories,
    gramsFiber,
    gramsSugar,
    servingSize
  ) {
    this.foodName = foodName;
    this.foodCategory = foodCategory;
    this.foodDescription = foodDescription;
    this.calories = calories;
    this.gramsFiber = gramsFiber;
    this.gramsSugar = gramsSugar;
    this.servingSize = servingSize;
  }
}

export default FoodItem;
