import React, {useEffect} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Error} from '../../components/Error/Error';

import {TodoItem} from '../../components/TodoItem/TodoItem';
import {changeTodo, getTodos} from '../../store/actions';
import {selectStatus, selectTodos} from '../../store/selectors';
import {FETCH_STATUSES} from '../../utils';
import {styles} from './TodoList.styles';

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

  return (
    <ScrollView style={styles.root}>
      {status === FETCH_STATUSES.failure ? (
        <Error />
      ) : status === FETCH_STATUSES.request ||
        status === FETCH_STATUSES.idle ? (
        <ActivityIndicator />
      ) : (
        Object.values(todos).map((el, i) => (
          <TodoItem todo={el} i={i} onComplete={handlePressTodo} key={el.id} />
        ))
      )}
    </ScrollView>
  );
};
