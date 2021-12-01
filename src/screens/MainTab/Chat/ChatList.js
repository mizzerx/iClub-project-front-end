import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { query, collection, where, onSnapshot } from '@firebase/firestore';
import { db } from '../../../../firebase';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import MainFlatList from '../../../components/MainFlatList';
import MainImage from '../../../components/MainImage';
import randomImageUrl from '../../../utils/randomImageUrl';
import MainText from '../../../components/MainText';
import { setRooms, setUnfilteredRooms } from '../../../store/chatSlice';
import stringFormat from '../../../utils/stringFormat';

const ChatList = () => {
  const userState = useSelector((state) => state.user);
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const chatsQuery = query(
    collection(db, 'rooms'),
    where('userIds', 'array-contains', userState.user._id),
  );

  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: 'Chat',
      });
    }, [navigation]),
    [],
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      const parsedChats = snapshot.docs
        .map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            userB: doc
              .data()
              .users.find((user) => user._id !== userState.user._id),
          };
        })
        .reverse();
      dispatch(setUnfilteredRooms(parsedChats));
      dispatch(setRooms(parsedChats.filter((doc) => doc.lastMessage)));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const floatingMessageButton = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('ChatContact');
        }}
      >
        <Ionicons name="md-chatbubble" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingVertical: 16,
        }}
        onPress={() => {
          navigation.navigate('ChatRoom', {
            userName: item.userB.name,
            userId: item.userB._id,
            userEmail: item.userB.email,
            userAvatar: item.userB.avatar || null,
            room: chatState.unfilteredRooms.find((room) =>
              room.userIds.includes(item.userB._id),
            ),
          });
        }}
      >
        <View>
          <MainImage
            imageSrc={{ uri: randomImageUrl() }}
            imageSize={50}
            isBorderRadius
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 8,
          }}
        >
          <MainText fontSize={18} fontWeight={'bold'}>
            {item.userB.name}
          </MainText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <MainText fontSize={12} color={'grey'}>
              {item.lastMessage.text}
            </MainText>
            <View
              style={{
                width: 4,
                height: 4,
                backgroundColor: 'red',
                borderRadius: 2,
                marginHorizontal: 4,
              }}
            />
            <MainText fontSize={12} color={'grey'}>
              {stringFormat.formatDateToString(
                new Date(item.lastMessage.createdAt.toDate()),
                'yyyy-MM-dd hh:mm',
              )}
            </MainText>
          </View>
        </View>
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
        data={chatState.rooms}
        renderItem={renderItem}
        noDataText={'You have no chats'}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              margin: 8,
              backgroundColor: '#e5e5e5',
            }}
          />
        )}
      />
      {floatingMessageButton()}
    </View>
  );
};

export default ChatList;
