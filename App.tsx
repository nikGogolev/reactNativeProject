import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';

import {persistor, store} from './src/store';
import {Navigation} from './src/navigation/Navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <SafeAreaView style={backgroundStyle}> */}
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
        {/* </SafeAreaView> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
