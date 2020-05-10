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
    foodAmount
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
  }
}

export default FoodItem;
