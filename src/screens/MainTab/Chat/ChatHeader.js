import React from 'react';
import { View } from 'react-native';
import MainImage from '../../../components/MainImage';
import MainText from '../../../components/MainText';

const ChatHeader = ({ title, subtitle, avatar }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <MainImage imageSize={38} imageSrc={{ uri: avatar }} isBorderRadius />
      <View style={{ marginLeft: 10 }} />
      <MainText fontWeight={'bold'}>{title}</MainText>
    </View>
  );
};

export default ChatHeader;
