import React, {useEffect, useState} from 'react';
import {Button, ScrollView, Switch, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
  EventType,
} from '@notifee/react-native';

import {SaveButton} from '../../components/SaveButton/SaveButton';
import {TextField} from '../../components/TextField/TextField';
import {changeTodo} from '../../store/actions';
import {selectTodoById} from '../../store/selectors';
import {TodoDetailsProps} from './TodoDetails.types';
import {Gallery} from '../../components/Gallery/Gallery';
import {styles} from './TodoDetais.styles';
import {DateTimeChoose} from '../../components/DateTimeChoose/DateTimeChoose';

export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
  const dispatch = useDispatch();

  const todo = useSelector(selectTodoById(route.params.todoId));
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    navigation.setOptions({
      title: todo.title,
    });
  }, [navigation, todo]);

  const handleChangeTodo = () => {
    const newTodo = {
      ...todo,
      title: editedTitle,
    };

    dispatch(changeTodo(newTodo));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          disabled={editedTitle === todo.title}
          onPress={handleChangeTodo}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, todo.title, editedTitle]);

  const handlePress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
      },
      ({assets}) => {
        if (assets) {
          const newTodo = {
            ...todo,
            imgs: [...todo.imgs, ...assets],
          };
          dispatch(changeTodo(newTodo));
        }
      },
    );
  };

  const handleImagePress = (imgUri?: string) => {
    navigation.navigate('ImgFull', {uri: imgUri || '', todoId: todo.id});
  };

  //Notifications
  const handleSetPush = async (timeOffset?: number) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'TODO Channel',
      importance: AndroidImportance.HIGH,
    });
    const date = new Date();
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    const notificationDate = todo.notificationDateTime || date;

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: timeOffset
        ? Date.now() + timeOffset
        : notificationDate.getTime(),
      repeatFrequency: RepeatFrequency.DAILY, // repeat once a week
    };
    await notifee.createTriggerNotification(
      {
        title: todo.title,
        body: 'TODO Notification',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          //asForegroundService: true,
          pressAction: {
            id: 'default',
          },
          actions: [
            {
              title: 'Open',
              icon: todo.imgs[0]?.uri,
              pressAction: {
                id: 'open',
                launchActivity: 'default',
              },
            },
            {
              title: 'Ignore',
              pressAction: {
                id: 'ignore',
              },
            },
            {
              title: 'Stop',
              pressAction: {
                id: 'stop',
              },
            },
          ],
        },
        data: {
          id: String(todo.id),
        },
      },
      trigger,
    );
  };

  useEffect(() => {
    return notifee.onForegroundEvent(async ({type, detail}) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === 'stop'
      ) {
        await handleSwitch();
      }
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === 'ignore'
      ) {
        await handleSetPush(10000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelPush = async () => {
    await notifee.cancelTriggerNotification(String(todo.id));
  };
  const handleSwitch = async () => {
    if (todo.notificationIsOn) {
      await handleCancelPush();
    } else {
      await handleSetPush();
    }
    dispatch(changeTodo({...todo, notificationIsOn: !todo.notificationIsOn}));
  };

  return (
    <ScrollView>
      <TextField onChangeText={setEditedTitle} initialValue={todo.title} />
      <Text style={styles.text}>Hello, {todo.title}</Text>
      <View style={styles.notification}>
        <Text style={styles.text}>Notification</Text>
        <DateTimeChoose route={route} navigation={navigation} />
        <Switch value={todo.notificationIsOn} onChange={handleSwitch} />
      </View>

      <Gallery onPress={handleImagePress} imgs={todo.imgs} />
      <Button onPress={handlePress} title="Select Image" />
    </ScrollView>
  );
};
