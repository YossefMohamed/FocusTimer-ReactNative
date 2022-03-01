import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';
export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 100,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>
        {props.title ? props.title : '+'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      borderColor: colors.white,
      borderWidth: 1,
      textAlign: 'center',
      backgroundColor: colors.white,
      justifyContent: 'center',
    },
    text: {
      fontWeight: 'bold',
      marginTop: 0,
      color: colors.main,
      fontSize: size / 3,
      fontWeight: 'bold',
      lineHeight: 0,
    },
  });
