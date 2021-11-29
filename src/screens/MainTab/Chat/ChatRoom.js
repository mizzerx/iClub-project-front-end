import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import randomImageUrl from '../../../utils/randomImageUrl';
import randomUUID from '../../../utils/randomUUID';
import ChatHeader from './ChatHeader';
import {
  doc,
  collection,
  setDoc,
  onSnapshot,
  addDoc,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../../../../firebase';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, uploadImageToFirebase } from '../../../utils/imageUtils';

const uuid = () => randomUUID();

const ChatRoom = () => {
  const navigation = useNavigation();
  const params = useRoute().params || {};
  const { userName, userEmail, userId, userAvatar, room } = params;
  const imgAvt = randomImageUrl();
  const userState = useSelector((state) => state.user);

  const [messages, setMessages] = React.useState([]);

  const roomId = useRef(room ? room.id : uuid()).current;
  const crrUser = useRef({
    _id: userState.user._id,
    email: userState.user.email,
    name: userState.user.name,
    avatar: userState.user.avatar || imgAvt,
  }).current;
  const roomRef = doc(db, 'rooms', roomId);
  const roomMessagesRef = collection(roomRef, 'rooms', roomId, 'messages');

  useEffect(() => {
    (async () => {
      if (!room) {
        const currentUser = {
          _id: userState.user._id,
          name: userState.user.name,
          email: userState.user.email,
          avatar: userState.user.avatar || imgAvt,
        };
        const otherUser = {
          _id: userId,
          name: userName,
          email: userEmail,
          avatar: userAvatar || imgAvt,
        };
        const roomData = {
          users: [currentUser, otherUser],
          userIds: [currentUser._id, otherUser._id],
        };

        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (snapshot) => {
      const changes = snapshot
        .docChanges()
        .filter((change) => change.type === 'added')
        .map((change) => {
          const message = change.doc.data();
          return {
            ...message,
            createdAt: message.createdAt.toDate(),
          };
        });
      appendMessage(changes);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <ChatHeader title={userName} avatar={imgAvt} />;
      },
    });
  }, [navigation]);

  const appendMessage = useCallback(
    (message) => {
      setMessages((currentMessages) =>
        GiftedChat.append(currentMessages, message),
      );
    },
    [setMessages],
  );

  const onSend = async (messages = []) => {
    const writes = messages.map((message) => addDoc(roomMessagesRef, message));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage: lastMessage }));
    await Promise.all(writes);
  };

  const onPressCamera = async () => {
    const imageUri = await pickImage();
    const fileName = `images/${roomId}/${randomUUID()}`;

    if (imageUri) {
      handleImageSend(imageUri, fileName);
    }
  };

  const handleImageSend = async (imageUri, fileName) => {
    const url = await uploadImageToFirebase(imageUri, fileName);
    const message = {
      _id: fileName,
      text: '',
      createdAt: new Date(),
      user: crrUser,
      image: url,
    };
    const lastMessage = {
      ...message,
      text: 'Image',
    };
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  };

  const renderCustomAction = (props) => {
    return (
      <Actions
        {...props}
        icon={() => {
          return <Ionicons name="md-camera" size={24} color="#000" />;
        }}
        onPressActionButton={() => {
          onPressCamera();
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userState.user._id,
          email: userState.user.email,
          name: userState.user.name,
          avatar: userState.user.avatar || imgAvt,
        }}
        renderActions={renderCustomAction}
      />
    </View>
  );
};

export default ChatRoom;
