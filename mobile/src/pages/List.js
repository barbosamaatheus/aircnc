import React, { useState, useEffect } from "react";
import {
  Alert,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import socketio from "socket.io-client";

import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.0.113:3333", {
        query: { user_id }
      });
      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} para: ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleLogout(event) {
    navigation.navigate("Login");

    await AsyncStorage.removeItem("user");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map((tech, index) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}> SAIR </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  },
  button: {
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
