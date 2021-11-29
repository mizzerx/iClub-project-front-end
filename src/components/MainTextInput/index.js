import React from 'react';
import { TextInput, View, Text } from 'react-native';

const MainTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCorrect,
  autoCapitalize,
  keyboardType,
  returnKeyType,
  onSubmitEditing,
  onBlur,
  onFocus,
  style,
  error,
  multiline,
  label,
  disabled,
  ...props
}) => {
  return (
    <View style={{ width: '100%', marginVertical: 16 }}>
      {label && (
        <View style={{ marginBottom: 8, marginLeft: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}</Text>
        </View>
      )}
      <View
        style={[
          {
            borderColor: error ? 'red' : '#ccc',
            borderWidth: 1,
            padding: 10,
            height: multiline ? 200 : 50,
            justifyContent: multiline ? 'flex-start' : 'center',
            borderRadius: 16,
          },
          style,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlur}
          onFocus={onFocus}
          multiline={multiline}
          style={[style, { borderColor: error ? 'red' : 'black' }]}
          disabled={disabled}
          {...props}
        />
      </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default MainTextInput;
