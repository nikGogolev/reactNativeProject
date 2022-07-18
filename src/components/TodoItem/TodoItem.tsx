import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Checkbox} from '../Checkbox/Checkbox';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

const MAX_OFFSET = -70;
const OFFSET_TRESHHOLD = -30;

export const TodoItem = ({
  i,
  todo,
  onComplete,
  onDelete,
  onPress,
}: TodoItemProps) => {
  const offset = useSharedValue(0);
  const start = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{scale: offset.value / MAX_OFFSET}],
  }));

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (
        e.translationX < -start.value &&
        e.translationX > MAX_OFFSET - start.value
      ) {
        offset.value = e.translationX + start.value;
      }
    })
    .onEnd(e => {
      if (e.translationX > OFFSET_TRESHHOLD) {
        offset.value = 0;
      } else {
        offset.value = MAX_OFFSET;
      }
      start.value = offset.value;
    });

  const handlePress = () => {
    onPress(todo.id);
  };

  const handleComplete = () => {
    onComplete(todo.id);
  };

  const handleDeletePress = () => {
    onDelete(todo.id);
  };
  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(500)}
      exiting={LightSpeedOutRight.duration(500)}
      style={[styles.row, style]}>
      <GestureDetector gesture={gesture}>
        <View style={styles.root}>
          <TouchableOpacity>
            <Checkbox checked={todo.completed} onPress={handleComplete} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.todoText}>
              {i + 1}: {todo.title}
            </Text>
          </TouchableOpacity>
        </View>
      </GestureDetector>
      <Animated.View style={deleteStyle}>
        <TouchableOpacity onPress={handleDeletePress}>
          <Icon name="remove" color="red" size={24} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
