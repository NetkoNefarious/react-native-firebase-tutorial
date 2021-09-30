import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <TextInput placeholder="email" onChangeText={setEmail} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      <Button onPress={() => onSignIn()} title="Sign in" />
    </View>
  );
}
