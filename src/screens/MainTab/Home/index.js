import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MainFlatList from '../../../components/MainFlatList';
import MainText from '../../../components/MainText';
import { getUserProfile } from '../../../store/userSlice';
import { Ionicons } from '@expo/vector-icons';
import LoadingOverlay from '../../../components/LoadingOverlay';
import stringFormat from '../../../utils/stringFormat';
import { useFocusEffect, useNavigation } from '@react-navigation/core';

const Home = () => {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserProfile());
    }, []),
  );

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MainText
            fontSize={16}
            fontWeight={'500'}
            color={item.activityName === 'create' ? '#00b894' : '#e84393'}
          >
            {`${item.activityName}`.toUpperCase()}:{' '}
          </MainText>
          <MainText fontSize={12} fontWeight={'bold'}>
            {item.type}
          </MainText>
        </View>
        <MainText fontSize={16} color={'grey'}>
          {stringFormat.formatDate(new Date(item.time), 'yyyy-MM-dd hh:mm')}
        </MainText>
      </View>
    );
  };

  const renderQuickAction = ({ actionName, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 16,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Ionicons name={'add-circle'} size={24} color="green" />
          <MainText
            style={{ marginLeft: 10, fontWeight: '500', color: 'green' }}
          >
            {actionName}
          </MainText>
        </View>
      </TouchableOpacity>
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
      <View>
        <MainText fontSize={20} fontWeight={'bold'}>
          {'Your recent activity'.toUpperCase()}
        </MainText>
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#ddd',
            padding: 16,
            marginTop: 16,
            height: 300,
          }}
        >
          <MainFlatList
            data={state.user.recents}
            renderItem={renderItem}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, margin: 8 }} />;
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 32 }}>
        <MainText fontSize={20} fontWeight={'bold'}>
          {'Quick action'.toUpperCase()}
        </MainText>
        {renderQuickAction({
          actionName: 'Create new club',
          onPress: () => {
            navigation.navigate('CreateClub');
          },
        })}
      </View>
      <LoadingOverlay visible={state.loading} />
    </View>
  );
};

export default Home;
