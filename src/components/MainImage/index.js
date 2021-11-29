import React from 'react';
import { Image, View } from 'react-native';

const MainImage = ({ imageSize, border, imageSrc, isBorderRadius }) => {
  return (
    <View
      style={{
        width: imageSize,
        height: imageSize,
        borderRadius: isBorderRadius ? imageSize / 2 : 0,
        borderWidth: border,
        borderColor: '#fff',
      }}>
      <Image
        source={imageSrc}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: isBorderRadius ? imageSize / 2 : 0,
        }}
      />
    </View>
  );
};

export default MainImage;
