import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

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
        {techs.map((tech, index) => <SpotList key={tech} tech={tech} />)}
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
