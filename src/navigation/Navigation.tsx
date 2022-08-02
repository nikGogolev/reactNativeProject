import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TodoList} from '../screens/TodoList/TodoList';
import {MainStackParams, RootTabParams} from './Navigation.types';
import {TodoDetails} from '../screens/TodoDetails/TodoDetails';
import {BackButton} from '../components/BackButton/BackButton';
import {ImgFull} from '../screens/ImgFull/ImgFull';

import Icon from 'react-native-vector-icons/FontAwesome';

import {EmptyComponent} from '../components/EmptyComponent/EmptyComponent';

Icon.loadFont();

const RootTab = createBottomTabNavigator<RootTabParams>();

const MainStack = createNativeStackNavigator<MainStackParams>();

const MainNavigation = () => (
  <MainStack.Navigator initialRouteName="TodoList">
    <MainStack.Group>
      <MainStack.Screen name="TodoList" component={TodoList} />
      <MainStack.Screen
        options={({navigation}) => ({
          title: 'Details',
          headerTitleStyle: {fontSize: 25},
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          headerLeft: () => <BackButton onPress={navigation.goBack} />,
        })}
        name="TodoDetails"
        component={TodoDetails}
      />
    </MainStack.Group>

    <MainStack.Group screenOptions={{presentation: 'transparentModal'}}>
      <MainStack.Screen name="ImgFull" component={ImgFull} />
    </MainStack.Group>
  </MainStack.Navigator>
);

export const Navigation = () => (
  <NavigationContainer>
    <RootTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'darkred',
        tabBarInactiveTintColor: 'grey',
        tabBarShowLabel: false,
      }}>
      <RootTab.Screen
        name="Main"
        component={MainNavigation}
        options={{
          tabBarIcon: props => <Icon name="list" {...props} />,
        }}
      />
      <RootTab.Screen
        name="Settings"
        component={EmptyComponent}
        options={{tabBarIcon: props => <Icon name="gear" {...props} />}}
      />
    </RootTab.Navigator>
  </NavigationContainer>
);
