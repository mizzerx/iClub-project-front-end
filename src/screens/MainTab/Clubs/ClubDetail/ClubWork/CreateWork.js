import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../../../components/LoadingOverlay';
import MainText from '../../../../../components/MainText';
import MainTextInput from '../../../../../components/MainTextInput';
import { createWork, resetWorkError } from '../../../../../store/workSlice';

const CreateWork = () => {
  const [clubState, workState] = [
    useSelector((state) => state.club),
    useSelector((state) => state.work),
  ];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [workInfo, setWorkInfo] = useState({
    name: '',
    description: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={() => {
            // Check if name is empty
            if (workInfo.name === '') {
              Alert.alert('Error', 'Name is required', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
              return;
            }

            // Check if description is empty
            if (workInfo.description === '') {
              Alert.alert('Error', 'Description is required', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
              return;
            }

            handleSave();
          }}
        >
          <MainText fontSize={16} color={'green'} fontWeight={'600'}>
            Save
          </MainText>
        </TouchableOpacity>
      ),
    });
  }, [navigation, workInfo]);

  useEffect(() => {
    if (workState.error) {
      Alert.alert('Error', workState.error, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetWorkError());
          },
        },
      ]);
    }

    if (workState.createSuccess) {
      Alert.alert('Success', 'Work created successfully', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetWorkError());
            navigation.goBack();
          },
        },
      ]);
    }
  }, [workState.error, workState.createSuccess]);

  const handleSave = () => {
    dispatch(resetWorkError());
    Alert.alert(
      'Create Work',
      'Are you sure you want to create this work?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(
              createWork({ work: workInfo, clubId: clubState.club._id }),
            );
          },
        },
      ],
      { cancelable: false },
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
      <MainTextInput
        label={'Work name'}
        value={workInfo.name}
        onChangeText={(text) => {
          setWorkInfo({ ...workInfo, name: text });
        }}
      />
      <MainTextInput
        label={'Work description'}
        value={workInfo.description}
        onChangeText={(text) => {
          setWorkInfo({ ...workInfo, description: text });
        }}
        multiline={true}
      />
      <LoadingOverlay visible={workState.loading} />
    </View>
  );
};

export default CreateWork;
