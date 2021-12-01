import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWorks } from '../../../../../store/workSlice';
import LoadingOverlay from '../../../../../components/LoadingOverlay';
import { Ionicons } from '@expo/vector-icons';
import MainFlatList from '../../../../../components/MainFlatList';
import MainText from '../../../../../components/MainText';
import stringFormat from '../../../../../utils/stringFormat';

const ClubWork = () => {
  const [workState, clubState] = [
    useSelector((state) => state.work),
    useSelector((state) => state.club),
  ];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isClubAdmin, setIsClubAdmin] = useState(false);

  useEffect(() => {
    dispatch(getWorks(clubState.club._id));
    if (clubState.club.clubAdmin._id === global.id) {
      setIsClubAdmin(true);
    } else {
      setIsClubAdmin(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getWorks(clubState.club._id));
    }, []),
  );

  const renderFloatingButton = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={() => {
          navigation.navigate('CreateWork');
        }}
      >
        <Ionicons name="ios-add" size={30} color="green" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          borderRadius: 8,
          borderWidth: 1,
          padding: 16,
          borderColor: '#ddd',
          backgroundColor: '#fff',
        }}
        onPress={() => {
          navigation.navigate('WorkDetail', {
            workId: item._id,
            isAdmin: isClubAdmin,
          });
        }}
      >
        <Ionicons name="ios-reader" size={30} color="green" />
        <View
          style={{
            flex: 1,
            marginLeft: 16,
          }}
        >
          <MainText fontSize={16} color="black" fontWeight={'600'}>
            {item.name}
          </MainText>
          <MainText fontSize={12} color="black">
            Assigned - {stringFormat.formatDateToString(new Date(item.time))}
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
      <MainFlatList
        data={workState.works}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        refreshing={workState.loading}
        onRefresh={() => {
          dispatch(getWorks(clubState.club._id));
        }}
      />
      {isClubAdmin && renderFloatingButton()}
      {/* <LoadingOverlay visible={workState.loading} /> */}
    </View>
  );
};

export default ClubWork;
