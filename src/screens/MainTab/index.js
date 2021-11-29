import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Clubs from './Clubs';
import Profile from './Profile';
import Chat from './Chat';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            } else if (route.name === 'Chat') {
              iconName = focused
                ? 'ios-chatbubbles'
                : 'ios-chatbubbles-outline';
            } else if (route.name === 'Clubs') {
              iconName = focused ? 'ios-people' : 'ios-people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Clubs" component={Clubs} />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTab;
