import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  getClub,
  resetClub,
  resetClubError,
} from '../../../../store/clubSlice';
import Dashboard from './Dashboard';
import { Ionicons } from '@expo/vector-icons';
import Members from './Members';
import ClubWork from './ClubWork';

const Tab = createBottomTabNavigator();

const ClubDetail = () => {
  const params = useRoute().params || {};
  const { clubId } = params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      dispatch(resetClub());
      dispatch(resetClubError());
      dispatch(getClub({ clubId }));
    }, [dispatch, clubId]),
  );

  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Members') {
              iconName = focused ? 'ios-people' : 'ios-people';
            } else if (route.name === 'Works') {
              iconName = focused ? 'ios-briefcase' : 'ios-briefcase';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 16 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 16 }}
              onPress={() => {
                navigation.navigate('ClubSetting');
              }}
            >
              <Ionicons name="ios-settings" size={24} color="black" />
            </TouchableOpacity>
          ),
        };
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Works" component={ClubWork} />
      <Tab.Screen name="Members" component={Members} />
    </Tab.Navigator>
  );
};

export default ClubDetail;
