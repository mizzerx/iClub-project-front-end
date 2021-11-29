import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../../components/LoadingOverlay';
import MainFlatList from '../../../../components/MainFlatList';
import MainText from '../../../../components/MainText';
import MainTextInput from '../../../../components/MainTextInput';
import randomColor from '../../../../utils/randomColor';
import { Ionicons } from '@expo/vector-icons';
import { addComment, resetClubError } from '../../../../store/clubSlice';

const Dashboard = () => {
  const state = useSelector((state) => state.club);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const bgColor = useRef(randomColor.randomDarkColor()).current;

  useState(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetClubError());
          },
        },
      ]);
    }
  }, [state.error]);

  const renderSentComment = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingRight: 32,
          alignItems: 'center',
        }}
        onPress={() => {
          dispatch(addComment({ clubId: state.club._id, comment }));
          setComment('');
        }}
      >
        <MainTextInput
          placeholder={'Write your comment'}
          onChangeText={(text) => {
            setComment(text);
          }}
          value={comment}
        />
        <Ionicons
          name="md-send"
          size={24}
          color="black"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          paddingRight: 32,
          borderRadius: 8,
          padding: 16,
          borderWidth: 1,
          borderColor: '#ccc',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 16,
          }}
        >
          <Ionicons
            name="ios-chatbox"
            size={24}
            color="black"
            style={{ marginRight: 8 }}
          />
          <MainText
            style={{
              marginLeft: 8,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {item.user && item.user.name}
          </MainText>
        </View>
        <MainText
          style={{
            marginLeft: 8,
            fontSize: 14,
            color: '#666',
          }}
        >
          {item.content}
        </MainText>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 100,
          backgroundColor: bgColor,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          padding: 16,
          borderRadius: 8,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <MainText fontSize={28} fontWeight={'600'} color={'#fff'}>
          {state.club.name}
        </MainText>
      </View>
      <View style={{ marginTop: 16, flex: 1 }}>
        <MainText fontSize={28} fontWeight={'600'}>
          {'Global Comment'.toUpperCase()}
        </MainText>
        <MainFlatList
          data={state.club.comments}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, margin: 8 }} />;
          }}
          contentContainerStyle={{
            paddingTop: 16,
          }}
        />
      </View>
      {renderSentComment()}
      <LoadingOverlay visible={state.loading} />
    </KeyboardAvoidingView>
  );
};

export default Dashboard;
