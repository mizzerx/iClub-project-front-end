import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import MainText from '../../../components/MainText';
import { Ionicons } from '@expo/vector-icons';
import MainTextInput from '../../../components/MainTextInput';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { createClub, resetClubError } from '../../../store/clubSlice';

const CreateClub = () => {
  const navigation = useNavigation();
  const state = useSelector((state) => state.club);
  const dispatch = useDispatch();
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Club',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            handleSave();
          }}
        >
          <View style={{ padding: 10 }}>
            <MainText color={'green'} fontWeight={'bold'}>
              Save
            </MainText>
          </View>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={{ padding: 10 }}>
            <Ionicons name="ios-close" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, clubName, clubDescription]);

  useEffect(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        { text: 'OK', onPress: () => dispatch(resetClubError()) },
      ]);
    }

    if (state.createSucess) {
      dispatch(resetClubError());
      navigation.goBack();
    }
  }, [state.error, state.createSucess]);

  const handleSave = () => {
    if (clubName.length === 0) {
      Alert.alert('Club name is required');
      return;
    }
    dispatch(resetClubError());
    dispatch(createClub({ name: clubName, description: clubDescription }));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
      }}
    >
      <MainTextInput
        placeholder={'Club Name'}
        label={'Club Name'}
        onChangeText={(text) => {
          setClubName(text);
        }}
        value={clubName}
      />
      <MainTextInput
        placeholder={'Club Description'}
        label={'Club Description'}
        multiline={true}
        onChangeText={(text) => {
          setClubDescription(text);
        }}
        value={clubDescription}
      />
      <LoadingOverlay visible={state.loading} />
    </View>
  );
};

export default CreateClub;
