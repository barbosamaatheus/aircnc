import React, { useState } from "react";
import {
  AsyncStorage,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import api from "../services/api";

export default function Book({ navigation }) {
  const [date, setDate] = useState("");

  const id = navigation.getParam("id");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");
    await api.post(
      `/spots/${id}/booking`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert("Solicitação de reserva enviada.");
    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}> DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}> SOLICITAR RESERVA </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ccc" }]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}> CANCELAR </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    marginTop: 30,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    marginTop: 10,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    backgroundColor: "#f05a5b"
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
