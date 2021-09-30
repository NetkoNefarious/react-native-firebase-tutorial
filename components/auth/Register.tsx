import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser?.uid)
        .set({
          name, email
        })
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <TextInput placeholder="name" onChangeText={setName} />
      <TextInput placeholder="email" onChangeText={setEmail} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      <Button onPress={() => onSignUp()} title="Sign up" />
    </View>
  );
}
