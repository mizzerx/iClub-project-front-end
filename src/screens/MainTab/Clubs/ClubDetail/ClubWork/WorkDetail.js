import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../../../components/LoadingOverlay';
import MainText from '../../../../../components/MainText';
import { getWork } from '../../../../../store/workSlice';
import Admin from './Admin';
import Member from './Member';

const WorkDetail = () => {
  const params = useRoute().params || {};
  const workState = useSelector((state) => state.work);
  const dispatch = useDispatch();
  const { isAdmin, workId } = params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: workState.work.name,
    });
  }, [navigation, workState.work.name]);

  useEffect(() => {
    dispatch(getWork({ workId }));
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={100}
    >
      <MainText fontSize={28} fontWeight={'bold'}>
        {'Work Description'}
      </MainText>
      <View
        style={{
          borderRadius: 8,
          borderWidth: 1,
          padding: 16,
          borderColor: '#ddd',
          marginTop: 16,
          height: 100,
        }}
      >
        <MainText>{workState.work.description}</MainText>
      </View>
      {isAdmin ? <Admin /> : <Member />}
      <LoadingOverlay visible={workState.loading} />
    </KeyboardAvoidingView>
  );
};

export default WorkDetail;
