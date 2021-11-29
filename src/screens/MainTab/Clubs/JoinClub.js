import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import MainText from '../../../components/MainText';
import { Ionicons } from '@expo/vector-icons';
import MainTextInput from '../../../components/MainTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { joinClub, resetClubError } from '../../../store/clubSlice';
import LoadingOverlay from '../../../components/LoadingOverlay';

const JoinClub = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.club);
  const [clubKey, setClubKey] = React.useState('');

  const handleJoinClub = () => {
    dispatch(joinClub({ inviteCode: clubKey }));
  };

  useEffect(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        { text: 'OK', onPress: () => dispatch(resetClubError()) },
      ]);
    }

    if (state.joinSucess) {
      dispatch(resetClubError());
      navigation.goBack();
      navigation.navigate('ClubDetail', { clubId: state.joinedClubId });
    }
  }, [state.error, state.joinSucess]);

  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: 'Join Club',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicons
            name="ios-close"
            size={24}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              handleJoinClub();
            }}
          >
            <MainText color={'green'} fontWeight={'700'}>
              Join
            </MainText>
          </TouchableOpacity>
        ),
      });
    }, [navigation, clubKey]),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      }}
    >
      <View>
        <MainText fontSize={32} fontWeight={'600'}>
          JoinClub
        </MainText>
        <MainText>
          {'Enter the key provided by Club admin to join a club'}
        </MainText>
      </View>
      <MainTextInput
        placeholder={'Enter your key'}
        onChangeText={(text) => {
          setClubKey(text);
        }}
      />
      <LoadingOverlay visible={state.loading} />
    </View>
  );
};

export default JoinClub;
