import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Checkbox} from '../Checkbox/Checkbox';
import {DeleteButton} from '../DeleteButton/DeleteButton';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem = ({i, todo, onComplete, onDelete}: TodoItemProps) => {
  const handlePress = () => {
    onComplete(todo.id);
  };
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={handlePress} style={styles.root}>
        <Checkbox checked={todo.completed} />
        <Text
          key={todo.id}
          style={[styles.todoText, todo.completed && styles.todoTextCrossed]}>
          {i + 1}: {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <DeleteButton id={todo.id} onPress={onDelete} />
      </TouchableOpacity>
    </View>
  );
};
