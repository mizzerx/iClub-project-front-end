import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Keyboard, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../../components/LoadingOverlay';
import MainButton from '../../../../components/MainButton';
import MainText from '../../../../components/MainText';
import MainTextInput from '../../../../components/MainTextInput';
import {
  deleteClub,
  leaveClub,
  resetClubError,
  updateClub,
} from '../../../../store/clubSlice';
import { Ionicons } from '@expo/vector-icons';

const ClubSetting = () => {
  const state = useSelector((state) => state.club);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [clubInfo, setClubInfo] = useState({
    name: state.club.name,
    description: state.club.description,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <MainText color={'green'} fontWeight={'600'}>
            Save
          </MainText>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Ionicons name="ios-arrow-back" size={24} color="green" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, clubInfo]);

  const handleLeave = () => {
    Alert.alert(
      'Leave Club',
      'Are you sure you want to leave this club?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          onPress: () => {
            dispatch(leaveClub({ clubId: state.club._id }));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Club',
      'Are you sure you want to delete this club?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteClub({ clubId: state.club._id }));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  const handleSave = () => {
    dispatch(resetClubError());
    Alert.alert(
      'Save Changes',
      'Are you sure you want to save these changes?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          onPress: () => {
            // Check name
            if (clubInfo.name.length < 3) {
              Alert.alert('Error', 'Club name must be at least 3 characters');
              return;
            }

            dispatch(updateClub({ clubId: state.club._id, club: clubInfo }));
          },
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        { text: 'OK', onPress: () => dispatch(resetClubError()) },
      ]);
    }

    if (state.leaveSuccess) {
      Alert.alert('Success', 'You have left the club', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetClubError());
            navigation.navigate('Maintab');
          },
        },
      ]);
    }

    if (state.deleteSuccess) {
      Alert.alert('Success', 'You have deleted the club', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetClubError());
            navigation.navigate('Maintab');
          },
        },
      ]);
    }

    if (state.updateClubSuccess) {
      Alert.alert('Success', 'You have updated the club', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetClubError());
          },
        },
      ]);
    }
  }, [
    state.error,
    state.leaveSuccess,
    state.deleteSuccess,
    state.updateClubSuccess,
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      }}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => Keyboard.dismiss()}
    >
      <MainTextInput
        value={clubInfo.name}
        label={'Club Name'}
        onChangeText={(text) => {
          setClubInfo({
            ...clubInfo,
            name: text,
          });
        }}
        disabled={global.id === state.club.clubAdmin._id}
      />
      <MainTextInput
        value={clubInfo.description}
        label={'Description'}
        onChangeText={(text) => {
          setClubInfo({ ...clubInfo, description: text });
        }}
        multiline
        disabled={global.id === state.club.clubAdmin._id}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <MainText fontSize={28} fontWeight={'700'}>
          {'General Infomation'.toUpperCase()}
        </MainText>
        <View>
          {global.id === state.club.clubAdmin._id && (
            <MainText fontSize={12} color={'grey'}>
              {
                'This is a club that you created. You can edit the club name and description.'
              }
            </MainText>
          )}
          <View
            style={{
              marginTop: 16,
            }}
          >
            <MainText>
              {'Club Invite Code: '}
              <MainText fontWeight={'700'}>
                {state.club.clubAdmin._id === global.id
                  ? state.club.inviteCode
                  : 'Hidden'}
              </MainText>
            </MainText>
          </View>
        </View>
      </View>
      {state.club &&
      state.club.clubAdmin &&
      global.id === state.club.clubAdmin._id ? (
        <MainButton
          style={{
            backgroundColor: 'red',
            borderWidth: 0,
          }}
          onPress={handleDelete}
        >
          <MainText fontSize={18} color={'white'} fontWeight={'700'}>
            {'Delete Club'}
          </MainText>
        </MainButton>
      ) : (
        <MainButton
          style={{
            backgroundColor: 'red',
            borderWidth: 0,
          }}
          onPress={handleLeave}
        >
          <MainText fontSize={18} color={'white'} fontWeight={'700'}>
            {'Leave Club'}
          </MainText>
        </MainButton>
      )}
      <LoadingOverlay visible={state.loading} />
    </View>
  );
};

export default ClubSetting;
