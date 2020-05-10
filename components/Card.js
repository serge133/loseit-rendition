import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
});
