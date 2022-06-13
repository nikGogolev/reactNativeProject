import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Error} from '../../components/Error/Error';
import {TextField} from '../../components/TextField/TextField';

import {TodoItem} from '../../components/TodoItem/TodoItem';
import {changeTodo, getTodos, removeTodo} from '../../store/actions';
import {selectStatus, selectTodos} from '../../store/selectors';
import {FETCH_STATUSES} from '../../utils';
import {styles} from './TodoList.styles';
import {Todo} from './TodoList.types';

export const TodoList = () => {
  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  const handlePressTodo = (id: number) => {
    const updatedTodo = {...todos[id], completed: !todos[id].completed};
    dispatch(changeTodo(updatedTodo));
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodos());
  }, [dispatch]);

  const addTodo = (text: string) => {
    const newTodo = {
      title: text,
      id: +new Date(),
      completed: false,
    };
    dispatch(changeTodo(newTodo));
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
    console.log(id);
  };

  const renderTodo = ({item, index}: ListRenderItemInfo<Todo>) => (
    <TodoItem
      todo={item}
      i={index}
      onComplete={handlePressTodo}
      key={item.id}
      onDelete={handleRemoveTodo}
    />
  );

  return (
    <View style={styles.root}>
      {status === FETCH_STATUSES.failure ? (
        <Error />
      ) : status === FETCH_STATUSES.request ||
        status === FETCH_STATUSES.idle ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={() => <TextField onSubmit={addTodo} />}
          data={Object.values(todos).reverse()}
          renderItem={renderTodo}
        />
      )}
    </View>
  );
};
