import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import MealTypeButton from '../components/MealTypeButton';

const MealTypeScreen = props => {
  // const [mealType, setMealType] = useState('snack');

  const submitMealType = mealType => {
    props.navigation.navigate('AddFood', {
      mealType: mealType,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.mealTypeContainer}>
        <MealTypeButton
          mealType="Breakfast"
          onPress={() => submitMealType('Breakfast')}
        />
        <MealTypeButton
          mealType="Lunch"
          onPress={() => submitMealType('Lunch')}
        />
        <MealTypeButton
          mealType="Dinner"
          onPress={() => submitMealType('Dinner')}
        />
        <MealTypeButton
          mealType="Snack"
          onPress={() => submitMealType('Snacks')}
        />
      </View>
    </View>
  );
};

export default MealTypeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  mealTypeContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
