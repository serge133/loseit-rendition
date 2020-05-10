import { nutrientNames } from '../constants/food';

export default foodNutrients => {
  let calories = 0;

  foodNutrients.forEach(fn => {
    if (fn.nutrientName === nutrientNames.fat) {
      calories += fn.value * 9;
    }
    if (fn.nutrientName === nutrientNames.carbohydrates) {
      calories += fn.value * 4;
    }
    if (fn.nutrientName === nutrientNames.protein) {
      calories += fn.value * 4;
    }
  });

  return Math.round(calories);
};
