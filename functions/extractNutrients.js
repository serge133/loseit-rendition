import {
  nutriendIdsFoodCentral,
  nutrientNamesOpenFoodFacts,
  // nutrientNames,
} from '../constants/food';

export const extractNutrientsFromFoodCentral = foodNutrients => {
  const filteredNutrients = foodNutrients.filter(fn => {
    // Calories
    // if (fn.nutrientId === 1008) return true;
    // Fat
    if (fn.nutrientId === 1004) return true;
    // Carbs
    if (fn.nutrientId === 1005) return true;
    // Sugar
    if (fn.nutrientId === 2000) return true;
    // Protein
    if (fn.nutrientId === 1003) return true;
    // Aclohol, ethyl
    if (fn.nutrientId === 1018) return true;
  });

  const mappedNutrients = filteredNutrients.map(fn => {
    return {
      nutrientName: nutriendIdsFoodCentral[fn.nutrientId],
      value: fn.value,
    };
  });

  // const sortedNutrientArray = mappedNutrients.sort((a, b) => {
  //   if (a.nutrientName === nutrientNames.calories) {
  //     return -1;
  //   } else {
  //     return 1;
  //   }
  // });
  return mappedNutrients;
};

export const extractNutrientsFromOpenFoodFacts = (
  foodNutrients,
  withServing
) => {
  // Calculation type is either macronutrient or calorie
  const nutrientArray = [];

  const nutrientKeys = Object.keys(foodNutrients);

  let keys = [
    'fat_value',
    'carbohydrates_value',
    'sugars_value',
    'proteins_value',
  ];

  if (withServing) {
    keys = [
      'fat_serving',
      'carbohydrates_serving',
      'sugars_serving',
      'proteins_serving',
    ];
  }
  for (let key of nutrientKeys) {
    if (
      // key === 'energy_serving' ||
      key === keys[0] ||
      key === keys[1] ||
      key === keys[2] ||
      key === keys[3]
    ) {
      nutrientArray.push({
        nutrientName: nutrientNamesOpenFoodFacts[key],
        value: foodNutrients[key],
      });
    }
  }

  return nutrientArray;
};

export const extractNutrientsFromOpenFoodFactsWithoutServing = foodNutrients => {};
