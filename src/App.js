import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import Login from './screens/Login';
import MainTab from './screens/MainTab';
import ChatContact from './screens/MainTab/Chat/ChatContact';
import ClubDetail from './screens/MainTab/Clubs/ClubDetail';
import ClubSetting from './screens/MainTab/Clubs/ClubDetail/ClubSetting';
import CreateWork from './screens/MainTab/Clubs/ClubDetail/ClubWork/CreateWork';
import WorkDetail from './screens/MainTab/Clubs/ClubDetail/ClubWork/WorkDetail';
import CreateClub from './screens/MainTab/Clubs/CreateClub';
import JoinClub from './screens/MainTab/Clubs/JoinClub';
import Register from './screens/Register';
import store from './store';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  const state = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.token ? (
          <>
            <Stack.Screen
              name="Maintab"
              component={MainTab}
              options={{ headerShown: false }}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="CreateClub" component={CreateClub} />
              <Stack.Screen name="JoinClub" component={JoinClub} />
              <Stack.Screen name="ClubSetting" component={ClubSetting} />
              <Stack.Screen name="ChatContact" component={ChatContact} />
              <Stack.Screen name="CreateWork" component={CreateWork} />
            </Stack.Group>
            <Stack.Screen
              name="ClubDetail"
              component={ClubDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="WorkDetail" component={WorkDetail} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppRoute />
      <StatusBar style="auto" />
    </Provider>
  );
}
