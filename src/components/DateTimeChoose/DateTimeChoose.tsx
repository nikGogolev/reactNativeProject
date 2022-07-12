import React, {useState} from 'react';
import {Button, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {TodoDetailsProps} from '../../screens/TodoDetails/TodoDetails.types';
import {changeTodo} from '../../store/actions';
import {selectTodoById} from '../../store/selectors';

export const DateTimeChoose = ({route}: TodoDetailsProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const todo = useSelector(selectTodoById(route.params.todoId));
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    dispatch(changeTodo({...todo, notificationDateTime: date}));
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Choose time" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
