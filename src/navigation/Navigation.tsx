import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TodoList} from '../screens/TodoList/TodoList';
import {RootStackParams} from './Navigation.types';

const RootStack = createNativeStackNavigator<RootStackParams>();

export const Navigation = () => (
  <RootStack.Navigator initialRouteName="TodoList">
    <RootStack.Screen name="TodoList" component={TodoList} />
  </RootStack.Navigator>
);
