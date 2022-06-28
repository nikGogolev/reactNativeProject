import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';

import {persistor, store} from './src/store';
import {Navigation} from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {EmptyComponent} from './src/components/EmptyComponent/EmptyComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

Ionicons.loadFont();
MaterialCommunityIcons.loadFont();

const Tab = createBottomTabNavigator();
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <SafeAreaView style={backgroundStyle}> */}
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Navigation}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Empty"
              component={EmptyComponent}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="infinite" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        {/* </SafeAreaView> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
