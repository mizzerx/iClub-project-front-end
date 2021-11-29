import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const MainButton = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default MainButton;
