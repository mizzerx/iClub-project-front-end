import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../../components/LoadingOverlay';
import MainText from '../../../../components/MainText';
import { Ionicons } from '@expo/vector-icons';
import MainFlatList from '../../../../components/MainFlatList';
import {
  getClub,
  removeMember,
  resetClubError,
} from '../../../../store/clubSlice';

const Members = () => {
  const state = useSelector((state) => state.club);
  const dispatch = useDispatch();

  const [isAdmin, setIsAdmin] = React.useState(true);

  const handleRemoveMember = (id) => {
    dispatch(resetClubError());
    Alert.alert(
      'Remove Member',
      'Are you sure you want to remove this member?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            dispatch(removeMember({ clubId: state.club._id, memberId: id }));
            dispatch(resetClubError());
          },
          style: 'destructive',
        },
      ],
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="md-person"
            size={24}
            color="#000"
            style={{
              marginRight: 8,
            }}
          />
          <MainText>{item.name}</MainText>
        </View>
        {isAdmin && !item.noDelete ? (
          <TouchableOpacity onPress={() => handleRemoveMember(item._id)}>
            <Ionicons
              name="ios-remove"
              size={24}
              color="red"
              suppressHighlighting
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  useEffect(() => {
    setIsAdmin(state.club.clubAdmin && state.club.clubAdmin._id === global.id);
  }, [state.club.clubAdmin]);

  useEffect(() => {
    if (state.error) {
      Alert.alert('Error', state.error, [
        {
          text: 'OK',
          onPress: () => dispatch(resetClubError()),
        },
      ]);
    }

    if (state.removeMemberSuccess) {
      Alert.alert('Success', 'Member removed successfully.', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetClubError());
            dispatch(getClub({ clubId: state.club._id }));
          },
        },
      ]);
    }
  }, [state.error, state.removeMemberSuccess]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
      }}
    >
      <View>
        <MainText fontSize={28} fontWeight={'bold'}>
          {'Club Admin'}
        </MainText>
        <View style={{ margin: 8 }} />
        {renderItem({ item: { ...state.club.clubAdmin, noDelete: true } })}
      </View>
      <View style={{ flex: 1, marginTop: 16 }}>
        <MainText fontSize={28} fontWeight={'bold'}>
          {'Members'}
        </MainText>
        <View style={{ margin: 8 }} />
        <MainFlatList
          data={state.club.members}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, margin: 8 }} />;
          }}
          contentContainerStyle={{
            paddingTop: 16,
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
      <LoadingOverlay visible={state.loading} />
    </View>
  );
};

export default Members;
