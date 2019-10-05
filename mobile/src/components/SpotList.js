import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

import api from "../services/api";

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const res = await api.get("/spots", {
        params: { tech }
      });

      setSpots(res.data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate("Book", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={{ fontWeight: "bold" }}>{tech}</Text>
      </Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={item => spots._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={ ({item}) => (
          <View style={styles.listItem}>
            <Image
              source={{ uri: item.thumbnail_url }}
              style={styles.thumbnail}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>
              {item.price ? `R$: ${item.price}/dia` : "GRATUITO"}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigate(item._id)}>
              <Text style={styles.buttonText}> SOLICITAR RESERVA</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginBottom: 15
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginRight: 15
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 2
  },
  company: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10
  },
  price: {
    fontSize: 15,
    color: "#999",
    marginTop: 5
  },
  button: {
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    marginTop: 15,
    backgroundColor: "#f05a5b"
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15
  }
});

export default withNavigation(SpotList);
