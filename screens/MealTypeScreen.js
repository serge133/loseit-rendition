import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import MealTypeButton from '../components/MealTypeButton';

const MealTypeScreen = props => {
  // const [mealType, setMealType] = useState('snack');

  const submitMealOrder = mealOrder => {
    props.navigation.navigate('AddFood', {
      mealOrder: mealOrder,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.mealTypeContainer}>
        <MealTypeButton
          mealType="Breakfast"
          onPress={() => submitMealOrder(0)}
        />
        <MealTypeButton mealType="Lunch" onPress={() => submitMealOrder(1)} />
        <MealTypeButton mealType="Dinner" onPress={() => submitMealOrder(2)} />
        <MealTypeButton mealType="Snack" onPress={() => submitMealOrder(3)} />
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
