import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import colors from '../constants/colors';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';

const FoodItem = props => {
  let ButtonComponent = TouchableHighlight;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <SwipeRow rightOpenValue={-75}>
      <View style={styles.hiddenRow}>
        <TouchableHighlight onPress={props.handleDelete}>
          <View style={styles.hiddenBtn}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="white"
            />
          </View>
        </TouchableHighlight>
      </View>
      <ButtonComponent onPress={props.handlePress}>
        <View style={styles.foodItem}>
          <View style={styles.foodDetails}>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.brandOwner}>{props.brandOwner}</Text>
          </View>
          <Text style={styles.calories}>{props.calories}</Text>
        </View>
      </ButtonComponent>
    </SwipeRow>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomColor: colors.accent,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodDetails: {
    flex: 3,
    borderRightColor: colors.accent,
    borderRightWidth: 1,
  },
  brandOwner: {
    color: colors.primary,
  },
  calories: {
    flex: 1,
    color: colors.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  hiddenRow: {
    alignItems: 'flex-end',
  },
  hiddenBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    backgroundColor: 'red',
  },
  hiddenBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodItem;
