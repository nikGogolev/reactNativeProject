import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getTodos} from '../../store/actions';
import {styles} from './Error.styles';

export const Error = () => {
  const dispatch = useDispatch();

  const reloadList = () => {
    console.log('Reload');

    // @ts-ignore
    dispatch(getTodos());
  };

  return (
    <View>
      <Text style={styles.text}>Fetch error! Try to reload todo list</Text>
      <Button title="Reload List" onPress={reloadList} />
    </View>
  );
};
