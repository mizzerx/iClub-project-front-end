import { useNavigation } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import MainFlatList from '../../../../../components/MainFlatList';
import MainImage from '../../../../../components/MainImage';
import MainText from '../../../../../components/MainText';
import randomImageUrl from '../../../../../utils/randomImageUrl';

const Tab = createMaterialTopTabNavigator();

const UnhandedIn = () => {
  const state = useSelector((state) => state.work);
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <MainImage
          imageSrc={{ uri: randomImageUrl() }}
          imageSize={40}
          isBorderRadius
        />
        <View style={{ width: 8 }} />
        <MainText fontSize={16} fontWeight={'600'}>
          {item.name}
        </MainText>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MainFlatList
        data={state.work.unHandedIn}
        renderItem={renderItem}
        noDataText={'No members'}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 8,
              backgroundColor: '#ddd',
            }}
          />
        )}
      />
    </View>
  );
};

const HandedIn = () => {
  const state = useSelector((state) => state.work);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('WorkAnswer', {
            userId: item._id,
            userName: item.name,
          });
        }}
      >
        <MainImage
          imageSrc={{ uri: randomImageUrl() }}
          imageSize={40}
          isBorderRadius
        />
        <View style={{ width: 8 }} />
        <MainText fontSize={16} fontWeight={'600'}>
          {item.name}
        </MainText>
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
      <MainFlatList
        data={state.work.handedIn}
        renderItem={renderItem}
        noDataText={'No members'}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 8,
              backgroundColor: '#ddd',
            }}
          />
        )}
      />
    </View>
  );
};

const Admin = () => {
  const state = useSelector((state) => state.work);
  const [submission, setSubmission] = React.useState({
    unHandedIn: 0,
    handedIn: 0,
  });

  useEffect(() => {
    if (state.work.unHandedIn && state.work.handedIn) {
      setSubmission({
        unHandedIn: [...state.work.unHandedIn].length,
        handedIn: [...state.work.handedIn].length,
      });
    }
  }, [state.work.unHandedIn, state.work.handedIn]);

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
        marginTop: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
      }}
    >
      <MainText fontWeight={'bold'} fontSize={28}>
        {'Member submission'}
      </MainText>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 16,
          justifyContent: 'center',
        }}
      >
        <MainText fontWeight={'bold'} fontSize={18} color={'red'}>
          {submission.unHandedIn}
          <MainText fontWeight={'500'} fontSize={12} color={'grey'}>
            {' Unhanded in'}
          </MainText>
        </MainText>
        <View
          style={{
            height: '100%',
            width: 2,
            backgroundColor: 'grey',
            marginHorizontal: 8,
          }}
        />
        <MainText fontWeight={'bold'} fontSize={18} color={'green'}>
          {submission.handedIn}
          <MainText fontWeight={'500'} fontSize={12} color={'grey'}>
            {' Handed in'}
          </MainText>
        </MainText>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Unhanded in" component={UnhandedIn} />
        <Tab.Screen name="Handed in" component={HandedIn} />
      </Tab.Navigator>
    </View>
  );
};

export default Admin;
