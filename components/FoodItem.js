import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  Alert,
} from 'react-native';
import colors from '../constants/colors';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';

const FoodItem = props => {
  let ButtonComponent = TouchableHighlight;

  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  const handleDelete = () => {
    Alert.alert(
      'Deleting Food Item',
      'Are you sure you want to delete this food?',
      [
        { text: 'Cancel', style: 'default' },
        { text: 'Delete', style: 'destructive', onPress: props.handleDelete },
      ]
    );
  };

  // const handleFavorite = () => {
  //   Alert.alert("Making Favorite", "Once a food is made favorite you will not be able to unfavorite it unless you remove it from favorites. This is done to prevent ")
  // }

  return (
    <SwipeRow
      rightOpenValue={-150}
      disableLeftSwipe={props.displayOnly}
      disableRightSwipe={true}
    >
      {!props.displayOnly ? (
        <View style={styles.hiddenRow}>
          <TouchableHighlight onPress={props.handleFavorite}>
            <View style={styles.favoriteBtn}>
              <Ionicons
                name={
                  Platform.OS === 'android'
                    ? props.isFavorite
                      ? 'md-star'
                      : 'md-star-outline'
                    : props.isFavorite
                    ? 'ios-star'
                    : 'ios-star-outline'
                }
                size={23}
                color="white"
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handleDelete}>
            <View style={styles.deleteBtn}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={23}
                color="white"
              />
            </View>
          </TouchableHighlight>
        </View>
      ) : (
        <View></View>
      )}
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
    paddingHorizontal: 10,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
  },
  deleteBtn: {
    backgroundColor: 'red',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '100%',
  },
  favoriteBtn: {
    backgroundColor: colors.primary,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '100%',
  },
  hiddenBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodItem;
