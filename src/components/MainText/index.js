import React from 'react';
import { Text } from 'react-native';

const MainText = ({ fontSize, color, fontWeight, children, ...rest }) => {
  return (
    <Text
      style={{
        fontSize: fontSize || 16,
        color: color || '#000',
        fontWeight: fontWeight || 'normal',
      }}
      {...rest}>
      {children}
    </Text>
  );
};

export default MainText;
