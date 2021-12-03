import React, { useEffect } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../../../../../components/MainButton';
import MainText from '../../../../../components/MainText';
import MainTextInput from '../../../../../components/MainTextInput';
import {
  createWorkAnswer,
  getWorkAnswer,
  resetWorkError,
  updateWorkAnswer,
} from '../../../../../store/workSlice';

const Member = () => {
  const state = useSelector((state) => state.work);
  const dispatch = useDispatch();
  const [answer, setAnswer] = React.useState('');
  const [documentLink, setDocumentLink] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [isCreate, setIsCreate] = React.useState(true);

  useEffect(() => {
    if (state.work._id) {
      dispatch(getWorkAnswer({ workId: state.work._id }));
    }
  }, []);

  useEffect(() => {
    if (state.work._id) {
      dispatch(getWorkAnswer({ workId: state.work._id }));
    }
  }, [state.work._id]);

  useEffect(() => {
    // Check empty object
    if (Object.keys(state.workAnswer).length !== 0) {
      setAnswer(state.workAnswer.answer);
      setDocumentLink(state.workAnswer.documentLink);
      setComment(state.workAnswer.comments);
      setIsCreate(false);
      return;
    }

    setIsCreate(true);
  }, [state.workAnswer]);

  useEffect(() => {
    if (state.createAnswerSuccess) {
      Alert.alert('Success', 'Answer created successfully', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetWorkError());
            dispatch(getWorkAnswer({ workId: state.work._id }));
          },
        },
      ]);
    }

    if (state.updateAnswerSuccess) {
      Alert.alert('Success', 'Answer updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetWorkError());
            dispatch(getWorkAnswer({ workId: state.work._id }));
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

  const handleSubmit = () => {
    dispatch(resetWorkError());
    // Check if answer is empty
    if (!answer) {
      Alert.alert('Error', 'Answer cannot be empty');
      return;
    }

    dispatch(
      createWorkAnswer({
        workId: state.work._id,
        answer: {
          answer,
          documentLink,
        },
      }),
    );
  };

  const handleUpdate = () => {
    dispatch(resetWorkError());
    dispatch(
      updateWorkAnswer({
        workId: state.work._id,
        answerId: state.workAnswer._id,
        answer: {
          answer,
          documentLink,
        },
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
      }}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => Keyboard.dismiss()}
    >
      <ScrollView>
        <MainText fontSize={28} fontWeight={'bold'}>
          {'Submission'}
        </MainText>
        <View
          style={{
            padding: 8,
          }}
        >
          <MainTextInput
            label={'Your Answer'}
            multiline
            placeholder={'Plase fill your answer here!'}
            value={answer}
            onChangeText={(text) => setAnswer(text)}
          />
          <MainTextInput
            label={'Supported Document Link (Optional)'}
            value={documentLink}
            placeholder={'Not yet!'}
          />
          <MainTextInput
            label={'Feeback'}
            value={comment}
            placeholder={'Not yet!'}
            disabled
          />
        </View>
        {isCreate ? (
          <MainButton onPress={handleSubmit}>
            <MainText fontWeight={'500'}>{'Submit'}</MainText>
          </MainButton>
        ) : (
          <MainButton onPress={handleUpdate}>
            <MainText fontWeight={'500'}>{'Update'}</MainText>
          </MainButton>
        )}
      </ScrollView>
    </View>
  );
};

export default Member;
