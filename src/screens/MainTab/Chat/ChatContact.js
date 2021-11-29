import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainText from '../../../components/MainText';
import { getUsers } from '../../../store/userSlice';
import { Ionicons } from '@expo/vector-icons';
import MainFlatList from '../../../components/MainFlatList';
import { useNavigation } from '@react-navigation/core';

const ChatContact = () => {
  const userState = useSelector((state) => state.user);
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: 'Select Contact',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 16 }}
          >
            <Ionicons name="ios-close" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }, [navigation]),
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          padding: 16,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ccc',
        }}
        onPress={() => {
          navigation.navigate('ChatRoom', {
            userName: item.name,
            userId: item._id,
            userEmail: item.email,
            userAvatar: item.avatar || null,
            room: chatState.unfilteredRooms.find((room) =>
              room.userIds.includes(item._id),
            ),
          });
        }}
      >
        <Ionicons
          name="md-person"
          size={30}
          color="black"
          style={{
            marginRight: 16,
          }}
        />
        <MainText fontWeight={'600'}>{item.name || 'No Name'}</MainText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      }}
    >
      <MainFlatList
        data={[...userState.users].filter(
          (item) => item._id !== userState.user._id && item.name,
        )}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              margin: 8,
            }}
          />
        )}
        onRefresh={() => dispatch(getUsers())}
        refreshing={userState.loading}
      />
    </View>
  );
};

export default ChatContact;
