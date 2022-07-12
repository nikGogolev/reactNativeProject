import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {EventType} from '@notifee/react-native';

import rootReducer from './reducers';
import {Action, TodosState} from './types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<TodosState, Action>(
  persistConfig,
  rootReducer,
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

notifee.onBackgroundEvent(async ({type, detail}) => {
  // console.log('Notification background handler', type, detail);
  if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'stop') {
    notifee.stopForegroundService();
  }
});

// notifee.registerForegroundService(notification => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, 20000);
//   });
// });
