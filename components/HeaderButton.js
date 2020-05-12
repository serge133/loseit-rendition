import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const HeaderButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          ...props.style,
          ...styles.headerButton,
        }}
      >
        <Ionicons name={props.iconName} color={Colors.primary} size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  headerButton: {
    width: 50,
    alignItems: 'center',
  },
});
