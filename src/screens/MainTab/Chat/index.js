import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const Stack = createNativeStackNavigator();

const Chat = () => {
  return (
    <Stack.Navigator initialRouteName={'ChatList'}>
      <Stack.Screen name={'ChatList'} component={ChatList} />
      <Stack.Screen name={'ChatRoom'} component={ChatRoom} />
    </Stack.Navigator>
  );
};

export default Chat;
