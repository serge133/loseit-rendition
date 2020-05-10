export default (foodAmount, servingSize, foodNutrients) => {
  const updatedNutrientValues = [];
  const multiplier = foodAmount / servingSize;
  for (let i of foodNutrients) {
    updatedNutrientValues.push({
      nutrientName: i.nutrientName,
      value: i.value * multiplier,
    });
  }
  return updatedNutrientValues;
};
