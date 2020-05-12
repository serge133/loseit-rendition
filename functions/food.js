import { nutrientNames } from '../constants/food';

export const calculateCaloriesFromNutrients = foodNutrients => {
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
    if (fn.nutrientName === nutrientNames.alcohol) {
      calories += fn.value * 7;
    }
  });

  return Math.round(calories);
};

export const calculateNutrients = (foodAmount, servingSize, foodNutrients) => {
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

export const averageNutrientsFromCalories = calories => {
  const nutrientValues = {
    [nutrientNames.fat]: 9,
    [nutrientNames.carbohydrates]: 4,
    [nutrientNames.protein]: 4,
  };
  const eachNutrientValue = calories / 3;
  const averagedFoodNutrients = [];
  for (let m of [
    nutrientNames.fat,
    nutrientNames.carbohydrates,
    nutrientNames.protein,
  ]) {
    averagedFoodNutrients.push({
      nutrientName: m,
      value: eachNutrientValue / nutrientValues[m],
    });
  }
  return averagedFoodNutrients;
};

export const formFoodNutrients = (
  gramsFat,
  gramsCarbs,
  gramsProtein,
  gramsAlcohol = 0
) => {
  return [
    {
      nutrientName: nutrientNames.fat,
      value: gramsFat,
    },
    {
      nutrientName: nutrientNames.carbohydrates,
      value: gramsCarbs,
    },
    {
      nutrientName: nutrientNames.protein,
      value: gramsProtein,
    },
    {
      nutrientName: nutrientNames.alcohol,
      value: gramsAlcohol,
    },
  ];
};
