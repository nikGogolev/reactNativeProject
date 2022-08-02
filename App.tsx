import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {persistor, store} from './src/store';
import {Navigation} from './src/navigation/Navigation';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {/* <SafeAreaView style={backgroundStyle}> */}
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

          <Navigation />
          {/* </SafeAreaView> */}
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
