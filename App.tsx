import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import { View, Text } from "react-native";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './components/redux/reducers'
import thunk from "redux-thunk";

const firebaseConfig = {
  apiKey: "AIzaSyAkKDrtxJmkbGHYvLTlBjuNiS9rTVcHzMc",
  authDomain: "instagram-dev-af4c4.firebaseapp.com",
  projectId: "instagram-dev-af4c4",
  storageBucket: "instagram-dev-af4c4.appspot.com",
  messagingSenderId: "71653487495",
  appId: "1:71653487495:web:c69df1ec4d0b91cecb9922",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk))
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";

const Stack = createStackNavigator();
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLoggedIn(false) : setLoggedIn(true);
      setLoaded(true);
    });
  }, []);
  return !loaded ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>
  ) : !loggedIn ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <Provider store={store}>
      <MainScreen />
    </Provider>);
}
