import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../components/LoadingOverlay';
import MainFlatList from '../../../components/MainFlatList';
import MainText from '../../../components/MainText';
import SearchBox from '../../../components/SearchBox';
import { getUserClubs } from '../../../store/clubSlice';

const Clubs = () => {
  const state = useSelector((state) => state.club);
  const dispatch = useDispatch();
  const [showFloatingBox, setShowFloatingBox] = useState(false);
  const navigation = useNavigation();

  const [data, setData] = useState(state.clubs);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(getUserClubs());
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserClubs());
    }, []),
  );

  useEffect(() => {
    setData(state.clubs);
  }, [state.clubs]);

  useEffect(() => {
    if (!keyword) {
      setData(state.clubs);
      return;
    }

    const filteredData = state.clubs.filter((club) => {
      return club.name.toLowerCase().includes(keyword.toLowerCase());
    });

    setData(filteredData);
  }, [keyword, state.clubs]);

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
          setShowFloatingBox(!showFloatingBox);
        }}
      >
        <Ionicons name="ios-add" size={30} color="green" />
      </TouchableOpacity>
    );
  };

  // Render a floating box when press floating button
  const renderFloatingBox = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          width: 200,
          backgroundColor: 'white',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 16,
          }}
          onPress={() => {
            navigation.navigate('CreateClub');
            setShowFloatingBox(false);
          }}
        >
          <Ionicons name="ios-add" size={30} color="green" />
          <MainText>Add new club</MainText>
        </TouchableOpacity>
        <View
          style={{
            height: 16,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 16,
          }}
          onPress={() => {
            navigation.navigate('JoinClub');
          }}
        >
          <Ionicons
            name="ios-log-in"
            size={30}
            color="green"
            style={{ marginRight: 8 }}
          />
          <MainText>Join club</MainText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ClubDetail', { clubId: item._id });
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            marginHorizontal: 16,
          }}
        >
          <View>
            <MainText fontSize={20} fontWeight={'bold'}>
              {item.name}
            </MainText>
            <View
              style={{
                marginTop: 8,
                borderRadius: 8,
                backgroundColor: '#ddd',
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MainText color={'blue'} fontWeight={'600'}>
                {item.clubAdmin.name}
              </MainText>
            </View>
          </View>
          <View>
            <MainText>{item.membersQuantity} members</MainText>
            <View
              style={{
                marginTop: 8,
                borderRadius: 8,
                backgroundColor:
                  item.clubAdmin._id === global.id ? 'green' : 'grey',
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MainText color={'white'} fontWeight={'700'}>
                {item.clubAdmin._id === global.id ? 'OWNED' : 'OTHER'}
              </MainText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <SearchBox
        onChangeText={(text) => {
          setKeyword(text);
        }}
      />
      <MainFlatList
        data={data}
        keyExtractor={(item, index) => {
          return index.toString() + item;
        }}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return (
            <View style={{ height: 1, backgroundColor: '#ccc', margin: 16 }} />
          );
        }}
        refreshing={state.loading}
        onRefresh={() => {
          dispatch(getUserClubs());
        }}
      />
      {renderFloatingButton()}
      {showFloatingBox && renderFloatingBox()}
      <LoadingOverlay visible={state.loading} />
    </View>
  );
};

export default Clubs;
