import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import assets from '../../assets';
import MainButton from '../../components/MainButton';
import MainImage from '../../components/MainImage';
import MainTextInput from '../../components/MainTextInput';
import MainText from '../../components/MainText';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetError } from '../../store/authSlice';
import LoadingOverlay from '../../components/LoadingOverlay';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('user_1@dev.com');
  const [password, setPassword] = React.useState('user12345');
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = () => {
    // Check if email and password are not empty
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    // Check if email is valid
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Email is invalid');
      return;
    }

    // Check if password is valid
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        { text: 'OK', onPress: () => dispatch(resetError()) },
      ]);
    }
  }, [state.error]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <MainImage imageSrc={assets.logo} imageSize={240} />
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
      <MainButton onPress={handleLogin}>
        <MainText fontSize={16} fontWeight={'bold'}>
          {'Login'}
        </MainText>
      </MainButton>
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 32 }}>
        <MainText>{"Don't have an account? "}</MainText>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <MainText fontSize={16} fontWeight={'bold'}>
            {'Register'}
          </MainText>
        </TouchableOpacity>
      </View>
      <LoadingOverlay visible={state.loading} />
    </KeyboardAvoidingView>
  );
};

export default Login;
