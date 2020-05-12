class FoodItemFavorite {
  constructor(
    initialFoodId,
    id,
    foodName,
    brandOwner,
    foodCategory,
    foodDescription,
    servingSize,
    foodNutrients,
    foodAmount,
    servingUnit
  ) {
    this.initialFoodId = initialFoodId;
    this.id = id;
    this.foodName = foodName;
    this.brandOwner = brandOwner;
    this.foodCategory = foodCategory;
    this.foodDescription = foodDescription;
    this.servingSize = servingSize;
    this.foodNutrients = foodNutrients;
    this.foodAmount = foodAmount;
    this.servingUnit = servingUnit;
  }
}

export default FoodItemFavorite;
