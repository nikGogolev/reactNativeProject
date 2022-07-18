import React from 'react';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export const Checkbox = ({checked, onPress}: CheckboxProps) => {
  const scale = useSharedValue(1);

  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(1.3, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <Animated.View
      onTouchEnd={handlePress}
      style={[styles.box, checked && styles.filled, animationStyles]}
    />
  );
};
