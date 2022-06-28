import React, {useRef} from 'react';
import {Animated} from 'react-native';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export const Checkbox = ({checked, onPress}: CheckboxProps) => {
  const checkboxScale = useRef(new Animated.Value(0));

  const handlePress = () => {
    Animated.spring(checkboxScale.current, {
      toValue: 1,
      damping: 10,
      useNativeDriver: true,
    }).start(() => {
      checkboxScale.current.setValue(0);
      onPress();
    });
  };

  return (
    <Animated.View
      onTouchEnd={handlePress}
      style={[
        styles.box,
        checked && styles.filled,
        {
          transform: [
            {
              scale: checkboxScale.current.interpolate({
                inputRange: [0, 0.7, 1],
                outputRange: [1, 1.2, 1],
              }),
            },
          ],
        },
      ]}
    />
  );
};
