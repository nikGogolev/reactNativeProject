import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    width: '60%',
  },
  todoText: {
    fontSize: 17,
    marginLeft: 17,
    color: '#000',
  },
  todoTextCrossed: {
    textDecorationLine: 'line-through',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
