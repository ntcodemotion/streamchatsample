/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  createAppContainer,
  NavigationParams,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
import {createStackNavigator} from 'react-navigation-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ChatHelper from './ChatHelper';
import UsersScreen from './UsersScreen';

declare const global: {HermesInternal: null | {}};

const ROUTES: NavigationRouteConfigMap<
  StackNavigationOptions,
  StackNavigationProp
> = {
  LIST: {
    screen: ChatListScreen,
    navigationOptions: {
      headerShown: true,
      gestureEnabled: true,
    },
  },
  CHAT: {
    screen: ChatScreen,
    navigationOptions: {
      headerShown: true,
      gestureEnabled: true,
    },
  },
  USERS: {
    screen: UsersScreen,
    navigationOptions: {
      headerShown: true,
      gestureEnabled: true,
    },
  },
};

const App = () => {
  console.disableYellowBox = true;
  const [chatReady, setChatReady] = useState(false);
  const MainNavigator = useMemo(
    () =>
      createStackNavigator(ROUTES, {
        initialRouteName: 'LIST',
      }),
    [],
  );

  const Router = useMemo(() => createAppContainer(MainNavigator), [
    MainNavigator,
  ]);

  useEffect(() => {
    ChatHelper.initClient().then(() => {
      setChatReady(true);
    });
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={{height: '100%', width: '100%'}}>
          {chatReady ? (
            <Router />
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={'blue'} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
