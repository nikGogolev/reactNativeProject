import React, {useEffect, useMemo} from 'react';
import {ListRenderItemInfo, SectionList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextField} from '../../components/TextField/TextField';
import notifee from '@notifee/react-native';

import {TodoItem} from '../../components/TodoItem/TodoItem';
import {changeTodo, removeTodo} from '../../store/actions';
import {selectTodos} from '../../store/selectors';
import {styles} from './TodoList.styles';
import {Todo, TodoListProps} from './TodoList.types';

export const TodoList = ({navigation}: TodoListProps) => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handlePressTodo = (id: number) => {
    const updatedTodo = {...todos[id], completed: !todos[id].completed};
    dispatch(changeTodo(updatedTodo));
  };

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      completed: false,
      title: text,
      imgs: [],
    };

    dispatch(changeTodo(newTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const toDetails = (id: number) => {
    navigation.navigate('TodoDetails', {todoId: id});
  };

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(getTodos());
  // }, [dispatch]);

  const renderTodo = ({item, index}: ListRenderItemInfo<Todo>) => (
    <TodoItem
      todo={item}
      i={index}
      onPress={toDetails}
      onComplete={handlePressTodo}
      onDelete={handleDeleteTodo}
      key={item.id}
    />
  );

  const sections = useMemo(() => {
    return Object.values(todos).reduce<{completed: Todo[]; notCompl: Todo[]}>(
      (acc, el) => {
        if (el.completed) {
          acc.completed.push(el);
        } else {
          acc.notCompl.push(el);
        }
        return acc;
      },
      {completed: [], notCompl: []},
    );
  }, [todos]);

  //Notifications

  // const sendPush = async () => {
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     vibration: true,
  //     importance: AndroidImportance.HIGH,
  //   });
  //   const trigger: TimestampTrigger = {
  //     type: TriggerType.TIMESTAMP,
  //     timestamp: Date.now() + 5000, // Через 10 секунд
  //   };
  //   await notifee.createTriggerNotification(
  //     {
  //       title: 'Notification Title',
  //       body: 'Main body content of the notification',
  //       android: {
  //         channelId,
  //         importance: AndroidImportance.HIGH,
  //         //asForegroundService: true,
  //         pressAction: {
  //           id: 'default',
  //         },
  //         actions: [
  //           {
  //             title: 'OK',
  //             icon: 'https://my-cdn.com/icons/snooze.png',
  //             pressAction: {
  //               id: 'ok',
  //               launchActivity: 'default',
  //             },
  //           },
  //           {
  //             title: 'Ignore',
  //             pressAction: {
  //               id: 'ignore',
  //             },
  //           },
  //           {
  //             title: 'Stop',
  //             pressAction: {
  //               id: 'stop',
  //             },
  //           },
  //         ],
  //       },
  //       data: {
  //         id: '1',
  //       },
  //     },

  //     trigger,
  //   );
  // };

  // useEffect(() => {
  //   return notifee.onForegroundEvent(({type, detail}) => {
  //     switch (type) {
  //       case EventType.ACTION_PRESS: {
  //         if (detail?.pressAction?.id) {
  //           // console.log(
  //           //   'User pressed an action with the id: ',
  //           //   detail.pressAction.id,
  //           // );
  //         }
  //         break;
  //       }
  //       case EventType.DISMISSED:
  //         // console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         // console.log('User pressed notification', detail.notification);
  //         break;
  //       case EventType.ACTION_PRESS:
  //       // console.log(detail.pressAction?.id);
  //     }
  //   });
  // }, []);

  const isAppOpenedByNotif = async () => {
    const initNotif = await notifee.getInitialNotification();

    if (initNotif) {
      const id = initNotif.notification.data?.id;
      navigation.navigate('TodoDetails', {
        todoId: +(id as string),
      });
    }
  };

  useEffect(() => {
    isAppOpenedByNotif();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SectionList
        contentContainerStyle={styles.container}
        style={styles.root}
        ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
        sections={[
          {title: 'Completed', data: sections.completed},
          {title: 'Not Completed', data: sections.notCompl},
        ]}
        renderSectionHeader={({section}) => <Text>{section.title}</Text>}
        renderItem={renderTodo}
      />
    </>
  );
};
