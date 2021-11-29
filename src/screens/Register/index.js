import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import assets from '../../assets';
import LoadingOverlay from '../../components/LoadingOverlay';
import MainButton from '../../components/MainButton';
import MainImage from '../../components/MainImage';
import MainText from '../../components/MainText';
import MainTextInput from '../../components/MainTextInput';
import { register, resetError } from '../../store/authSlice';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleRegister = () => {
    if (!name) {
      Alert.alert('Please enter your name');
      return;
    } else if (!email) {
      Alert.alert('Please enter your email');
      return;
    } else if (!password) {
      Alert.alert('Please enter your password');
      return;
    } else if (!passwordConfirmation) {
      Alert.alert('Please enter your password confirmation');
      return;
    } else if (password !== passwordConfirmation) {
      Alert.alert('Passwords do not match');
      return;
    }

    dispatch(register({ name, email, password, passwordConfirmation }));
  };

  useEffect(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        { text: 'OK', onPress: () => dispatch(resetError()) },
      ]);
    }

    if (state.registerSuccess) {
      Alert.alert('Success', 'Register success', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    }
  }, [state.error, state.registerSuccess, navigation, dispatch]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <MainImage imageSrc={assets.logo} imageSize={240} />

      <MainTextInput
        placeholder={'Name'}
        onChangeText={(text) => {
          setName(text);
        }}
        value={name}
      />
      <MainTextInput
        placeholder={'Email'}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <MainTextInput
        placeholder={'Password'}
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <MainTextInput
        placeholder={'Password Confirmation'}
        secureTextEntry
        onChangeText={(text) => {
          setPasswordConfirmation(text);
        }}
        value={passwordConfirmation}
      />

      <MainButton onPress={handleRegister}>
        <MainText fontSize={16} fontWeight={'bold'}>
          {'Register'}
        </MainText>
      </MainButton>

      <View style={{ position: 'absolute', top: 100, left: 16 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MainText fontSize={16} fontWeight={'bold'} color={'grey'}>
            {'Back to Login'}
          </MainText>
        </TouchableOpacity>
      </View>
      <LoadingOverlay visible={state.loading} />
    </KeyboardAvoidingView>
  );
};

export default Register;
