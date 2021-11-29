import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBox = ({ onChangeText }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
      }}>
      <Ionicons name='ios-search' size={24} color='black' />
      <TextInput
        style={{
          flex: 1,
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          marginHorizontal: 8,
          borderRadius: 8,
          padding: 8,
          marginBottom: 16,
        }}
        placeholder='Search'
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBox;
