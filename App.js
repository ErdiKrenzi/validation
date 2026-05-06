import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [emri, setEmri] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [gabimet, setGabimet] = useState({});
  const [users, setUsers] = useState([]);

  const validoFormen = () => {
    let gabimeTeReja = {};

    if (emri.trim() === "") {
      gabimeTeReja.emri = "Emri është i detyrueshëm";
    }

    if (email.trim() === "") {
      gabimeTeReja.email = "Email është i detyrueshëm";
    } else if (!email.includes("@")) {
      gabimeTeReja.email = "Email nuk është valid";
    }

    if (password.trim() === "") {
      gabimeTeReja.password = "Password është i detyrueshëm";
    } else if (password.length < 6) {
      gabimeTeReja.password = "Min 6 karaktere";
    }

    setGabimet(gabimeTeReja);
    return Object.keys(gabimeTeReja).length === 0;
  };

  const maskoPassword = (pass) => {
    return "*".repeat(pass.length);
  };

  const handelRegister = () => {
    if (validoFormen()) {
      const userRi = {
        id: Date.now().toString(),
        emri,
        email,
        password,
      };

      setUsers([...users, userRi]);

      alert("User u shtua me sukses!");

      setEmri("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Emri"
        value={emri}
        onChangeText={setEmri}
      />
      {gabimet.emri && <Text style={styles.error}>{gabimet.emri}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {gabimet.email && <Text style={styles.error}>{gabimet.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {gabimet.password && (
        <Text style={styles.error}>{gabimet.password}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handelRegister}>
        <Text style={styles.buttonText}>Regjistrohu</Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>👤 {item.emri}</Text>
            <Text style={styles.cardText}>📧 {item.email}</Text>
            <Text style={styles.cardText}>
              🔒 {maskoPassword(item.password)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f5f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
});