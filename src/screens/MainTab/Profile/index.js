import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainText from '../../../components/MainText';
import { logout } from '../../../store/authSlice';
import { Ionicons } from '@expo/vector-icons';
import MainImage from '../../../components/MainImage';
import randomImageUrl from '../../../utils/randomImageUrl';
import MainTextInput from '../../../components/MainTextInput';
import stringFormat from '../../../utils/stringFormat';
import MainButton from '../../../components/MainButton';
import { resetError, updateUser } from '../../../store/userSlice';
import LoadingOverlay from '../../../components/LoadingOverlay';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = React.useState({
    name: '',
    phone: '',
    dateOfBirth: '',
  });

  const handleOnSave = () => {
    if (
      userInfo.name === state.user.name &&
      userInfo.phone === state.user.phone &&
      userInfo.dateOfBirth === state.user.dateOfBirth
    ) {
      Alert.alert('No changes made');
      return;
    }

    // Check name is not empty
    if (!userInfo.name || userInfo.name.length === 0) {
      Alert.alert('Name cannot be empty');
      return;
    }

    // Check dateOfBirth match format YYYY/MM/DD
    if (
      userInfo.dateOfBirth.length !== 10 ||
      /^\d{4}\/\d{2}\/\d{2}$/.test(userInfo.dateOfBirth) === false
    ) {
      Alert.alert('Invalid date of birth');
      return;
    }

    // Check phone number match format XXXXXXXXXX
    if (
      userInfo.phone.length !== 10 ||
      /^\d{10}$/.test(userInfo.phone) === false
    ) {
      Alert.alert('Invalid phone number');
      return;
    }

    dispatch(
      updateUser({
        name: userInfo.name || state.user.name,
        phone: userInfo.phone || state.user.phone,
        dateOfBirth: userInfo.dateOfBirth || state.user.dateOfBirth,
      }),
    );
  };

  useEffect(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        { text: 'OK', onPress: () => dispatch(resetError()) },
      ]);
    }

    if (state.updateSuccess) {
      Alert.alert('Success', 'Update user info successfully', [
        { text: 'OK', onPress: () => dispatch(resetError()) },
      ]);
    }
  }, [state.error, state.updateSuccess]);

  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Logout',
                  onPress: () => {
                    dispatch(logout());
                  },
                  style: 'destructive',
                },
              ]);
            }}
            style={{ paddingRight: 16 }}
          >
            <Ionicons name="md-log-out" size={30} color="red" />
          </TouchableOpacity>
        ),
      });
    }, [navigation, dispatch]),
  );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      }}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => Keyboard.dismiss()}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity>
          <View style={{ width: 80 }}>
            <MainImage
              imageSrc={{ uri: randomImageUrl() }}
              imageSize={80}
              isBorderRadius
            />
            <View
              style={{
                position: 'absolute',
                width: 80,
                opacity: 0.25,
                alignItems: 'center',
                borderRadius: 40,
                justifyContent: 'center',
                height: 80,
                backgroundColor: '#000',
              }}
            >
              <Ionicons name="ios-camera" size={20} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            marginLeft: 16,
          }}
        >
          <MainText
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {state.user.name}
          </MainText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
            }}
          >
            <Ionicons name="md-mail" size={24} color="#000" />
            <MainText
              style={{
                marginLeft: 8,
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {state.user.email}
            </MainText>
          </View>
        </View>
      </View>
      <View>
        <MainText
          style={{
            marginTop: 16,
            fontSize: 28,
            fontWeight: 'bold',
          }}
        >
          Edit Profile
        </MainText>
        <View>
          <MainTextInput
            label={`Name: ${state.user.name}`}
            value={userInfo.name}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                name: text,
              });
            }}
          />
          <MainTextInput
            label={
              'Date of Birth: ' +
              stringFormat.formatDate(
                new Date(state.user.dateOfBirth),
                'yyyy/MM/dd',
              )
            }
            value={userInfo.dateOfBirth}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                dateOfBirth: text,
              });
            }}
            placeholder="YYYY/MM/DD"
          />
          <MainTextInput
            label={'Phone Number: ' + state.user.phone}
            value={userInfo.phone}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                phone: text,
              });
            }}
            keyboardType="phone-pad"
            placeholder="Enter at least 10 numeric of phone"
          />
        </View>
        <MainButton
          onPress={() => {
            Alert.alert('Save', 'Are you sure you want to save?', [
              {
                text: 'Cancel',
              },
              {
                text: 'Save',
                onPress: () => {
                  handleOnSave();
                },
              },
            ]);
          }}
          style={{
            marginTop: 32,
          }}
        >
          <MainText style={{ fontSize: 18, fontWeight: 'bold' }}>Save</MainText>
        </MainButton>
      </View>
      <LoadingOverlay visible={state.loading} />
    </KeyboardAvoidingView>
  );
};

export default Profile;
