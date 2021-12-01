import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect } from 'react';
import { Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../../../../../components/MainButton';
import MainText from '../../../../../components/MainText';
import MainTextInput from '../../../../../components/MainTextInput';
import {
  createWorkAnswer,
  getWorkAnswer,
  getWorkAnswerByUser,
  resetWorkError,
  updateWorkAnswer,
} from '../../../../../store/workSlice';
import stringFormat from '../../../../../utils/stringFormat';

const WorkAnswer = () => {
  const state = useSelector((state) => state.work);
  const dispatch = useDispatch();
  const [answer, setAnswer] = React.useState('');
  const [documentLink, setDocumentLink] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [submitedTime, setSubmitedTime] = React.useState('');
  const params = useRoute().params || {};
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.userName,
    });
  }, []);

  useEffect(() => {
    if (state.work._id) {
      dispatch(
        getWorkAnswerByUser({
          workId: state.work._id,
          userId: params.userId,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (state.work._id) {
      dispatch(
        getWorkAnswerByUser({
          workId: state.work._id,
          userId: params.userId,
        }),
      );
    }
  }, [state.work._id]);

  useEffect(() => {
    if (state.workAnswer) {
      setAnswer(state.workAnswer.answer);
      setDocumentLink(state.workAnswer.documentLink);
      setComment(state.workAnswer.comments);
      setSubmitedTime(state.workAnswer.createdAt);
      return;
    }
  }, [state.workAnswer]);

  useEffect(() => {
    if (state.updateAnswerSuccess) {
      Alert.alert('Success', 'Take feedback success', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetWorkError());
            dispatch(
              getWorkAnswerByUser({
                workId: state.work._id,
                userId: params.userId,
              }),
            );
          },
        },
      ]);
    }

    if (state.error) {
      if (state.error === 'Work answer not found!') {
        return;
      }

      Alert.alert('Error', state.error, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetWorkError());
          },
        },
      ]);
    }
  }, [state.createAnswerSuccess, state.error, state.updateAnswerSuccess]);

  const handleUpdate = () => {
    dispatch(resetWorkError());
    dispatch(
      updateWorkAnswer({
        workId: state.work._id,
        answerId: state.workAnswer._id,
        answer: {
          answer,
          documentLink,
          comments: comment,
        },
      }),
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
      <MainText fontSize={28} fontWeight={'bold'}>
        {'Answer'}
      </MainText>
      <View
        style={{
          padding: 8,
        }}
      >
        <MainTextInput
          label={'Submited Time'}
          value={stringFormat.formatDateToString(new Date(submitedTime))}
          disabled
        />
        <MainTextInput
          label={'Answer'}
          multiline
          placeholder={'Not Yet!'}
          value={answer}
          disabled
        />
        <MainTextInput
          label={'Supported Document Link'}
          value={documentLink}
          placeholder={'Not Yet!'}
          disabled
        />
        <MainTextInput
          label={'Comment (Write feedback to the member)'}
          value={comment}
          placeholder={'Write comment here!'}
          onChangeText={(text) => setComment(text)}
        />
      </View>
      <MainButton onPress={handleUpdate}>
        <MainText fontWeight={'500'}>{'Send Feeback'}</MainText>
      </MainButton>
    </View>
  );
};

export default WorkAnswer;
